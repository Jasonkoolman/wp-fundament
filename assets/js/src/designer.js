class Point {
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

class Hex {
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

    constructor(svgRootElement, width, size) {
        this.svg = svgRootElement;
        this.tiles = [];
        this.size = size;
        this.viewport = {x1: 0, y1: 0, x2: width, y2: width};
        this.width = width;
        this.origin = new Point(this.width / 2, this.width / 2);
        this.orientation = Orientation.pointy;
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

    draw() {
        this.svg.setAttribute('width', this.width);
        this.svg.setAttribute('viewBox', `${this.viewport.x1} ${this.viewport.y1} ${this.viewport.x2} ${this.viewport.y2}`);
        this.tiles.forEach(tile => {
            tile.draw();
            tile.fill('#222');
            this.drawNeighbors(tile);
        });
        // grid.updateWidth();

    }

    touch() {
        const bounds = this.getBoundaries();
        const tileSize = this.getTileSize();
        // console.log();
        this.viewport = {
            x1: bounds.minX - (tileSize.width / 2),
            y1: bounds.minY - (tileSize.height / 2),
            x2: bounds.maxX + (tileSize.width / 2),
            y2: bounds.maxY + (tileSize.height / 2)
        };

        const width = Math.abs(this.viewport.x1) + this.viewport.x2;
        const height = Math.abs(this.viewport.y1) + this.viewport.y2;
        const viewBox = `${this.viewport.x1} ${this.viewport.y1} ${width} ${height}`;

        this.svg.setAttribute('width', width);
        this.svg.setAttribute('viewBox', viewBox);
    }

    drawNeighbors(tile) {
        for (let i = 0; i < 6; i++) {
            const neighbor = Hex.neighbor(tile.hex, i);

            if (!this.hasTile(neighbor)) {
                const honeycomb = new Tile(neighbor, this);
                honeycomb.draw();
                this.addTile(honeycomb);
            }
        }
    }

    hasTile(hex) {
        return this.tiles.some(function (t) {
            return t.hex.q === hex.q
                && t.hex.r === hex.r;
        });
    }

    hexToPixel(h) {
        const M = this.orientation;
        const size = this.size;
        const origin = this.origin;
        const x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        const y = (M.f2 * h.q + M.f3 * h.r) * size.y;

        return new Point(x + origin.x, y + origin.y);
    }
    pixelToHex(p) {
        const M = this.orientation;
        const size = this.size;
        const origin = this.origin;
        const pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        const q = M.b0 * pt.x + M.b1 * pt.y;
        const r = M.b2 * pt.x + M.b3 * pt.y;

        return new Hex(q, r);
    }
    hexCornerOffset(corner) {
        const M = this.orientation;
        const size = this.size;
        const angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
        const x = size.x * Math.cos(angle);
        const y = size.y * Math.sin(angle);

        return new Point(x, y);
    }
    hexCorners(h) {
        const corners = [];
        const center = this.hexToPixel(h);

        for (let i = 0; i < 6; i++) {
            const offset = this.hexCornerOffset(i);
            const corner = new Point(center.x + offset.x, center.y + offset.y);
            corners.push(corner);
        }

        return corners;
    }

    update() {
        this.tiles.forEach(t => t.update());
    }

    updateWidth(position) {
        const width = this.getCanvasWidth();
        const height = this.getCanvasHeight();
        this.viewport = {x1: 0, y1: 0, x2: width, y2: height};

        // if (position.x > )
        // console.log(position, this.origin);

        if (this.origin === null) {
            this.origin = new Point(width / 2, height / 2); // set origin to center
        } else {
            const offsetX = position.x - this.origin.x;
            const offsetY = position.y - this.origin.y;
            console.log(offsetX, offsetY);
            // this.origin = new Point(width / 2, height / 2); // shift origin
            if (offsetX < 0) {
                this.viewport = {x1: offsetX, y1: offsetY, x2: this.viewport.x2, y2: this.viewport.y2};
            } else {
                this.viewport = {x1: this.viewport.x1, y1: this.viewport.y1, x2: this.viewport.x2, y2: this.viewport.y2};
            }
            console.log(this.origin);
        }


        this.width = width;
        this.height = height;

        // if (this.origin.x)

        this.svg.setAttribute('width', this.width);
        this.svg.setAttribute('viewBox', `${this.viewport.x1} ${this.viewport.y1} ${this.viewport.x2} ${this.viewport.y2}`);

        this.update();
    }

    getBoundaries() {
        let minX = 0, minY = 0, maxX = 0, maxY = 0;

        this.tiles.forEach(t => {
            const p = t.center;

            if (!p) return;

            if (p.x <= minX) {
                minX = p.x;
            } else if (p.x > maxX) {
                maxX = p.x;
            }

            if (p.y <= minY) {
                minY = p.y;
            } else if (p.y > maxY) {
                maxY = p.y;
            }
        });

        return { minX, minY, maxX, maxY };
    }

    getCanvasWidth() {
        const tileSize = this.getTileSize();
        const min = this.getHexMin('q');
        const max = this.getHexMax('q');

        let tileWidth = tileSize.width;
        let total = 0;

        for (let i = min; i <= max; i++) {
            total += tileWidth;
        }

        return total;
    }

    getCanvasHeight() {
        const tileSize = this.getTileSize();
        const min = this.getHexMin('r');
        const max = this.getHexMax('r');

        let tileHeight = tileSize.height;
        let total = 0;

        for (let i = min; i <= max; i++) {
            total += tileHeight;
        }

        return total;
    }

    getHexMin(key, start = 0) {
        return this.tiles.reduce((min, t) => t.hex[key] < min ? t.hex[key] : min, start);
    }

    getHexMax(key, start = 0) {
        return this.tiles.reduce((max, t) => t.hex[key] > max ? t.hex[key] : max, start);
    }

    getTileSize() {
        let height, width, v, h;

        // if () {
        height = (this.orientation === Orientation.flat ? this.size.x : this.size.y) * 2;
        width = Math.sqrt(3) / 2 * height;
        v = height * 0.75;
        h = width;
        // } else {
        //     width = this.size * 2;
        //     height = Math.sqrt(3) / 2 * width;
        //     v = width;
        //     h = height * 0.75;
        // }

        return { width, height, v, h };
    }

}

const rootElement = document.getElementById('designer');
const svgRootElement = rootElement.getElementsByTagName('svg')[0];

const $config = $(rootElement).find('.tile-config');

const grid = new Grid(svgRootElement, 188, new Point(36, 36));
let activeElement = null;

$('.colors li').click(function(e) {
    const hex = $(this).data('hex');
    activeElement.fill(hex);
});

$('#tile-delete-btn').click(function(e) {
    activeElement.clear();
});

let isTilt = false;
$('#3d').click((e) => {
    const $elem = $('.tile-grid');
    if (isTilt) {
        $elem.tilt.destroy.call($elem);
        isTilt = false;
    } else {
        $elem.tilt({
            reset: false
        });
        isTilt = true;
    }

});

$('#relaxed').click((e) => {
    $(svgRootElement).toggleClass('tiles--relaxed')
});

$('#orientation').click((e) => {
    grid.orientation = (grid.orientation === Orientation.pointy)
        ? Orientation.flat
        : Orientation.pointy;
    grid.update();
});


class Tile {

    constructor(hex, grid) {
        this.hex = hex;
        this.grid = grid;
        this.element = null;
        this.center = null;
        this.points = [];
        this.color = null;
        this._init();
    }

    _init() {
        const elem = Tile.createElement();
        this.update();
        this.element = this.grid.svg.getElementsByClassName('tiles')[0].appendChild(elem);
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    update() {
        this.center = this.grid.hexToPixel(this.hex);
        this.points = this.grid.hexCorners(this.hex);
    }

    draw() {
        this.element.setAttribute('transform-origin', `${this.center.x}px ${this.center.y}px`);
        this.element.childNodes.forEach(node => {
            node.setAttribute('points', this.points);
        });
    }

    fill(hex) {
        const $elem = $(this.element);
        const $shape = $elem.find('.tile-shape');
        $elem.removeClass('tile--clear');
        $elem.addClass('tile--fill');
        $shape.attr('fill', hex);
        $shape.attr('stroke', hex);
        this.color = hex;
    }

    clear() {
        const $elem = $(this.element);
        $elem.removeClass('tile--fill');
        $elem.addClass('tile--clear');
        this.color = null;
    }

    onClick(event) {
        activeElement = this;

        if (this.color) {
            $config.css({
                top: `${this.center.y}px`,
                left: `${this.center.x}px`
            }).fadeIn();
        } else {
            this.fill('#222');
            for (let i = 0; i < 6; i++) {
                this.grid.drawNeighbors(this);
            }
        }

        this.grid.touch();
        // this.grid.updateWidth(this.center);
    }

}

Tile.createElement = function() {
    const ns = 'http://www.w3.org/2000/svg';
    const group = document.createElementNS(ns, 'g');
    const polygon = document.createElementNS(ns, 'polygon');
    const img = document.createElementNS(ns, 'polygon');
    group.setAttribute('class', 'tile tile--clear');
    group.appendChild(polygon);
    group.appendChild(img);
    polygon.setAttribute('class', 'tile-shape');
    img.setAttribute('class', 'tile-img');
    return group;
};

grid.addTile([
    new Tile(new Hex(0, 0), grid),
]);

grid.draw();
