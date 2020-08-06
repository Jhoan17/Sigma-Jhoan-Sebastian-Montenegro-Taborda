<?php

/**
 * 
 */
class Contacto
{
	private $pdo;

	public $id;
	public $name;
	public $email;
	public $state;
	public $city;

	
	function __construct()
	{
		try
		{
			$this->pdo = Connection::startUp();
		}
		catch(Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function get()
	{
		try
		{
			$result = array();

			$stm = $this->pdo->prepare("SELECT * FROM contacts ");

			$stm->execute();

			return  $stm->fetchAll(PDO::FETCH_OBJ);

		}catch(Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function insert(Contacto $data){
		try
		{
			$sql = "INSERT INTO contacts (name,email,state,city)
			VALUES (?,?,?,?)";

			$this->pdo->prepare($sql)->execute(array(
					$data->nombre,
					$data->email,
					$data->departamento,
					$data->ciudad
				)
			);
		}catch(Exception $e)
		{
			die($e->getMessage());		
		}
	}


}

?>