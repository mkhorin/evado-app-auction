'use strict';

Vue.component('myItem', {
    props: {
        item: String
    },
    data () {
        return {
            id: null,
            name: null,
            description: null,
            pictures: []
        };
    },
    async created () {
        await this.load();
    },
    methods: {
        async load () {
            const data = await this.fetchJson('read', {
                class: 'item',
                view: 'myItem',
                id: this.item
            });
            this.id = data._id;
            this.name = data.name;
            this.description = markdown.toHTML(data.description);
            this.pictures = this.formatPictures(data.pictures);
        },
        formatPictures (items = []) {
            return items.map(item => this.getThumbnailUrl('picture', item, 'sm'));
        }
    },
    template: '#myItem'
});