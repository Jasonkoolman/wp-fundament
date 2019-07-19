function Point(x, y) {
    this.x = x;
    this.y = y;

    /**
     * Retrieve the point in the middle of two points.
     *
     * @param {Point} a
     * @param {Point} b
     */
    this.mid = function(a, b) {
        return new Point(
            (a.x + b.x) / 2,
            (a.y + b.y) / 2
        );
    };

    /**
     * Get the textual representation of a point.
     *
     * @return {string}
     */
    this.toString = function() {
        return `${this.x},${this.y}`;
    }
}

var directions = [
    new Hex(1, -1), new Hex(1, 0), new Hex(0, 1),
    new Hex(-1, 1), new Hex(-1, 0), new Hex(0, -1)
];

function Hex(q, r) {
    this.q = q;
    this.r = r;
    this.s = -q - r;

    /**
     * Sum up two hexes.
     *
     * @param {Hex} a
     * @param {Hex} b
     * @returns {Hex}
     */
    this.add = function(a, b) {
        return new Hex(a.q + b.q, a.r + b.r);
    };

    /**
     * Get the neighboring hex.
     *
     * @param {Hex} hex
     * @param {number} dir
     * @returns {Hex}
     */
    this.neighbor = function(hex, dir) {
        var direction = directions[dir];
        return this.add(hex, direction);
    };

    /**
     * Round to the nearest hex position.
     *
     * @param {Hex} hex
     * @returns {Hex}
     */
    this.round = function(hex) {
        var rX = Math.round(hex.q);
        var rY = Math.round(hex.r);
        var rZ = Math.round(hex.s);

        var xDiff = Math.abs(rX - hex.q);
        var yDiff = Math.abs(rY - hex.r);
        var zDiff = Math.abs(rZ - hex.s);

        if (xDiff > yDiff && xDiff > zDiff) {
            rX = -rY - rZ;
        } else if (yDiff > zDiff) {
            rY = -rX - rZ;
        }

        return new Hex(rX, rY);
    }
}

class Orientation {
    constructor(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
        this.f0 = f0;
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.start_angle = start_angle;
    }
}

Orientation.pointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
Orientation.flat = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

class Grid {

    constructor(svgRootElement, viewport, size) {
        this.svg = svgRootElement;
        this.svg.setAttribute('viewBox', `0 0 ${viewport.x} ${viewport.y}`);
        this.tiles = [];
        this.origin = new Point(viewport.x / 2, viewport.y / 2);
        this.size = size;
        this.orientation = Orientation.pointy;

        setTimeout(() => {
            this.orientation = Orientation.flat;
            this.update();
        }, 3000);
    }

    addTile(tile) {
        if (Array.isArray(tile)) {
            this.tiles.push(...tile);
        } else {
            this.tiles.push(tile);
        }
    }

    removeTile(hex) {
        const index = this.tiles.findIndex(t =>
            (t.hex.q === hex.q && t.hex.r === hex.r)
        );

        if (index) {
            this.tiles.splice(index, 1);
        }
    }

    hexToPixel(h) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return new Point(x + origin.x, y + origin.y);
    }
    pixelToHex(p) {
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
        return new Hex(q, r, -q - r);
    }
    hexCornerOffset(corner) {
        var M = this.orientation;
        var size = this.size;
        var angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }
    polygonCorners(h) {
        var corners = [];
        var center = this.hexToPixel(h);
        for (var i = 0; i < 6; i++) {
            var offset = this.hexCornerOffset(i);
            corners.push(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }

    update() {
        this.tiles.forEach(t => t.update());
    }

}

var svgRootElement = document.getElementById('configurator');

const grid = new Grid(svgRootElement, new Point(720, 480), new Point(36, 36));

class Tile {

    constructor(hex, grid) {
        this.hex = hex;
        this.grid = grid;
        this.center = this.grid.hexToPixel(hex);
        this.element = null;
        this.color = null;
    }

    update() {
        const points = this.grid.polygonCorners(this.hex);

        this.element.childNodes.forEach(node => {
            node.setAttribute('points', points);
        });
    }

    create(color) {
        const points = this.grid.polygonCorners(this.hex);

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'hex');
        group.setAttribute('transform-origin', this.center.x + 'px ' + this.center.y + 'px');

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('class', 'hex-shape');
        polygon.setAttribute('points', points.join(' '));
        polygon.setAttribute('fill', 'transparent');
        polygon.setAttribute('stroke', '#CCC');

        if (color) {
            const img = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            img.setAttribute('class', 'hex-img');
            img.setAttribute('points', points.join(' '));
            img.setAttribute('fill', 'url(#fabric)');
            polygon.setAttribute('fill', color);
            polygon.setAttribute('stroke-width', 0);
            group.appendChild(img);
        }

        group.appendChild(polygon);

        this.color = color;
        this.element = this.grid.svg.appendChild(group);
        this.element.addEventListener('click', (e) => {
            if (!this.color) {
                const poly = this.element.getElementsByTagName('polygon')[0];

                poly.setAttribute('fill', '#099660');

                for (let i = 0; i < 6; i++) {
                    const neighbor = this.hex.neighbor(this.hex, i);

                    const isEmpty = !grid.tiles.some(function (gt) {
                        return gt.hex.q === neighbor.q
                            && gt.hex.r === neighbor.r;
                    });

                    if (isEmpty) {
                        const honeycomb = new Tile(neighbor, this.grid);
                        honeycomb.create();
                        this.grid.addTile(honeycomb);
                    }
                }
            }
        });
    }

}

grid.addTile([
    new Tile(new Hex(0, 0), grid),
]);

console.log(grid.tiles);

grid.tiles.forEach(t => {
    t.create('#099660');

    for (let i = 0; i < 6; i++) {
        const neighbor = t.hex.neighbor(t.hex, i);

        const isEmpty = !grid.tiles.some(function (gt) {
            return gt.hex.q === neighbor.q
                && gt.hex.r === neighbor.r;
        });

        if (isEmpty) {
            const honeycomb = new Tile(neighbor, grid);
            honeycomb.create();
            grid.addTile(honeycomb);
        }
    }
});
