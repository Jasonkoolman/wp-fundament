import Tile from './Tile';
import StaticGrid from '../designer/StaticGrid';
import Hex from '../geometry/Hex';
import Orientation from '../geometry/Orientation';

/**
 * Axial hexagon grid using SVG.
 *
 * @see https://www.redblobgames.com/grids/hexagons
 */
export default class Grid extends StaticGrid {

    constructor(rootElement, tileSize) {
        super(rootElement.querySelector('svg'), [], tileSize, Orientation.flat);
        this.activeTile = null;
        this.fillColor = '#222';
        this.$config = $(rootElement).find('.designer-config');
    }

    draw() {
        this.tiles.forEach(tile => {
            tile.draw();
            this.drawNeighbors(tile);
        });

        this.update();
    }

    drawNeighbors(tile) {
        for (let i = 0; i < 6; i++) {
            const neighbor = Hex.neighbor(tile.hex, i);

            if (!this.hasTile(neighbor)) {
                const tile = new Tile(neighbor, this);
                tile.draw();
                this.addTile(tile);
            }
        }
    }

    toggleOrientation() {
        this.orientation = (this.orientation === Orientation.pointy)
            ? Orientation.flat
            : Orientation.pointy;

        this.tiles.forEach(t => {
            t.draw();
        });

        this.touch();
    }

    findTrailingTiles() {
        const trailing = [];
        const emptyTiles = this.tiles.filter(t => !t.color);

        emptyTiles.forEach(tile => {
            const hasActiveNeighbor = this.findTileNeighbors(tile.hex).some(t => t.color);

            if (!hasActiveNeighbor) {
                trailing.push(tile)
            }
        });

        return trailing;
    }

    clearTile(tile) {
        tile.clear();

        this.findTrailingTiles().forEach(t => {
            const index = this.findTileIndex(t.hex);
            this.tiles.splice(index, 1);
            t.destroy();
        });

        this.update();
    }

    selectTile(tile) {
        this.activeTile = tile;

        if (tile.color) {
            const rect = tile.element.getBoundingClientRect();
            this.$config.css({
                top: `${rect.top}px`,
                left: `${rect.left - (rect.width / 2)}px`
            }).fadeIn();
        } else {
            tile.fill(this.fillColor);
            for (let i = 0; i < 6; i++) {
                this.drawNeighbors(tile);
            }
        }

        this.update();
    }

}
