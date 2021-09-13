<?php

use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\HttpKernel\Kernel;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        date_default_timezone_set('Europe/Paris');

        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
//addons
            new Mopa\Bundle\BootstrapBundle\MopaBootstrapBundle(),
            new Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle(),
            new Kachkaev\AssetsVersionBundle\KachkaevAssetsVersionBundle(),
            new Liip\ImagineBundle\LiipImagineBundle(),
			new JMS\TranslationBundle\JMSTranslationBundle(),
			new JMS\I18nRoutingBundle\JMSI18nRoutingBundle(),
            new JMS\SerializerBundle\JMSSerializerBundle(),
            new Misd\PhoneNumberBundle\MisdPhoneNumberBundle(),
            new Doctrine\Bundle\DoctrineCacheBundle\DoctrineCacheBundle(),
			new FOS\UserBundle\FOSUserBundle(),
            new FOS\RestBundle\FOSRestBundle(),
            new Nelmio\ApiDocBundle\NelmioApiDocBundle(),
            new Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),
            new SunCat\MobileDetectBundle\MobileDetectBundle(),
            new Nmure\CrawlerDetectBundle\CrawlerDetectBundle(),
            new RobertoTru\ToInlineStyleEmailBundle\RobertoTruToInlineStyleEmailBundle(),
            new Knp\Bundle\GaufretteBundle\KnpGaufretteBundle(),
            new Vich\UploaderBundle\VichUploaderBundle(),
            new Snc\RedisBundle\SncRedisBundle(),
            new Knp\Bundle\SnappyBundle\KnpSnappyBundle(),
            new Knp\Bundle\TimeBundle\KnpTimeBundle(),
            new Cravler\MaxMindGeoIpBundle\CravlerMaxMindGeoIpBundle(),
            new Craue\FormFlowBundle\CraueFormFlowBundle(),
            new Xynnn\GoogleTagManagerBundle\GoogleTagManagerBundle(),

//eldolink bundles
            new eldo\MainBundle\eldoMainBundle(),
            
//custom made bundles
            new eldo\PagesBundle\eldoPagesBundle(),
            new eldo\ToolsBundle\eldoToolsBundle(),
        );

        if (in_array($this->getEnvironment(), array('prod'))) {
            $bundles[] = new Ekino\Bundle\NewRelicBundle\EkinoNewRelicBundle();
        }

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\DebugBundle\DebugBundle();
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }

    public function getRootDir()
    {
        return __DIR__;
    }

    public function getCacheDir()
    {
        return dirname(__DIR__).'/var/cache/'.$this->environment;
    }

    public function getLogDir()
    {
        return dirname(__DIR__).'/var/logs';
    }
}
