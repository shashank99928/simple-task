import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationDialog from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
    it('renders when open is true', () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();

        render(
            <ConfirmationDialog
                open={true}
                onClose={handleClose}
                onSucces={handleSuccess}
            />
        );

        expect(screen.getByText('Are you sure ?')).toBeInTheDocument();
        expect(screen.getByText('This action cannot be undo.')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Accept')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();

        const { queryByText } = render(
            <ConfirmationDialog
                open={false}
                onClose={handleClose}
                onSucces={handleSuccess}
            />
        );

        expect(queryByText('Are you sure ?')).not.toBeVisible();
    });

    it('calls onClose when Cancel button is clicked', () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();

        render(
            <ConfirmationDialog
                open={true}
                onClose={handleClose}
                onSucces={handleSuccess}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onSucces when Accept button is clicked', () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();

        render(
            <ConfirmationDialog
                open={true}
                onClose={handleClose}
                onSucces={handleSuccess}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /Accept/i }));
        expect(handleSuccess).toHaveBeenCalledTimes(1);
    });
});
