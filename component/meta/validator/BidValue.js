/**
 * @copyright Copyright (c) 2022 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/validator/CustomValidator');

module.exports = class BidValueValidator extends Base {

    constructor (config) {
        super({
            skipOnAnyError: true,
            ...config
        });
    }

    async validateAttr (name, model) {
        const value = model.get(name);
        const bidding = await model.related.resolve('bidding');
        const next = await bidding.get('nextValue');
        if (next > value) {
            return model.addError(name, this.getMessage(next));
        }
    }

    getMessage (value) {
        const defaults = 'Value must be greater than or equal to {value}';
        return this.createClientMessage(this.message, defaults, {value});
    }
};