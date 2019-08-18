export default class Tile {

    constructor(hex, grid, color) {
        this.hex = hex;
        this.grid = grid;
        this.element = null;
        this.center = null;
        this.points = [];
        this.color = color;
        this.listeners = {
            'click': this.onClick.bind(this)
        };

        this._init();
    }

    _init() {
        this.element = this.grid.svg.querySelector('.tiles').appendChild(
            Tile.createElement()
        );

        Object.keys(this.listeners).forEach(key => {
            this.element.addEventListener(key, this.listeners[key]);
        });
    }

    draw() {
        const $elem = $(this.element);
        const $icon = $elem.find('.tile-icon');

        this.center = this.grid.hexToPixel(this.hex);
        this.points = this.grid.hexCorners(this.hex);
        this.element.setAttribute('transform-origin', `${this.center.x}px ${this.center.y}px`);

        $elem.children('polygon').attr('points', this.points);

        if (this.color) {
            this.fill(this.color);
        }

        $icon.attr('transform', `translate(${this.center.x - 9}, ${this.center.y - 9})`);
    }

    destroy() {
        Object.keys(this.listeners).forEach(key => {
            this.element.removeEventListener(key, this.listeners[key]);
        });

        this.element.parentNode.removeChild(this.element);
        this.element = null;
    }

    fill(color) {
        const $elem = $(this.element);
        const $shape = $elem.find('.tile-shape');
        $elem.removeClass('tile--clear');
        $elem.addClass('tile--fill');
        $shape.attr('fill', color);
        $shape.attr('stroke', color);
        this.color = color;
    }

    clear() {
        const $elem = $(this.element);
        const $shape = $elem.find('.tile-shape');
        $elem.removeClass('tile--fill');
        $elem.addClass('tile--clear');
        $shape.attr('fill', null);
        this.color = null;
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
    const icon = document.createElementNS(ns, 'g');
    const icon_add = document.createElementNS(ns, 'path');
    const icon_edit = document.createElementNS(ns, 'path');

    polygon.setAttribute('class', 'tile-shape');
    img.setAttribute('class', 'tile-img');
    icon.setAttribute('class', 'tile-icon');
    icon_add.setAttribute('class', 'tile-add');
    icon_add.setAttribute('d', 'M9 0C8.58579 0 8.25 0.335781 8.25 0.75V8.25H0.75C0.335787 8.25 0 8.58579 0 9C0 9.41421 0.335787 9.75 0.75 9.75H8.25V17.25C8.25 17.6642 8.58579 18 9 18C9.41421 18 9.75 17.6642 9.75 17.25V9.75H17.25C17.6642 9.75 18 9.41421 18 9C18 8.58579 17.6642 8.25 17.25 8.25H9.75V0.75C9.75 0.335781 9.41421 0 9 0Z');
    icon_edit.setAttribute('class', 'tile-edit');
    icon_edit.setAttribute('d', 'M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z');
    icon.appendChild(icon_add);
    icon.appendChild(icon_edit);

    group.setAttribute('class', 'tile tile--clear');
    group.appendChild(polygon);
    group.appendChild(img);
    group.appendChild(icon);

    return group;
};
