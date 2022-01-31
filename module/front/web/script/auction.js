'use strict';

Vue.component('auction', {
    props: {
        bidding: String
    },
    data () {
        return {
            id: null,
            name: null,
            description: null,
            pictures: [],
            startDate: null,
            endDate: null,
            nextValue: null
        };
    },
    async created () {
        await this.load();
    },
    methods: {
        async load () {
            const data = await this.fetchJson('read', {
                class: 'bidding',
                view: 'publicReadyView',
                id: this.bidding
            });
            this.id = data._id;
            this.name = data.item?.name;
            this.description = markdown.toHTML(data.item?.description || '');
            this.pictures = this.formatPictures(data.item?.pictures);
            this.active = data.active;
            this.startDate = data.startDate;
            this.endDate = data.endDate;
            this.nextValue = data.nextValue;
        },
        formatPictures (items = []) {
            return items.map(item => this.getThumbnailUrl('picture', item, 'sm'));
        }
    },
    template: '#auction'
});