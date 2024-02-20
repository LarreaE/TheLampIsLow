<?php
    header("Access-Control-Allow-Origin: *");

    require_once (__DIR__."/../model/Classic.php");

    //Creamos nuestros modelos
    $classic = new Classic();

?>