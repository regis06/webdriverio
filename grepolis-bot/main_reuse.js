const Page  = require('./class/init');

;(async () => {

    const page = new Page( 'https://br.grepolis.com/' );


    await page.authenticate(  );

    await page.click('.world_name.type_casual_world');

    await page.loaded();

    await page.elementClickable('.btn_wnd.close');

    await page.click('.btn_wnd.close');

    //await page.click('#building_main_area_academy');

    //await page.pause(600000);

    await page.getIntegerFromSelectorWithinArrayOfElements('.wrapper', '.amount');

    await page.clickAndWaitElement( '#building_main_area_main', '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.js-window-main-container' );

    //await page.setValue( 'ArturKing' );

    await page.browser.pause(10000);

    //await browser.setValue( '#login_userid', 'ArturKing' );

    //await browser.deleteSession();

    //console.log( mostrarProps(brow, 'Browser') );

    /* await brow.username().then((elem) => {
        elem.click();
    }); */



    //await page.username.setValue('ArturKing');

    //await page.username().setValue('ArturKing');

    //await page.type( '#login_userid', 'ArturKing' )



})();