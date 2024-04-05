<?php

use Symfony\Component\Debug\Debug;
use Symfony\Component\HttpFoundation\Request;

date_default_timezone_set('Europe/Paris');

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || ( isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !(in_array(@$_SERVER['HTTP_X_FORWARDED_FOR'], array('127.0.0.1', '::1', '78.193.220.199', '212.114.20.207', '82.64.108.167'), true) || PHP_SAPI === 'cli-server') )
    || ( !isset($_SERVER['HTTP_X_FORWARDED_FOR']) && isset($_SERVER['REMOTE_ADDR']) && !(in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1', '78.193.220.199', '212.114.20.207', '82.64.108.167'), true) || PHP_SAPI === 'cli-server') )
) {
    header('HTTP/1.0 403 Forbidden');
    exit('Welcome ;-)');
}

$loader = require __DIR__.'/../app/autoload.php';
Debug::enable();

$kernel = new AppKernel('dev', true);
Request::setTrustedProxies(['192.168.10.10'], Request::HEADER_X_FORWARDED_ALL);
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);