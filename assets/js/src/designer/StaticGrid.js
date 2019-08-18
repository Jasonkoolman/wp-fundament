import Point from '../geometry/Point';
import Hex from '../geometry/Hex';
import Orientation from '../geometry/Orientation';

export default class StaticGrid {

    constructor(svg, tiles, tileSize, orientation) {
        this.svg = svg;
        this.width = 0;
        this.height = 0;
        this.scale = 1;
        this.bounds = {};
        this.tiles = tiles;
        this.tileSize = tileSize;
        this.orientation = orientation;
    }

    hexToPixel(h) {
        const M = this.orientation;
        const size = this.tileSize;
        const x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        const y = (M.f2 * h.q + M.f3 * h.r) * size.y;

        return new Point(x, y);
    }

    pixelToHex(p) {
        const M = this.orientation;
        const size = this.tileSize;
        const pt = new Point(p.x / size.x, p.y / size.y);
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
        const size = this.tileSize;
        const angle = 2.0 * Math.PI * (M.start_angle - corner) / 6.0;
        const x = size.x * Math.cos(angle);
        const y = size.y * Math.sin(angle);

        return new Point(x, y);
    }

    addTile(tile) {
        this.tiles.push(tile);
    }

    removeTile(hex) {
        const index = this.findTileIndex(hex);

        if (index > -1) {
            this.tiles.splice(index, 1);
        }
    }

    hasTile(hex) {
        return this.findTileIndex(hex) > -1;
    }

    findTile(hex) {
        const index = this.findTileIndex(hex);

        return index > -1 ? this.tiles[index] : null;
    }

    findTileIndex(hex) {
        return this.tiles.findIndex(t =>
            (t.hex.q === hex.q && t.hex.r === hex.r)
        );
    }

    findTiles(hexes) {
        return this.tiles.map(tile => {
            const hex = hexes.find(h =>
                (tile.hex.q === h.q && tile.hex.r === h.r)
            );

            return hex ? tile : null;
        }).filter(Boolean);
    }

    findTileNeighbors(hex) {
        const neighbors = Hex.neighbors(hex);

        return neighbors.map(
            h => this.findTile(h)
        ).filter(Boolean);
    }

    getTileSize() {
        let height = this.tileSize.y * 2;
        let width = Math.sqrt(3) / 2 * height;
        let v = width;
        let h = height * 0.75;

        if (this.orientation === Orientation.flat) {
            return { width: height, height: width, v: h, h: v };  // reversed dimensions
        }

        return { width, height, v, h };
    }

    getBoundaries() {
        let minX = 0, minY = 0, maxX = 0, maxY = 0;

        this.tiles.forEach(t => {
            const p = t.center;
            if (p.x <= minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y <= minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        });

        const tileSize = this.getTileSize();
        const rX = tileSize.width / 2;
        const rY = tileSize.height / 2;

        return {
            minX: minX - rX,
            minY: minY - rY,
            maxX: maxX + rX,
            maxY: maxY + rY
        }
    }

    update() {
        const $svg = $(this.svg);
        const bounds = this.getBoundaries();
        const width = Math.abs(bounds.minX) + bounds.maxX;
        const height = Math.abs(bounds.minY) + bounds.maxY;
        const viewBox = `${bounds.minX} ${bounds.minY} ${width} ${height}`;

        $svg.attr({ width, height, viewBox });

        // scale is calculated by dividing the computed style by the total canvas size,
        // rounded up to two decimals in order to prevent long floats
        const scaleX = Math.round($svg.width() / width * 100) / 100;
        const scaleY = Math.round($svg.height() / height * 100) / 100;

        this.width = width;
        this.height = height;
        this.scale = Math.min(scaleX, scaleY);
        this.bounds = bounds;
    }

}
