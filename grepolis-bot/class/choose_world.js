'use strict';
const common = require('../common/common');

class ChooseWorld {
    get uri(){ return 'https://br0.grepolis.com/start/index'; }
    get nextUri(){ return 'https://br79.grepolis.com/game/index'; }
    get worldButton(){ return '.world_name.type_casual_world'; }

    async performChoice(){
        await common.click(this.worldButton);
        await common.waitNextPage(this.nextUri);
    }
}

module.exports = new ChooseWorld();