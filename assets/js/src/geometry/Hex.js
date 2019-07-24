export default class Hex {
    constructor(q, r) {
        this.q = q;
        this.r = r;
        this.s = -q - r;
    }
}

Hex.Directions = [
    new Hex(1, -1), new Hex(1, 0), new Hex(0, 1),
    new Hex(-1, 1), new Hex(-1, 0), new Hex(0, -1)
];

/**
 * Sum up two hexes.
 *
 * @param {Hex} a
 * @param {Hex} b
 * @returns {Hex}
 */
Hex.add = function(a, b) {
    return new Hex(a.q + b.q, a.r + b.r);
};

/**
 * Get the neighboring hex.
 *
 * @param {Hex} hex
 * @param {number} dir
 * @returns {Hex}
 */
Hex.neighbor = function(hex, dir) {
    const direction = Hex.Directions[dir];
    return this.add(hex, direction);
};

/**
 * Get all neighboring hexes.
 *
 * @param {Hex} hex
 * @returns {Hex[]}
 */
Hex.neighbors = function(hex) {
    const neighbors = [];

    for (let i = 0; i < 6; i++) {
        neighbors.push(Hex.neighbor(hex, i));
    }

    return neighbors;
};

/**
 * Round to the nearest hex position.
 *
 * @param {Hex} hex
 * @returns {Hex}
 */
Hex.round = function(hex) {
    let rX = Math.round(hex.q);
    let rY = Math.round(hex.r);
    const rZ = Math.round(hex.s);

    const xDiff = Math.abs(rX - hex.q);
    const yDiff = Math.abs(rY - hex.r);
    const zDiff = Math.abs(rZ - hex.s);

    if (xDiff > yDiff && xDiff > zDiff) {
        rX = -rY - rZ;
    } else if (yDiff > zDiff) {
        rY = -rX - rZ;
    }

    return new Hex(rX, rY);
};
