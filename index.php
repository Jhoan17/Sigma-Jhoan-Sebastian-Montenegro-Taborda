<?php

require_once 'Models/Connection.php';
$controller = 'Contacto';

if (!isset($_REQUEST['c'])) {
	
	require_once 'Controllers/'.$controller.'Controller.php';
	$controller = $controller."Controller";
	$controller = new $controller;
	$controller->index();

}else{

	$controller = $_REQUEST['c'];
	$action = isset($_REQUEST['a']) ? $_REQUEST['a'] : 'index';

	require_once "Controllers/".$controller."Controller.php";
	$controller = $controller."Controller";
	$controller = new $controller;

	call_user_func( array( $controller, $action ));


}

?>