<?php

if (function_exists('acf_add_local_field_group')):

acf_add_local_field_group([
	'key' => 'cpt-review',
	'title' => 'cpt-review',
	'fields' => [
        [
			'key' => 'cpt-review-author',
			'label' => 'Auteur',
			'name' => 'author',
			'type' => 'text',
			'required' => 1
		],
		[
			'key' => 'cpt-review-rating',
			'label' => 'Beoordeling',
			'name' => 'rating',
			'type' => 'range',
			'required' => 1,
			'min' => 1,
			'max' => 5,
			'step' => 0.5,
		],
	],
	'location' => [
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'review',
			],
		],
	],
	'position' => 'normal',
	'style' => 'seamless',
	'active' => true,
	'description' => '',
    'hide_on_screen' => '',
]);

endif;
