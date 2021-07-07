const authenticate = require('./class/authenticate');

;(async () => {

    authenticate.init();
    authenticate.open();

})();