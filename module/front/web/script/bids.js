'use strict';

Vue.component('bids', {
    props: {
        pageSize: {
            type: Number,
            default: 5
        },
        creation: Boolean,
        bidding: String,
        title: {
            type: String,
            default: 'Bids'
        },
        nextValue: Number
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
        onNew () {
            if (this.requireAuth()) {
                this.$refs.newModal.show();
            }
        },
        onCreate () {
            const form = this.$refs.newForm;
            if (form.validate()) {
                this.create(form.serialize(), form);
            }
        },
        async create (data, form) {
            try {
                Jam.toggleLoader(true);
                await this.fetchText('create', this.getFetchParams({
                    view: 'publicCreation',
                    master: this.getMasterData(),
                    data
                }));
                this.$refs.newModal.hide();
                this.reload();
                this.$emit('create');
            } catch (err) {
                form.setErrors(err.message);
            } finally {
                Jam.toggleLoader(false);
            }
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const {pageSize} = this;
            const data = await this.fetchJson('list', this.getFetchParams({
                view: 'publicList',
                master: this.getMasterData(),
                length: pageSize,
                start: page * pageSize
            }));
            this.$emit('load', {...data, pageSize, page});
        },
        getFetchParams (params) {
            return {
                class: 'bid',
                ...params
            };
        },
        getMasterData () {
            return {
                class: 'bidding',
                attr: 'bids',
                id: this.bidding
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
                creator: item.creator?.name
            }));
        }
    },
    template: '#bids'
});