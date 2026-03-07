import { forwardRef, Fragment, type ReactElement, type Ref } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({ open, onClose, onSuccess }: { open: boolean, onClose: () => void, onSuccess: () => void }) {


    return (
        <Fragment >

            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            padding: 1,
                            minWidth: 320
                        }
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" sx={{ color: 'text.secondary' }}>
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="inherit"
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSuccess}
                        variant="contained"
                        color="error"
                        autoFocus
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
                    >
                        Confirm Deletion
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}
