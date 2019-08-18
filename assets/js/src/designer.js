import Point from './geometry/Point';
import Hex from './geometry/Hex';
import Grid from './designer/Grid';
import Tile from './designer/Tile';

const rootElement = document.getElementById('designer');

if (rootElement) {
    const svgRootElement = rootElement.querySelector('.tile-grid');
    const grid = new Grid(rootElement, new Point(50, 50));

    $('.colors li').click(function(e) {
        const hex = $(this).data('hex');
        grid.activeTile.fill(hex);
        grid.fillColor = hex;
    });

    $('#tile-delete-btn').click(function(e) {
        grid.clearTile(grid.activeTile);
    });


    $('#setting-spacing').click((e) => {
        $(svgRootElement).toggleClass('tiles--relaxed')
    });

    $('#setting-preview').click((e) => {
        $(svgRootElement).toggleClass('tiles--preview');
    });

    $('#setting-orientation').click((e) => {
        grid.toggleOrientation();
    });

    grid.addTile(
        new Tile(new Hex(0, 0), grid, '#222'),
    );

    grid.addTile(
        new Tile(new Hex(0, 1), grid, '#222'),
    );

    grid.draw();
}
