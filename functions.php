<?php

// PSR-4 autoloader
spl_autoload_register(function($class) {
    $dir = __DIR__ . '/src/classes/';
    $file =  $dir . $class . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// Include scripts
$includes = ['setup', 'actions', 'widgets', 'post-types', 'custom-fields', 'helpers'];

foreach ($includes as $include) {
    require sprintf('%s/src/%s.php', __DIR__, $include);
}
