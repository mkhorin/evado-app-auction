'use strict';

const parent = require('evado/config/default-security');

module.exports = {

    metaPermissions: [{
        description: 'Full access to data',
        roles: 'administrator',
        type: 'allow',
        actions: 'all',
        targets: {
            type: 'all'
        }
    }, {
        description: 'Guests can read data',
        roles: ['guest', 'user'],
        type: 'allow',
        actions: 'read',
        targets: [{
            type: 'class',
            class: ['bid', 'item', 'member', 'picture']
        }, {
            type: 'view',
            class: 'bidding',
            view: ['publicActiveList', 'publicReadyView']
        }]
    }, {
        description: 'Users can manage their own objects',
        roles: 'user',
        type: 'allow',
        actions: ['read', 'update', 'delete'],
        targets: [{
            type: 'class',
            class: ['bidding', 'item', 'picture']
        }, {
            type: 'transition',
            class: 'bidding'
        }],
        rules: 'creator'
    }, {
        description: 'Users can create',
        roles: 'user',
        type: 'allow',
        actions: 'create',
        targets: [{
            type: 'class',
            class: ['bidding', 'item', 'picture']
        }, {
            type: 'view',
            class: 'bid',
            view: 'publicCreation'
        }]
    }],

    permissions: {
        ...parent.permissions,

        'moduleAdmin': {
            label: 'Administration module',
            description: 'Access to the Administration module'
        },
        'moduleOffice': {
            label: 'Office module',
            description: 'Access to the Office module'
        },
        'moduleStudio': {
            label: 'Studio module',
            description: 'Access to the Studio module'
        },
        'moduleApiBaseUpload': {
            label: 'Upload files',
            description: 'Uploading files through the base metadata API module'
        }
    },

    roles: {
        'administrator': {
            label: 'Administrator',
            description: 'Full access to system',
            children: [
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio',
                'moduleApiBaseUpload'
            ]
        },
        'guest': {
            label: 'Guest',
            description: 'Auto-assigned role for anonymous users'
        },
        'user': {
            label: 'User',
            description: 'Default role for authenticated users',
            children: [
                'moduleOffice',
                'moduleApiBaseUpload'
            ]
        }
    },

    rules: {
        'creator': {
            label: 'Creator',
            description: 'Check user binding as object creator',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule',
                userAttr: '_creator'
            }
        }
    },

    // bind users to roles
    assignments: {
        'Adam': 'administrator'
    },

    // rules to auto-bind users to roles
    assignmentRules: {
    }
};