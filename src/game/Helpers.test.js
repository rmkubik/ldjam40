import {findEuclideanDistance} from './Helpers';

describe('Find Euclidean Distance', () => {
    it('should find correct distance for zeroes', () => {
        const distance = findEuclideanDistance({x: 0, y: 0}, {x: 0, y: 0});

        expect(distance).toEqual(0);
    });

    it('should find correct distance for positives', () => {
        const distance = findEuclideanDistance({x: 0, y: 0}, {x: 2, y: 2});

        expect(distance).toBeCloseTo(2.828, 2);
    });

    it('should find correct distance for negatives', () => {
        const distance = findEuclideanDistance({x: -2, y: -2}, {x: 0, y: 0});

        expect(distance).toBeCloseTo(2.828, 2);
    });

    it('should find correct distance for postives and negatives', () => {
        const distance = findEuclideanDistance({x: -2, y: 0}, {x: 0, y: 2});

        expect(distance).toBeCloseTo(2.828, 2);
    });
});
