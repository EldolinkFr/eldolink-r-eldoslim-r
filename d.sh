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

EXEC=vendor/gordalina/cachetool/bin/cachetool
FCGI_SOCKET=eldoslim

git pull
composer update --optimize-autoloader
php -d memory_limit=-1 bin/console doctrine:cache:clear-metadata
php -d memory_limit=-1 bin/console doctrine:cache:clear-result
php -d memory_limit=-1 bin/console doctrine:cache:clear-query
php -d memory_limit=-1 bin/console cache:clear --env=prod --no-debug

if [ $dumpflag = "on" ]; then
    php -d memory_limit=256M bin/console assetic:dump --env=prod --no-debug
fi

php bin/console assets-version:increment
php -d memory_limit=-1 bin/console cache:clear --env=prod --no-debug

php $EXEC --fcgi="/run/php/php-fpm-$FCGI_SOCKET.sock" stat:clear
echo "Stat cache cleared."
php $EXEC --fcgi="/run/php/php-fpm-$FCGI_SOCKET.sock" opcache:reset
echo "Opcache cleared."
php $EXEC --fcgi="/run/php/php-fpm-$FCGI_SOCKET.sock" opcache:status
echo "done."

php -d memory_limit=-1 bin/console newrelic:notify-deployment --env=prod

exit 0