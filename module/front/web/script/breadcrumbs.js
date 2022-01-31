'use strict';

Vue.component('breadcrumbs', {
    methods: {
        onMyBids () {
            this.$root.$emit('my-bids');
        }
    },
    template: '#breadcrumbs'
});