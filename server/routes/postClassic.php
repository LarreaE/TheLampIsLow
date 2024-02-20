<?php
    header("Access-Control-Allow-Origin: *");
    require_once (__DIR__."/../controller/Controller.php");

    // echo "Hello world";
    // echo "<br>";

    //TEST POST ROUTE. Quitar posteriormente
    // $_POST['name']    = 'BBA';
    // $_POST['score']     = '3200';
 

    if(isset($_POST['name']) && isset($_POST['score']))
    {
        // echo "En el if ha entrado";
        // echo "<br>";

        //Si se reciben todos los datos por POST creamos nuestro nuevo objeto Classic
        $newClassic['name']   = $_POST['name'];
        $newClassic['score']    = $_POST['score'];
      
        //Añadimos el nuevo objeto a la BD
        $returnValue = $classic->addNew($newClassic);



        if($returnValue == FALSE)
        {
            echo "Error en la intrudicción de nuevo elemento en la BD";
        }
        else
        {
            //Devolvemos el resultado añadido en la BD como JSON
            echo json_encode($newClassic);
        }
    }
    else
    {
        die("Forbidden");
    }
?>