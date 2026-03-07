import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmationDialog from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
    it('renders when open is true', () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();

        render(
            <ConfirmationDialog
                open={true}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />
        );

        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();

        const { queryByText } = render(
            <ConfirmationDialog
                open={false}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />
        );

        expect(queryByText('Are you sure?')).not.toBeVisible();
    });

    it('calls onClose when Cancel button is clicked', async () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();
        const user = userEvent.setup();

        render(
            <ConfirmationDialog
                open={true}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />
        );

        await user.click(screen.getByRole('button', { name: /Cancel/i }));

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onSuccess when Confirm Deletion button is clicked', async () => {
        const handleClose = jest.fn();
        const handleSuccess = jest.fn();
        const user = userEvent.setup();

        render(
            <ConfirmationDialog
                open={true}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />
        );

        await user.click(screen.getByRole('button', { name: /Confirm Deletion/i }));

        expect(handleSuccess).toHaveBeenCalledTimes(1);
    });
});