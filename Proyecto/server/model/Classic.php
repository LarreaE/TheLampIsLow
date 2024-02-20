<?php
header("Access-Control-Allow-Origin: *");

require_once "ModelBase.php";

class Classic extends ModelBase
{
    function __construct()
    {
        //Inicializamos el nombre de la tabla
        $this->table_name = 'scores';

        //Llamamos al constructor de la clase MOdelBAse
        parent::__construct();
    }
}

?>