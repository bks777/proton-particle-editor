<?php

/**
 * Class Export
 */
class Export
{
    protected $name;
    protected $json;

    protected $path;

    protected $template = "export_%s.json";

    /**
     * @param $name
     * @param $json
     */
    public function __construct($name, $json){

        $this->name = $name;
        $this->json = $json;

        echo $this->path = dirname(__DIR__) . "/saved/";
    }

    public function execute(){print_r($this);
        file_put_contents($this->path . sprintf($this->template, $this->name), $this->json);
    }

}

$export = new Export($_POST["name"], $_POST["exportData"]);
$export->execute();