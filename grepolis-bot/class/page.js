const Browser = require('./browser');

class Page extends Browser {

    constructor( uri ){
        super(uri);
        this.page = null;
        this._username = null;
        this._seletor = null;
        this._element = null;
    }

    /*
    get password() { return $('#password') }
    get submitBtn() { return $('form button[type="submit"]') }
    get flash() { return $('#flash') }
    get headerLinks() { return $$('#header a') } */

    async open ( ){
        this.page = await super.open( );
    }

    async findSelector(selector) {
            
        return await this.page.$(selector).then( ( elementFound ) => {
            console.log(`Elemento ${selector} encontrado: `);
            return elementFound;
        }, ( err ) => {
            console.log(`Não encontrou ${selector}: `, err);
        } ).catch((err) => {
            console.log(`Erro no seletor ${selector}: `, err);
        })/* .finally( ( elementFound ) => {
            console.log(`Elemento ${selector} encontrado: `);
            return elementFound;
        }); */
    }

    async findArrayOfSelector(selector) {

        try{
            return await this.page.$$(selector);
        }catch(err){
            console.log(`Erro no seletor ${selector}: `, err);
        }
    }

    async click(selector) {

        if (selector){
            this._element = await this.findSelector(selector);
        }
        console.log('Tipo do elemento: ',typeof this._element);

        if ((typeof this._element) === Array) {
     
            for (const el of this._element) {
     
                while(!(el.isClickable())){
                    this.page.pause(1000);
                }
     
                await el.click();
            }
        }else{
     
            while(!(this._element.isClickable())){
                this.page.pause(1000);
            }
     
            this._element.click();
        }
        return this._element
    }

    async setValue(value, selector){
        
        console.log('Selector: ', selector);

        if (selector){
            this._element = await this.findSelector(selector);
        }

        await this._element.setValue(value);

    }

    async loaded(){
        var state = '';
        await this.page.pause(4000);

        while (state.toString() !== 'complete'){

            await this.page.pause(1000);

            state = await this.page.execute( 'return document.readyState');

            console.log('Status page em: ', state.toString( ));
        }
    }

    async elementClickable( selector ){
        try{
        this._element = await this.findSelector( selector )
        } catch(err){
            console.log(`Erro ao encontrar ${selector}: `,err);
        }

        await this._element.waitForClickable({interval: 500}).then(() => {
            console.log('Elemento apareceu');
            return this._element;
        }, (err) => {
            console.log('Elemento não encontrado erro: ', err);
        }).catch((err) => {
            console.log('Erro não esperado do elemento aguardado. Erro: ', err);
        });
    }

    async findSelectorInLastElementArray(selector){

        let resources = [];

        console.log(this._element);

        for ( let i = 0; i < this._element.length; i++ ) {
            const childElement = await  this._element[i].$(selector);
            console.log( 'como valor de : ', (await childElement.getText()));
            resources.push(await this.getTextToInt( childElement ));
        }

        console.log('Total de recursos: ', resources);
        return resources;
    }

    async getElementArray(selector){

        this._element = await this.findArrayOfSelector( selector );

        return this._element;
    }

    async getTextToInt( element ){

        return parseInt(await element.getText());
    }

    async deleteSession(){
        await this.browser.deleteSession();
    }

}

module.exports = Page;