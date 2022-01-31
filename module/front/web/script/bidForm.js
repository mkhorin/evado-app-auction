'use strict';

Vue.component('bid-form', {
    extends: Vue.component('model-form'),
    props: {
        nextValue: Number
    },
    methods: {
        loadMeta () {
            const attrs = [{
                name: 'value',
                label: 'Value',
                type: 'string',
                required: true
            }];
            return {attrs};
        },
        loadData () {
            return {
                value: this.nextValue
            };
        }
    }
});