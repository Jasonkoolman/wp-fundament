export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `${this.x},${this.y}`;
    }
}

/**
 * Retrieve the point in the middle of two points.
 *
 * @param {Point} a
 * @param {Point} b
 */
Point.mid = function(a, b) {
    return new Point(
        (a.x + b.x) / 2,
        (a.y + b.y) / 2
    );
};
