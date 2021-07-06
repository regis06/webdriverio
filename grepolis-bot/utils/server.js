const { remote } = require('webdriverio');

let awaitForSelector = async ( browser, selector ) => {
    
    let selectedElement = await browser.$$( selector ).catch((err) => {
        console.error(new Error('Falha inepesrada: ', err));
    });
    console.log('Elemento: ', selectedElement);

    console.log(`Existe seletor ${selector}: `, await selectedElement.isExisting().catch((err) => {
        console.error(new Error('Não existe ainda.') );
    } ) );

    let attempt = 1;
    
    while( !(await selectedElement[0].isExisting()) && attempt < 10){
        await browser.pause(3000);
        console.log(`Esperando seletor ${selector}: `, await selectedElement[0].isExisting());
        attempt++;
    }

    return selectedElement;
}

let statusPage = async ( browser ) => {
    let status = '';

    status = await browser.execute( async ( ) => {
        return await document.readyState;
    });
    console.log('Carregamento da página: ', status);
    return status;
}

let veryfingStatus = async ( browser ) => {

    let beforeStat = await statusPage( browser );

    while (beforeStat === 'complete') {
        beforeStat = await statusPage( browser );
    }

    console.log('*******************Exit complete.***************8');

    while ( ( await statusPage( browser ) ) != 'complete' ) {
        await browser.pause(1000);
    }
    console.log('Página carregada: ', await statusPage( browser ) );
}

;(async () => {
    const browser = await remote({
        capabilities: {
            browserName: 'firefox'
        }
    });

    await browser.url('https://br.grepolis.com/');

    const login = await browser.$('#login_userid');
    await login.click();
    await login.setValue('ArturKing');

    const pass = await browser.$('#login_password');
    await pass.setValue('06regis061994');

    const loginBotton = await browser.$('#login_Login');
    await loginBotton.click();

    await veryfingStatus( browser );
    await browser.pause(5000);

    //await browser.debug();

    let buttonWorld = await browser.$('.world_name.type_casual_world');
    console.log('Passou');
    await buttonWorld.click();

    await veryfingStatus( browser );

    let buttonCloseWindow = await browser.$('.btn_wnd.close');

    if((await buttonCloseWindow.isExisting()) ) await buttonCloseWindow.click();

    await veryfingStatus( browser );

    const senado = await browser.$('.city_overview_building.main_2');
    await senado.click();

    const searchUpdates = await awaitForSelector(browser, '.button_build.build_up.build.small');
    for (let update of searchUpdates) {
        let classUpdate = await update.parentElement().parentElement().getAttribute('id');
        console.log('****UpdateClass*****: ', classUpdate);
    }

    const mapView = await browser.$('.option.island_view.circle_button.js-option');


    await browser.pause(5000);

    await browser.saveScreenshot('./screenshot.png')
    //await browser.deleteSession()
})()