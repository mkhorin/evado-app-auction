/**
 * @copyright Copyright (c) 2022 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/validator/CustomValidator');

module.exports = class DateOverlapValidator extends Base {

    constructor (config) {
        super({
            skipOnAnyError: true,
            ...config
        });
    }

    async validateAttr (name, model) {
        const start = model.get('startDate');
        const end = model.get('endDate');
        const item = await model.related.resolve('item');
        const query = await item.related.createQuery('biddings');
        for (const bidding of await query.all()) {
            if (!model.isId(bidding.getId())) {
                if (this.isOverlap(bidding, start, end)) {
                    return model.addError(name, this.getMessage());
                }
            }
        }
    }

    isOverlap (target, start, end) {
        return !(end < target.get('startDate') || start > target.get('endDate'));
    }

    getMessage (value) {
        return this.createClientMessage(this.message, 'Dates overlap with other bidding');
    }
};