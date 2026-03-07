import { delay } from './delay';

describe('delay utility', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should resolve after the specified timeout', async () => {
        const spy = jest.fn();
        const promise = delay(1000).then(spy);

        expect(spy).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);
        expect(spy).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);
        await promise;

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
