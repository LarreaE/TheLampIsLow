<?php
    header("Access-Control-Allow-Origin: *");

    //EL resto de lcases heredan esta clase realiza la conexion con mysqli y singleton

    require_once "login_data.php";

    class Conexion
    {
        private $db;
        private $host;
        private $user;
        private $pass;
        private $conexion;
        private static $_singleton = null;
        private $dbh;
        private $errno;
        private $num_rows;


        public static function getInstance()
        {
            if(is_null(self::$_singleton))
            {
                self::$_singleton = new self();
            }
            return self::$_singleton;
        }

        private function __clone()
        {
            trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR);
        }

        public function __wakeup()
        {
            trigger_error("No puede deserializar una instancia de " . get_class($this) . " class.", E_USER_ERROR);
        }

        private function __construct()
        {
            global $cfg;
            $this->db = $cfg['nombre_bd'];
            $this->host = $cfg['servidor'];
            $this->user = $cfg['usuario'];
            $this->pass = $cfg['password'];
            $this->conexion = "host=$this->host dbname=$this->db user=$this->user password=$this->pass";

            $this->dbh = pg_connect($this->conexion);

            //$this->dbh = new mysqli($host, $user, $pass, $db);
            
            //$dbpublications = pg_connect("host=$host port=5500 dbname=$db user=$user password=$pass");

            //$this->dbh = new mysqli($host, $user, $pass, $db);


            if(!$this->dbh)
            {
                die("Fatal error en la conexion con la BD");
            }
            // else
            // {
            //    // OJO: Descomentar para pruebas, acordarse de quitar cuando se hagan peticiones desde cliente.
            //    echo "Connection OK <br>";
            // }

            //return $this->dbh !== false;
        }

        public function getConnection()
        {
            return self::$_singleton;
        }

        public function cerrar()
        {
            self::$_singleton->close();
        }

        protected function query($sql)
        {
            // echo "HA ENTRADO EN QUERY";
            // echo "<br>";
            $result = pg_query($this->dbh, $sql);



            if(!$result)
            {
                //echo "ERROR";
                //echo "Error: " . $sql . "<br>" . $this->dbh->error;
                die("Fatal error al ejecutar query");
            }

            return $result;
        }
    }

?>