"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast, ToastItem, TypeOptions } from "react-toastify";

export interface NotificationItem {
  id: string | number;
  message: any;
  type: TypeOptions;
  createdAt: number;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  removeNotification: (id: string | number) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const timersRef = useRef<Map<string | number, NodeJS.Timeout>>(new Map());
  const activeScreenToastsRef = useRef<Set<string | number>>(new Set());

  const removeNotification = (id: string | number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    if (activeScreenToastsRef.current.has(id)) {
      activeScreenToastsRef.current.delete(id);
      toast.dismiss(id);
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    activeScreenToastsRef.current.clear();
    setNotifications([]);
    toast.dismiss();
  };

  useEffect(() => {
    const unsubscribe = toast.onChange((item: ToastItem) => {
      // Clean up from screen ref on toast removal
      if (item.status === "removed") {
        activeScreenToastsRef.current.delete(item.id);
        return;
      }

      // We only process newly added toasts
      if (item.status !== "added") return;

      // Ignore interactive confirmation dialogs or loading states
      if ((item.data as any)?.isConfirmation || item.isLoading) {
        return;
      }

      const id = item.id;
      const type = item.type || "info";
      const content = item.content;

      // 1. Single on-screen toast enforcement:
      // Collect any previous on-screen toasts and dismiss them from screen
      const olderToasts = Array.from(activeScreenToastsRef.current).filter((tId) => tId !== id);
      activeScreenToastsRef.current.clear();
      activeScreenToastsRef.current.add(id);

      if (olderToasts.length > 0) {
        setTimeout(() => {
          olderToasts.forEach((oldId) => {
            toast.dismiss(oldId);
          });
        }, 0);
      }

      // 2. Add to bell notifications list (ephemeral in-memory)
      const newItem: NotificationItem = {
        id,
        message: content,
        type,
        createdAt: Date.now(),
      };

      setNotifications((prev) => {
        const filtered = prev.filter((n) => n.id !== id);
        return [newItem, ...filtered];
      });

      // 3. Clear any existing timer for this ID if re-triggered
      const existingTimer = timersRef.current.get(id);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      // 4. 10-second ephemeral lifecycle: automatically remove from bell after 10s
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        timersRef.current.delete(id);
        activeScreenToastsRef.current.delete(id);
      }, 10000);

      timersRef.current.set(id, timer);
    });

    return () => {
      unsubscribe();
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
      activeScreenToastsRef.current.clear();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: notifications.length,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export default NotificationContext;
