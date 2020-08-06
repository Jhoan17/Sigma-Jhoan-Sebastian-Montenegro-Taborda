<?php

/**
 * 
 */
class Connection 
{
	
	public static function startUp()
	{

		$pdo = new PDO('mysql:host=178.128.146.252:3306;dbname=admin_sigmatest;charset=utf8', 'admin_sigmauser', 'pfaDKIJyPF');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $pdo;
	}
}

?>