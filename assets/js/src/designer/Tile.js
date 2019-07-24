import Hex from '../geometry/Hex';

export default class Tile {

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
        this.listeners = {
            'click': this.onClick.bind(this)
        };

        Object.keys(this.listeners).forEach(key => {
            this.element.addEventListener(key, this.listeners[key]);
        });
    }

    update() {
        this.center = this.grid.hexToPixel(this.hex);
        this.points = this.grid.hexCorners(this.hex);
    }

    destroy() {
        Object.keys(this.listeners).forEach(key => {
            this.element.removeEventListener(key, this.listeners[key]);
        });

        this.element.parentNode.removeChild(this.element);
        this.element = null;
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
        this.getTrailingNeighbors().forEach(t => {
            const index = this.grid.getTileIndex(t);
            this.grid.tiles.splice(index, 1);
            t.destroy();
        });
        this.grid.touch();
    }

    getTrailingNeighbors() {
        const trailing = [];
        const neighbors = this.grid.getTiles(
            Hex.neighbors(this.hex)
        ).filter(t => !t.color);

        neighbors.forEach(tile => {
            // get the second row of empty neighbors
            const secondNeighbors = this.grid.getTiles(
                Hex.neighbors(tile.hex)
            );

            const hasActiveNeighbor = secondNeighbors.some(t => t.color);

            if (!hasActiveNeighbor) {
                console.log('has no active', tile);
                trailing.push(tile)
            }
        });

        return trailing;
    }

    onClick(event) {
        this.grid.selectTile(this);
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
