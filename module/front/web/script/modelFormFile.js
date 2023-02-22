'use strict';

Vue.component('model-form-file', {
    extends: Vue.component('model-form-attr'),
    data () {
        return {
            items: []
        };
    },
    created () {
        this.normalizeValue();
    },
    methods: {
        onAdd () {
            this.items.push({
                key: this.getRandomId()
            });
        },
        onRemove (item) {
            const index = this.items.indexOf(item);
            this.items.splice(index, 1);
        },
        normalizeValue () {
            const items = Array.isArray(this.value) ? this.value : this.value ? [this.value] : [];
            this.items = items.map(this.normalizeValueItem, this);
            this.sources = Array.from(this.items);
        },
        normalizeValueItem (item) {
            const thumbnail = this.getThumbnailUrl(this.refClass, item._id || item, 'xs');
            const url = this.getDownloadUrl(this.refClass, item._id || item);
            return {
                id: item._id || item,
                name: item.name,
                size: Jam.FormatHelper.asBytes(item._size),
                key: this.getRandomId(),
                saved: true,
                thumbnail,
                url
            };
        },
        clearValue () {
            this.items = [];
        },
        serialize () {
            const links = this.getLinks();
            const unlinks = this.getUnlinks();
            if (links.length || unlinks.length) {
                return {links, unlinks};
            }
        },
        getLinks () {
            const links = [];
            const items = this.getRefArray('item');
            for (const {id, saved} of items) {
                if (!saved && id) {
                    links.push(id);
                }
            }
            return links;
        },
        getUnlinks () {
            const unlinks = [];
            for (const {id} of this.sources) {
                if (id && !this.getItemById(id)) {
                    unlinks.push(id);
                }
            }
            return unlinks;
        },
        getItemById (id) {
            for (const item of this.items) {
                if (item.id === id) {
                    return item;
                }
            }
        }
    },
    template: '#model-form-file'
});