'use strict';

Vue.component('item-form', {
    extends: Vue.component('model-form'),
    props: {
        metaClass: {
            type: String,
            default: 'item'
        },
        metaView: {
            type: String,
            default: ''
        },
        fileAttrs: {
            type: Array,
            default () {
                return ['pictures'];
            }
        },
        visibleAttrs: {
            type: Array,
            default () {
                return ['name', 'description', 'pictures'];
            }
        }
    }
});