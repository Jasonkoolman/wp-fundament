<?php
/**
 * Template Name: Home Template
 */
get_header();
?>

<div class="container">

    <section class="app-section app-section-banner">

        <div class="app-section-body">
            maak kennis met de
            <h1>Honeycomb</h2>
            <p>
                Een product waar design en functionaliteit elkaar tegenkomen. Zorg voor een prachtige akoestiek met geluiddempende honeycombs en een schitterend design.
            </p>
            <a href="product/honeycomb" class="btn btn--primary">Direct bestellen</a>
            <a href="#" class="btn btn--hollow-base">Meer ontdekken</a>
        </div>

        <div class="app-section-bg"></div>
        <div class="honeycombs style-1">
            <svg width="364" height="506" viewBox="0 0 364 506" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#222" flood-opacity="0.1" />
                    </filter>
                    <pattern id="black" x="0" y="0" width="1" height="1">
                        <rect width="315" height="315" fill="#222" />
                        <image opacity="0" width="315" height="315" xlink:href="https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png"/>
                    </pattern>
                    <pattern id="gray" x="0" y="0" width="1" height="1">
                        <rect width="315" height="315" fill="#3D5769" />
                        <image opacity="0" width="315" height="315" xlink:href="https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png"/>
                    </pattern>
                    <pattern id="blue" x="0" y="0" width="1" height="1">
                        <rect width="315" height="315" fill="#4599D7" />
                        <image opacity="0" width="315" height="315" xlink:href="https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png"/>
                    </pattern>
                </defs>
                <g class="grid">
                    <g class="hex" fill="url(#black)" filter="url(#shadow)" transform="translate(0,0)">
                        <path d="M105 0H35L0 61L35 122H105L140 61L105 0Z" />
                    </g>
                    <g class="hex" fill="url(#gray)" filter="url(#shadow)" transform="translate(111, 64)"> <!-- 105, 61 (x+6, y+3) !-->
                        <path d="M105 0H35L0 61L35 122H105L140 61L105 0Z" />
                    </g>
                    <g class="hex" fill="url(#gray)" filter="url(#shadow)" transform="translate(0, 128)"> <!-- y+6 !-->
                        <path d="M105 0H35L0 61L35 122H105L140 61L105 0Z" />
                    </g>
                    <g class="hex" fill="url(#blue)" filter="url(#shadow)" transform="translate(111, 192)"> <!-- x+4, y+2 !-->
                        <path d="M105 0H35L0 61L35 122H105L140 61L105 0Z" />
                    </g>
                    <g class="hex" fill="url(#blue)" filter="url(#shadow)" transform="translate(0, 256)">
                        <path d="M105 0H35L0 61L35 122H105L140 61L105 0Z" />
                    </g>
                    <g class="hex" fill="url(#blue)" filter="url(#shadow)" transform="translate(222, 256)">
                        <path d="M105 0H35L0 61L35 122H105L140 61L105 0Z" />
                    </g>
                    <g class="hex" fill="url(#black)" filter="url(#shadow)" transform="translate(222, 384)">
                        <path d="M105 0H35L0 61L35 122H105L140 61L105 0Z" />
                    </g>
                </g>
            </svg>
        </div>

    </section>

    <section class="app-section app-section--gray">

            <div class="app-section-body">
                creëer je eigen
                <h2>design</h2>
                <p>
                    Met de verschillende kleuren en de verrassende patronen maak je een eigen uniek design. De honeycomb past bij elk interieur door de simplistische stoffen, en creëert voor elke ruimte een heerlijke ambiance.
                </p>
                <a href="#" class="btn btn--hollow-base">Naar de designer</a>
            </div>

    </section>

    <section class="app-section app-section--inverted">

            <div class="app-section-body">
                creëer een prachtige
                <h2>akoekstiek</h2>
                <p>
                    Optimaliseer het geluid en houdt het lawaai binnen de ruimte. De honeycombs gaan echo in een kamer tegen, ze absorberen het geluid en zorgen voor een geweldige akoestiek.
                </p>
                <a href="#" class="btn btn--hollow-inverse">Meer over geluid</a>
            </div>

        <div class="app-section-overlay"></div>

        <video autoplay muted loop class="app-section-bg">
            <source src="<?php echo asset('bass.mp4') ?>" type="video/mp4">
        </video>

    </section>

    <section class="app-section">
        <div class="row">
            <div class="col col--md-4">
                <div class="feature">
                    <img src="<?php echo asset('layers.svg') ?>" width="auto" height="40">
                    <h4>Robuust</h4>
                    <p>Optimaliseer het geluid en houdt het lawaai binnen de ruimte. De honeycombs gaan echo in een kamer tegen, ze absorberen het geluid en zorgen voor een geweldige akoestiek.</p>
                </div>
            </div>
            <div class="col col--md-4">
                <div class="feature">
                    <img src="<?php echo asset('leaf.svg') ?>" width="auto" height="40">
                    <h4>Milieuvriendelijk</h4>
                    <p>Optimaliseer het geluid en houdt het lawaai binnen de ruimte. De honeycombs gaan echo in een kamer tegen, ze absorberen het geluid en zorgen voor een geweldige akoestiek.</p>
                </div>
            </div>
            <div class="col col--md-4">
                <div class="feature">
                    <img src="<?php echo asset('flames.svg') ?>" width="auto" height="40">
                    <h4>Brandwerend</h4>
                    <p>Optimaliseer het geluid en houdt het lawaai binnen de ruimte. De honeycombs gaan echo in een kamer tegen, ze absorberen het geluid en zorgen voor een geweldige akoestiek.</p>
                </div>
            </div>
        </div>
    </section>

</div>

<?php get_footer(); ?>
