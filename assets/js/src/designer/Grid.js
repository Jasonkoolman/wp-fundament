import Tile from './Tile';
import Point from '../geometry/Point';
import Hex from '../geometry/Hex';
import Orientation from '../geometry/Orientation';

/**
 * Axial hexagon grid using SVG.
 *
 * @see https://www.redblobgames.com/grids/hexagons
 */
export default class Grid {

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

    }

    touch() {
        const bounds = this.getBoundaries();
        const tileSize = this.getTileSize();

        this.viewport = {
            x1: bounds.minX - (tileSize.width / 2),
            y1: bounds.minY - (tileSize.height / 2),
            x2: bounds.maxX + (tileSize.width / 2),
            y2: bounds.maxY + (tileSize.height / 2)
        };

        console.log(tileSize);

        const width = Math.abs(this.viewport.x1) + this.viewport.x2;
        const height = Math.abs(this.viewport.y1) + this.viewport.y2;
        const viewBox = `${this.viewport.x1} ${this.viewport.y1} ${width} ${height}`;

        this.svg.setAttribute('width', width);
        this.svg.setAttribute('viewBox', viewBox);
        // this.tiles.forEach(t => t.update());
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

    hexCornerOffset(corner) {
        const M = this.orientation;
        const size = this.size;
        const angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
        const x = size.x * Math.cos(angle);
        const y = size.y * Math.sin(angle);

        return new Point(x, y);
    }

    getBoundaries() {
        let minX = 0, minY = 0, maxX = 0, maxY = 0;

        this.tiles.forEach(t => {
            const p = t.center;

            if (p.x <= minX) minX = p.x;
            else if (p.x > maxX) maxX = p.x;

            if (p.y <= minY) minY = p.y;
            else if (p.y > maxY) maxY = p.y;
        });

        return { minX, minY, maxX, maxY };
    }

    getTileSize() {
        let height = this.size.y * 2;
        let width = Math.sqrt(3) / 2 * height;
        let v = width;
        let h = height * 0.75;

        if (this.orientation === Orientation.flat) {
            return { // reversed dimensions
                width: height,
                height: width,
                v: h,
                h: v
            }
        }

        return {
            width,
            height,
            v,
            h
        };
    }

}
