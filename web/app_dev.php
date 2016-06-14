<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || (
    	!in_array(@$_SERVER['HTTP_X_FORWARDED_FOR'], array('127.0.0.1', 'fe80::1', '::1', '88.179.76.43', '217.128.196.239', '37.0.72.194'))
	    && !in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', 'fe80::1', '::1', '88.179.76.43', '217.128.196.239', '37.0.72.194'))
	)
) {
    header('HTTP/1.0 403 Forbidden');
    exit('Welcome ;-) '.$_SERVER['HTTP_CLIENT_IP'].$_SERVER['REMOTE_ADDR']);
}

$loader = require_once __DIR__.'/../app/bootstrap.php.cache';
Debug::enable();

require_once __DIR__.'/../app/AppKernel.php';

$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
