'use strict';

module.exports = {

    title: 'Boilerplate',

    components: {
        'db': {
            settings: {
                'database': process.env.MONGO_NAME || 'evado-boilerplate',
            }
        },
        'cookie': {
            secret: 'boilerplate.evado.sign' // key to sign cookie
        },
        'session': {
            secret: 'boilerplate.evado.sign'  // key to sign session ID cookie
        },
        'i18n': {
            language: 'en'
        },
        'router': {
            // defaultModule: 'office'
        },
        's3Storage': {
            Class: require('evado/component/file/S3Storage'),
            accessKey: 'minioadmin',
            secretKey: 'minioadmin',
            bucket: 'test'
        }
    },
    metaModels: {
        'base': {
            Class: require('evado-meta-base/base/BaseMeta')
        },
        'navigation': {
            Class: require('evado-meta-navigation/base/NavMeta')
        }
    },
    modules: {
        'api': {
            config: {
                modules: {
                    'base': {
                        Class: require('evado-api-base/Module')
                    },
                    'navigation': {
                        Class: require('evado-api-navigation/Module')
                    }
                }
            }
        },
        'studio': {
            Class: require('evado-module-studio/Module')
        },
        'office': {
            Class: require('../module/office/Module')
        },
        'account': {
            Class: require('evado-module-account/Module')
        },
        'admin': {
            Class: require('evado-module-admin/Module')
        }
    },
    assets: require('./default-assets'),
    users: require('./default-users'),
    userFilters: require('./default-userFilters'),
    security: require('./default-security'),
    notifications: require('./default-notifications'),
    tasks: require('./default-tasks'),
    utilities: require('./default-utilities'),
    eventHandlers: require('./default-eventHandlers'),
    listeners: require('./default-listeners'),
    sideMenu: require('./default-sideMenu'),
    params: {
        'enablePasswordChange': true,
        'enablePasswordReset': false,
        'enableSignUp': false,
        'enableSignUpVerification': false,
        'languageToggle': false
    }
};