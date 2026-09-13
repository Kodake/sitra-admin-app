"use client";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

interface PdfViewerPopupProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string | null;
}

const PdfViewerPopup = ({ open, onClose, pdfUrl }: PdfViewerPopupProps) => {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        // 🔒 Bloquea backdrop click y ESC
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        onClose();
      }}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "75%",
          height: "90vh",
          margin: "auto",
          position: "relative",
        },
      }}
    >
      {/* BOTÓN CERRAR (ÚNICA FORMA DE CERRAR) */}
      <IconButton
        onClick={onClose}
        aria-label="close"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ height: "80%", p: 0 }}>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="Invoice PDF"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        ) : (
          <p style={{ textAlign: "center", padding: "2rem" }}>
            Loading PDF...
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerPopup;
