const authenticate = require('./class/authenticate');

;(async () => {

    await authenticate.init();
    await authenticate.open();
    
})();