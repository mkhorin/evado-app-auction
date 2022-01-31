'use strict';

Vue.component('bidding-form', {
    extends: Vue.component('model-form'),
    props: {
        metaClass: {
            type: String,
            default: 'bidding'
        },
        visibleAttrs: {
            type: Array,
            default () {
                return ['startDate', 'endDate', 'startingValue', 'bidStep'];
            }
        }
    }
});