const Page = require('./page');

class LoginPage extends Page {

    constructor( uri ){
        super( uri );
    }

    async authenticate( {
        'login': login,
        'password': password,
        'loginSelector': userSelector,
        'passwordSelector': passwordSelector,
        'submit': submit
    } ){

        await super.open( );
    
        await super.click( userSelector );

        await super.setValue( login );

        await super.setValue( password, passwordSelector );

        await super.click( submit );

        await super.loaded( );
    }

    async clickAndWaitElement( targetSelector, awaitSelector ){

        await super.click( targetSelector );

        await super.elementClickable( awaitSelector );
    }

    async getIntegerFromSelectorWithinArrayOfElements( selectors, childSelector ){
        await super.getElementArray(selectors);

        await this.findSelectorInLastElementArray( childSelector );
    }
}

module.exports = LoginPage;