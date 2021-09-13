#!/bin/bash
echo "################################";
echo "####       Déploiement      ####";
echo "################################";

dumpflag=off
while getopts d opt
do
    case "$opt" in
      d)  dumpflag=on;;
      \?)		# unknown flag
      	  echo >&2 \
	  "usage: $0 [-d]"
	  exit 1;;
    esac
done
shift `expr $OPTIND - 1`

git pull
composer update
composer install --optimize-autoloader
composer dump-autoload --optimize --no-dev --classmap-authoritative
php -d memory_limit=2048M bin/console doctrine:cache:clear-metadata
php -d memory_limit=2048M bin/console doctrine:cache:clear-result
php -d memory_limit=2048M bin/console doctrine:cache:clear-query
php -d memory_limit=2048M bin/console cache:clear --env=prod --no-debug

if [ $dumpflag = "on" ]; then
    php -d memory_limit=2048M bin/console assetic:dump --env=prod --no-debug
fi

php bin/console assets_version:increment
php -d memory_limit=2048M bin/console cache:clear --env=prod --no-debug

php -d memory_limit=2048M bin/console newrelic:notify-deployment --env=prod

exit 0