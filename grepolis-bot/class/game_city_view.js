const common = require('../common/common');

class CityView{
    get closeAllButton(){ return '.close_all'; }
    get buildingMainButton(){ return '#building_main_area_main' ; }
    get scriptBuildingMain(){ return `$(${this.buildingMainButton}).click();` }
    get buildingMainArea(){ return '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.js-window-main-container'; }
    get waitConfig(){ return { timeout: 5000, timeoutMsg: 'Element no exists', interval: 5000 }; }
    get waitReverseConfig(){ return { timeout: 5000, reverse: true, timeoutMsg: 'Element no exists', interval: 5000 }; }

    async closeAllWindows(){
        await common.click(this.closeAllButton);
        /* let window = await common.findSelector(this.defaultWindow)
        await window.waitForDisplayed(this.waitReverseConfig); */
    }

    async openBuildingMenu(){
        await browser.execute(this.scriptBuildingMain);
        await common.findArrayOfSelector();
        /* let mainButton = await common.findSelector(this.buildingMainButton);
        await mainButton.click();
        await browser.pause(2000);
        await mainButton.click(); 
        let mainArea = await common.findSelector(this.buildingMainArea)
        await mainArea.waitForExist(this.waitConfig); */
    }
}

module.exports = new CityView();