'use strict';

Vue.component('bidding', {
    props: {
        bidding: String,
        item: String
    },
    data () {
        return {
            id: null,
            active: null,
            startDate: null,
            endDate: null,
            state: null,
            stateTitle: null,
            startingValue: null,
            bidStep: null
        };
    },
    async created () {
        await this.load();
    },
    methods: {
        onMyItem () {
            this.$root.$emit('my-item', this.item);
        },
        async load () {
            const data = await this.fetchJson('read', {
                class: 'bidding',
                view: 'publicView',
                id: this.bidding
            });
            this.id = data._id;
            this.active = data.active;
            this.startDate = data.startDate;
            this.endDate = data.endDate;
            this.state = data._state;
            this.stateTitle = this.getValueTitle('_state', data);
            this.startingValue = data.startingValue;
            this.bidStep = data.bidStep;
        }
    },
    template: '#bidding'
});