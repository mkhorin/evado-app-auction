'use strict';

Vue.component('myItems', {
    props: {
        pageSize: {
            type: Number,
            default: 5
        }
    },
    data () {
        return {
            formId: null,
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
        onNew () {
            this.formId = null;
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
                await this.fetchText('create', this.getFetchParams({data}));
                this.$refs.newModal.hide();
                await this.reload();
            } catch (err) {
                form.setErrors(err.message);
            } finally {
                Jam.hideLoader();
            }
        },
        async onEdit ({id}) {
            this.formId = id;
            this.$refs.editModal.show();
        },
        onSave () {
            const form = this.$refs.editForm;
            if (form.validate()) {
                this.save(form.serialize(), form);
            }
        },
        async save (data, form) {
            try {
                Jam.toggleLoader(true);
                await this.fetchText('update', this.getFetchParams({
                    id: this.formId,
                    data
                }));
                this.$refs.editModal.hide();
                await this.reload();
            } catch (err) {
                form.setErrors(err.message);
            } finally {
                Jam.toggleLoader(false);
            }
        },
        async onDelete ({id, name}) {
            await Jam.dialog.confirmDeletion(['Delete item "{name}" permanently?', {name}]);
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
                view: 'myItems',
                length: this.pageSize,
                start: page * this.pageSize
            }));
            const pageSize = this.pageSize;
            this.$emit('load', {...data, pageSize, page});
        },
        getFetchParams (params) {
            return {
                class: 'item',
                ...params
            };
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                name: item.name,
                picture: this.getThumbnailUrl('picture', item.pictures?.[0], 'xs')
            }));
        }
    },
    template: '#myItems'
});