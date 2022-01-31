'use strict';

Vue.component('myBids', {
    props: {
        pageSize: {
            type: Number,
            default: 5
        }
    },
    data () {
        return {
            items: []
        };
    },
    computed: {
        empty () {
            return !this.items.length;
        }
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.reload();
    },
    methods: {
        onMyItem (id) {
            this.$root.$emit('my-item', id);
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', this.getFetchParams({
                view: 'myBids',
                length: this.pageSize,
                start: page * this.pageSize
            }));
            const pageSize = this.pageSize;
            this.$emit('load', {...data, pageSize, page});
        },
        getFetchParams (params) {
            return {
                class: 'bid',
                ...params
            };
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                value: item.value,
                date: item._createdAt,
                bidding: item.bidding._id,
                active: item.bidding?.active,
                endDate: item.bidding?.endDate,
                picture: this.getThumbnailUrl('picture', item.bidding?.item?.pictures?.[0], 'xs'),
                name: item.bidding?.item?.name,
                nextValue: item.bidding?.nextValue
            }));
        }
    },
    template: '#myBids'
});