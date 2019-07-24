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
