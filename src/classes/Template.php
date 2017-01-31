<?php

class Template {

    /**
     * The base path to the templates directory.
     *
     * @var string $path
     */
    private $path = 'templates';

    /* @var string $name */
    private $name;

    /* @var array $args */
    private $args;

    /**
     * @param string $name
     * @param array  $args
     */
    public function __construct($name, $args = [])
    {
        $this->name = $name;
        $this->args = $args;
    }

    /**
     * Determine whether the given argument exists.
     *
     * @param  string $argument
     * @return bool
     */
    public function __isset($argument)
    {
        return isset($this->args[$argument]);
    }

    /**
     * Magic getter method for retrieving arguments.
     *
     * @param  $argument
     * @return mixed
     */
    public function __get($argument)
    {
        return $this->args[$argument];
    }

    /**
     * Render the template.
     */
    public function render()
    {
        if ($file = locate_template($this->path . '/' . $this->name))  {
            include $file;
        }
    }

}