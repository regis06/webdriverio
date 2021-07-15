class Common {
    constructor(){
        this._element = null;
    }

    get loadedConfig(){ return { timeout: 10000, timeoutMsg: 'Timeout load page.', interval: 2000 };}

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
                while(!(await el.isClickable())){
                    await browser.pause(1000);
                }
                await el.click();
            }
        }else{
            while(!(await this._element.isClickable())){
                await browser.pause(1000);
            }
            await this._element.click();
        }
        return this._element;
    }

    async setValue(value, selector){
        
        console.log('Selector: ', selector);

        if (selector){
            this._element = await this.findSelector(selector);
        }

        await this._element.setValue(value);

    }

    async loaded(){
        await browser.waitUntil(async () => {
                return ((await browser.executeScript('document.readyState')) === 'complete');
            },
            this.loadedConfig                                          
        );
        console.log('Página carregada');
    }

    async waitNextPage(uri){
        let url = await browser.getUrl();
        while(!(url.includes(uri))){
            await browser.pause(2000);
            await this.loaded();
            url = await browser.getUrl();
        }
        //console.log('Pŕoxima página carregada.');
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

}

module.exports = new Common();