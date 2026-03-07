import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
    it('renders without crashing', () => {
        const { container } = render(<LoadingSpinner />);
        // Mui CircularProgress renders an SVG
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
