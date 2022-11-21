'use strict';

Vue.component('biddings', {
    props: {
        pageSize: {
            type: Number,
            default: 5
        },
        item: String
    },
    data () {
        return {
            formId: null,
            formTitle: null,
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
        isDraft (item) {
            return item.state === 'draft';
        },
        onBidding (id) {
            this.$root.$emit('bidding', id);
        },
        onNew () {
            this.formId = null;
            this.formTitle = Jam.t('New bidding');
            this.$refs.newModal.show();
        },
        onCreate () {
            const form = this.$refs.newForm;
            if (form.validate()) {
                this.create(form.serialize(), form);
            }
        },
        async create (data, form) {
            try {
                Jam.showLoader();
                await this.fetchText('create', this.getFetchParams({
                    master: this.getMasterData(),
                    data
                }));
                this.$refs.newModal.hide();
                await this.reload();
            } catch (err) {
                form.setErrors(err.message);
            } finally {
                Jam.hideLoader();
            }
        },
        async onEdit (id) {
            this.formId = id;
            this.formTitle = Jam.t('Edit bidding');
            this.$refs.newModal.show();
        },
        onSave () {
            const form = this.$refs.newForm;
            if (form.validate()) {
                this.save(form.serialize(), form);
            }
        },
        async save (data, form) {
            try {
                Jam.showLoader();
                await this.fetchText('update', this.getFetchParams({
                    id: this.formId,
                    data
                }));
                this.$refs.newModal.hide();
                await this.reload();
            } catch (err) {
                form.setErrors(err.message);
            } finally {
                Jam.hideLoader();
            }
        },
        onStart ({id}) {
            this.transit('start', id);
        },
        onStop ({id}) {
            this.transit('stop', id);
        },
        async transit (transition, id) {
            try {
                await this.fetchText('transit', this.getFetchParams({transition, id}));
                await this.reload();
            } catch (err) {
                this.showError(err);
            }
        },
        async onDelete (id) {
            await Jam.dialog.confirmDeletion(['Delete bidding {id} permanently?', {id}]);
            try {
                await this.fetchText('delete', this.getFetchParams({id}));
                await this.reload();
            } catch (err) {
                this.showError(err);
            }
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', this.getFetchParams({
                view: 'publicList',
                master: this.getMasterData(),
                length: this.pageSize,
                start: page * this.pageSize
            }));
            const pageSize = this.pageSize;
            this.$emit('load', {...data, pageSize, page});
        },
        getFetchParams (params) {
            return {
                class: 'bidding',
                ...params
            };
        },
        getMasterData () {
            return {
                class: 'item',
                attr: 'biddings',
                id: this.item
            };
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                active: item.active,
                startDate: item.startDate,
                endDate: item.endDate,
                state: item._state,
                stateTitle: this.getValueTitle('_state', item)
            }));
        }
    },
    template: '#biddings'
});