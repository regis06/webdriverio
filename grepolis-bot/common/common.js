class Common {
    constructor(){
        this._element = null;
    }

    async findSelector(selector) {
        return await browser.$(selector).then( ( elementFound ) => {
            console.log(`Elemento ${selector} encontrado: `);
            return elementFound;
        }, ( err ) => {
            console.log(`Não encontrou ${selector}: `, err);
        } ).catch((err) => {
            console.log(`Erro no seletor ${selector}: `, err);
        });
    }

    async findArrayOfSelector(selector) {
        return await browser.$$(selector).then( ( elementFound ) => {
            console.log(`Elemento ${selector} encontrado: `);
            return elementFound;
        }, ( err ) => {
            console.log(`Não encontrou ${selector}: `, err);
        } ).catch((err) => {
            console.log(`Erro no seletor ${selector}: `, err);
        });
    }

    async click(selector) {
        if (selector){
            this._element = await this.findSelector(selector);
        }
        console.log('Tipo do elemento: ',typeof this._element);
        if ((typeof this._element) === Array) {
            for (const el of this._element) {
                while(!(el.isClickable())){
                    browser.pause(1000);
                }
                await el.click();
            }
        }else{
            while(!(this._element.isClickable())){
                browser.pause(1000);
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
        //await browser.pause(4000);

        while (state.toString() !== 'complete'){

            await browser.pause(1000);

            state = await browser.execute( 'return document.readyState');

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

module.exports = new Common();