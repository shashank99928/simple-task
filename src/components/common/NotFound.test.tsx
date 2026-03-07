import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );

        expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
        expect(screen.getByText('Go to Home')).toBeInTheDocument();
    });
});
