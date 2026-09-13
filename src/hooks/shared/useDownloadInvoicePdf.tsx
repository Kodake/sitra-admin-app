"use client";
import axios from "@/services/auth/authAxiosInstanceServices";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useDownloadInvoicePdf = () => {
  const g = useTranslations("General");

  const downloadInvoicePdf = useCallback(async (invoiceId: string, type: 'sale' | 'purchase') => {
    try {
      const endpoint = type === 'sale'
        ? `/saleInvoices/${invoiceId}/download`
        : `/purchaseInvoices/${invoiceId}/download`;

      const response = await axios.get(endpoint, {
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      let filename = `${type}-invoice.pdf`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, "");
        } else {
          const fallbackMatch = contentDisposition.match(/filename\*?=['"]?([^;'"]+)/i);
          if (fallbackMatch && fallbackMatch[1]) {
            filename = decodeURIComponent(fallbackMatch[1].replace(/UTF-8''/i, ''));
          }
        }
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error: any) {
      toast.error(g("errorDownloadingPDF"));
    }
  }, []);

  return {
    downloadInvoicePdf
  };
};
