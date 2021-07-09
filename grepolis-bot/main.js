const authenticate = require('./class/authenticate');

;(async () => {

    await authenticate.browserInit();
    await authenticate.open();
    await authenticate.executeAuthenticate();
    
})();