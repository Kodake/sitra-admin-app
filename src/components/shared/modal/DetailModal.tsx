import { Close as CloseIcon } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React from 'react';

interface DetailModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    fullWidth?: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({ 
    open, 
    onClose, 
    title, 
    children,
    maxWidth = 'md',
    fullWidth = true
}) => {
    const [content, setContent] = React.useState<React.ReactNode>(children);

    React.useEffect(() => {
        if (open) {
            setContent(children);
        }
    }, [open, children]);

    const handleClose = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        const dashboard = document.querySelector<HTMLElement>(
            ".inventual-dashboard-area"
        );

        if (dashboard) {
            dashboard.removeAttribute("aria-hidden");

            if ("inert" in dashboard) {
                (dashboard as any).inert = false;
            }
        }

        requestAnimationFrame(() => {
            const firstFocusable = dashboard?.querySelector<HTMLElement>(
                "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
            );
            firstFocusable?.focus();
        });

        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(15, 23, 42, 0.45)',
                        backdropFilter: 'blur(4px)',
                    }
                }
            }}
            PaperProps={{
                className: 'detail-modal-paper',
                sx: {
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }
            }}
        >
            <DialogTitle 
                className="detail-modal-title"
                sx={{ 
                    m: 0, 
                    px: { xs: 2.5, sm: 3.5 }, 
                    py: 2.25, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                }}
            >
                <span className="text-lg font-bold text-heading tracking-tight">{title}</span>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    size="small"
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                        borderRadius: '8px',
                        p: 0.75,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            color: (theme) => theme.palette.text.primary,
                        },
                    }}
                >
                    <CloseIcon sx={{ fontSize: 20 }} />
                </IconButton>
            </DialogTitle>
            <DialogContent 
                className="detail-modal-content-wrapper"
                dividers 
                sx={{ p: 0 }}
            >
                <div className="detail-modal-body">
                    {content}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DetailModal;
