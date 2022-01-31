/**
 * @copyright Copyright (c) 2022 Maxim Khorin <maksimovichu@gmail.com>
 *
 *  Next bid value calculation
 */
'use strict';

const Base = require('areto/base/Base');

module.exports = class NextBidValue extends Base {

    async resolve (bidding) {
        const query = await bidding.related.createQuery('bids');
        const best = await query.scalar('value');
        const start = bidding.get('startingValue');
        const step = bidding.get('bidStep');
        return best
            ? best + step
            : start || step;
    }
};