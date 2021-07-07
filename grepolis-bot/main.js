const Authenticate = require('./class/browser');

;(async ()=> {
    const authenticate = new Authenticate();

    await authenticate.init();
    await authenticate.open();
    
})();