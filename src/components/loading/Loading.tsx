"use client";

import { useLoadingStore } from "@/store/useLoadingStore";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingProps {
  forceShow?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ forceShow = false }) => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!forceShow && !isLoading) {
    return null;
  }

  return <LoadingSpinner />;
};

export { LoadingSpinner };
export default Loading;
