<?php
header("Access-Control-Allow-Origin: *");


$conn_string = "host=ep-empty-hall-a2dlvvy6.eu-central-1.aws.neon.tech port=5432 dbname=EpicProject user=eneko.larrea password=5upjUiYN4dZI";
$dbconn4 = pg_connect($conn_string)
  or die("No se pudo conectar");
echo "Conectado con éxito";

$query = "select * from scores;";

$result = pg_query($dbconn4, $query);

if (!$result) {
  echo "Query failed: " . pg_last_error();
  exit();
}

while ($row = pg_fetch_assoc($result)) {
  echo "ID: " . $row['score_id'] . ", Name: " . $row['name'] . " , " . $row['score'] . "<br>";
}

pg_close($conn);

?>