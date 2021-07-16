const common = require('../common/common');

class CityView{
    get closeAllButton(){ return '.close_all'; }
    get buildingMainButton(){ return "#building_main_area_main" ; }
    get scriptBuildingMain(){ return `$('${this.buildingMainButton}').click();` }
    get buildUpButtons(){ return '.button_build.build_up.build.small' }

    async closeAllWindows(){
        await common.click(this.closeAllButton);
    }

    async openBuildingMenu(){
        await browser.execute(this.scriptBuildingMain);
    }

    getResoucesForExpansion(){
        //popup_content
    }

    async getArrayBuildUp(){
        let arrayBuildUp = common.findArrayOfSelector(this.buildUpButtons);
    }
}

module.exports = new CityView();