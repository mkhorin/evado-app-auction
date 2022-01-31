'use strict';

const front = new Vue({
    el: '#front',
    props: {
        csrf: String,
        authUrl: String,
        dataUrl: String,
        fileUrl: String,
        metaUrl: String,
        thumbnailUrl: String,
        userId: String
    },
    propsData: {
        ...document.querySelector('#front').dataset
    },
    data () {
        return {
            activePage: 'auctions',
            activeBidding: null,
            activeItem: null
        };
    },
    computed: {
        activePageProps () {
            return {
                ...this.defaultPageProps,
                ...this.pagePros
            };
        },
        defaultPageProps () {
            return {
            };
        },
        pagePros () {
            switch (this.activePage) {
                case 'auction':
                    return {
                        key: this.activeBidding,
                        bidding: this.activeBidding
                    };
                case 'bidding':
                    return {
                        key: this.activeBidding,
                        bidding: this.activeBidding,
                        item: this.activeItem
                    };
                case 'myItem':
                    return {
                        key: this.activeItem,
                        item: this.activeItem
                    };
            }
        }
    },
    created () {
        this.$on('auction', this.onAuction);
        this.$on('auctions', this.onAuctions);
        this.$on('bidding', this.onBidding);
        this.$on('my-bids', this.onMyBids);
        this.$on('my-item', this.onMyItem);
        this.$on('my-items', this.onMyItems);
    },
    methods: {
        onAuction (id) {
            this.activePage = 'auction';
            this.activeBidding = id;
        },
        onAuctions () {
            this.activePage = 'auctions';
        },
        onBidding (id) {
            if (this.requireAuth()) {
                this.activePage = 'bidding';
                this.activeBidding = id;
            }
        },
        onMyBids () {
            if (this.requireAuth()) {
                this.activePage = 'myBids';
            }
        },
        onMyItem (id) {
            if (this.requireAuth()) {
                this.activePage = 'myItem';
                this.activeItem = id;
            }
        },
        onMyItems () {
            if (this.requireAuth()) {
                this.activePage = 'myItems';
            }
        }
    }
});