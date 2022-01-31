'use strict';

Vue.component('auctions', {
    props: {
        pageSize: {
            type: Number,
            default: 4
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
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', {
                class: 'bidding',
                view: 'publicActiveList',
                length: this.pageSize,
                start: page * this.pageSize
            });
            const pageSize = this.pageSize;
            this.$emit('load', {...data, pageSize, page});
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                name: item.item?.name,
                picture: this.getThumbnailUrl('picture', item.item?.pictures?.[0], 'sm'),
                startDate: item.startDate,
                endDate: item.endDate,
                lastBid: item.lastBid?.value || 0
            }));
        },
    },
    template: '#auctions'
});