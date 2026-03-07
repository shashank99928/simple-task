import { render, screen } from '@testing-library/react';
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
});
