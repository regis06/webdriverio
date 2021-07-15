const authenticate = require('./class/authenticate');
const chooseWorld = require('./class/choose_world');
const cityView = require('./class/game_city_view')

;(async () => {

    await authenticate.browserInit();
    await authenticate.open();
    await authenticate.executeAuthenticate();

    await chooseWorld.performChoice();

    await cityView.closeAllWindows();
    await cityView.openBuildingMenu();
})();