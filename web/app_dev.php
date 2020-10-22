<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

date_default_timezone_set('Europe/Paris');

/*
exec('rm -rf '.__DIR__.'/../app/logs/');
exec('rm -rf '.__DIR__.'/../app/cache/d*');
exec('rm -rf '.__DIR__.'/../app/cache/p*');
die;
*/

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !(in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', 'fe80::1', '::1', '90.63.234.151', '82.64.108.167')) || php_sapi_name() === 'cli-server')
) {
    header('HTTP/1.0 403 Forbidden');
    exit('Welcome ;-)');
}

require __DIR__.'/../app/autoload.php';
Debug::enable();

$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);