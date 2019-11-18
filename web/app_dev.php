<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || !(in_array(@$_SERVER['HTTP_X_FORWARDED_FOR'], array('127.0.0.1', 'fe80::1', '::1', '109.190.99.187')) || php_sapi_name() === 'cli-server')
) {
    header('HTTP/1.0 403 Forbidden');
    exit('Welcome ;-)');
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
