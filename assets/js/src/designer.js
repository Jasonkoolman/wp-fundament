import Point from './geometry/Point';
import Hex from './geometry/Hex';
import Grid from './designer/Grid';
import Tile from './designer/Tile';

const rootElement = document.getElementById('designer');
let activeElement = null;

if (rootElement) {
    const svgRootElement = rootElement.getElementsByTagName('svg')[0];
    const grid = new Grid(rootElement, 200, new Point(38, 38));

    $('.colors li').click(function(e) {
        const hex = $(this).data('hex');
        grid.activeTile.fill(hex);
    });

    $('#tile-delete-btn').click(function(e) {
        grid.activeTile.clear();
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
        grid.tiles.forEach(t => {
            t.update();
            t.draw();
        });
        grid.touch();
    });

    grid.addTile([
        new Tile(new Hex(0, 0), grid),
    ]);

    grid.draw();
}
