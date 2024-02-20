<?php
header("Access-Control-Allow-Origin: *");


require_once (__DIR__."/../db/Conexion.php");

class ModelBase extends Conexion
{
    protected $conexion;
    protected $table_name;

    function __construct()
    {
        $this->conexion = parent::getInstance();
    }

    //Obtiene todos los elementos de la tabla
    function getAll()
    {
        $query = $this->selectDB($this->table_name);

        $result = $this-> conexion -> query($query);

        //Creamos el array asociativo para devolver los datos
        $array = $this->createArray($result);

        return $array;
        $result->close();
    }

    function getAllByColumn($search_name, $search_value)
    {
        $query = $this->selectDB($this->table_name, "*", $search_name, $search_value);
        $result = $this->conexion->query($query);

        $array = $this->createArray($result);

        $result->close();
        return $array;
    }

    function addNew($array)
    {
        $query = $this->insertDB($this->table_name, $array);

        $result = $this-> conexion -> query($query);

        return $result;
    }

    protected function createArray($data)
    {
        $array = [];

        while($row = pg_fetch_assoc($data))
        {
            $array[] = $row;
        }

        return $array;
    }

    //Devuelve un Query de la forma "SELECT * FROM table WHERE author = 'Jane Austen'"
    //Parametros:
    // $table: Nombre de la tabla(FROM)
    // $columns: COlumnas a extraer (SELECT). sI NO S PASA ESTE PARAMETRO, SE ENTIENDE QUE SE EXTRAEN TODAS (*)
    // $condition: condición de búsqueda (WHERE). Si no se pasa este parametro, se entiende que no hay condicion de busqueda
    protected function selectDB($table, $columns = "*", $name = "", $value = "")
    {
        $query = "SELECT $columns FROM $table";
        if($name != "" && $value != "")
            $query .= " WHERE $name = '$value'";

        //echo $query
        return $query;
    }

    //Devuelve un query de la forma "INSERT INTO Table(author, title, category) VALUES ('JRR Tolkien', 'Lord of the rings', 'Fiction')"
    //Parametros:
    // $table: NOmbre de la tabla
    // $array: Array asociativo con los pares (name,value) correspondientes al nombre de la columna y valor
    protected function insertDB($table, $array)
    {
        // echo "Hemos entrado al insertDB";
        // echo "<br>";

        foreach ($array as $name => $value)
        {
            $insert_name[] = $name;
            $insert_value[] = $value;
        }

        $query = "INSERT INTO $table(";

        $num_elem = count(($insert_name));
        for($i = 0; $i < $num_elem; ++$i)
        {
            $query .= "$insert_name[$i]";
            if ($i != $num_elem - 1)
                $query.= ", ";
            else
                $query .= ") ";

        }

        $query .= "VALUES(";
        for ($i = 0; $i < $num_elem; ++$i)
        {
            $query .= "'$insert_value[$i]'";
            if($i != $num_elem - 1)
                $query .= ", ";
            else
                $query .= "); ";
        }

        // echo "Se ha terminado el insertDB";
        // echo "<br>";

        return $query;

    }
}




?>