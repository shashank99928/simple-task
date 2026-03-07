import { formatDate } from './formatDate';

describe('formatDate utility', () => {
    it('returns "-" when date is undefined', () => {
        expect(formatDate(undefined)).toBe('-');
    });

    it('returns "-" when date string is empty', () => {
        expect(formatDate('')).toBe('-');
    });

    it('formats valid date string correctly', () => {
        const dateString = '2023-10-15T12:00:00Z';
        // Note: toLocaleDateString() output depends on the environment's locale timezone
        // So we test if it matches the native Date object behavior
        const expected = new Date(dateString).toLocaleDateString();
        expect(formatDate(dateString)).toBe(expected);
    });
});
