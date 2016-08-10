<?php

/**
 * Class Import
 */
class Import
{
    protected $name;
    protected $json;

    protected $path;

    protected $template = "export_%s.json";

    public function __construct($name)
    {
        $this->name = $name;

        $this->path = dirname(__DIR__) . "/saved/";
    }

    /**
     * File exist
     * @return bool
     */
    private function findFile(){

        $path = $this->path . sprintf($this->template, $this->name);

        if(!is_file($path)){

            echo json_encode(array(
                "result"=>null,
                "error"=> sprintf("File %s not found!", sprintf($this->template, $this->name))
                ));

            return false;
        }

        return true;
    }

    /**
     * Execute
     */
    public function execute()
    {
        if($this->findFile()){

            $path = $this->path . sprintf($this->template, $this->name);

            $data = file_get_contents($path);

            echo json_encode(array(
                "result"=>json_decode($data),
                "error"=> null
            ));
        }
    }
}

$import = new Import($_POST["name"]);
$import->execute();