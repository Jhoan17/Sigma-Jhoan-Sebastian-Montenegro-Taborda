<?php


require_once 'Models/Contacto.php';

/**
 * 
 */
class ContactoController /*extends AnotherClass*/
{
	private $contacto;

	public function __construct()
	{
		$this->contacto = new Contacto();
		
	}

	public function index(){
		$contactos = $this->contacto->get();
		// var_dump($contactos);
		require_once 'Views/index.html';
	}

	public function getDepartamento(){

		$url = "https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json";
		$json = file_get_contents($url);
		$obj = json_decode($json);
		$arrayDepartamentos = array();
		foreach ($obj as $key => $value) {
			
			$arrayDepartamentos[$key]=$value;
		}
		echo json_encode($arrayDepartamentos);

		
	}

	public function insertContacto()
	{
		$alm = new Contacto();

		$alm->departamento = $_POST['departamentos'];
		$alm->ciudad = $_POST['ciudades'];
		$alm->nombre = $_POST['nombre'];
		$alm->email = $_POST['email'];

		$this->contacto->insert($alm);

		echo "Espera pronto nuestra respuesta";

	}

	
}