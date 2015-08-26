#!/bin/bash
echo Déploiement
git pull
composer update
composer install --optimize-autoloader
php -d memory_limit=1024M app/console cache:clear --env=prod --no-debug
php -d memory_limit=256M app/console assetic:dump --env=prod --no-debug
 
exit 0