<?php

declare(strict_types=1);

use Rector\Core\Configuration\Option;
use Rector\Symfony\Set\SymfonySetList;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return function (ContainerConfigurator $containerConfigurator): void {
    $containerConfigurator->import(SymfonySetList::SYMFONY_34);
    // take it 1 set at a time to so next set works with output of the previous set; I do 1 set per pull-request
    // $containerConfigurator->import(SymfonySetList::SYMFONY_30);
    // $containerConfigurator->import(SymfonySetList::SYMFONY_31);
    // $containerConfigurator->import(SymfonySetList::SYMFONY_32);
    // $containerConfigurator->import(SymfonySetList::SYMFONY_33);
    // $containerConfigurator->import(SymfonySetList::SYMFONY_34);

    // set paths to directories with your code
    $parameters = $containerConfigurator->parameters();
    $parameters->set(Option::PATHS, [
        __DIR__ . '/app',
        __DIR__ . '/src',
        __DIR__ . '/tests',
    ]);
};
