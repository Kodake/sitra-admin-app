import { GenericDialogProps } from "@/interFace/interFace";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

const GenericDialog: React.FC<GenericDialogProps> = ({ open, handleClose, title, content, onAgree }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const g = useTranslations("General");

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography align="center">{title}</Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <Typography align="center">{content}</Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleClose} autoFocus>
          {g("close")}
        </Button>
        <Button
          onClick={() => {
            if (onAgree) onAgree();
            handleClose();
          }}
          autoFocus
        >
          {g("ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
