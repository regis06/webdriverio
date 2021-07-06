const { remote } = require('webdriverio');

const classPage = () => {

    (async () => {
        let browser = null;

        await remote({
            capabilities: {
                browserName: 'firefox'
            }
        }).then((brow) => {
            
            return class Page {
                constructor() {
                    this.browser = brow;
                    this.title = 'My Page'
                }
                async open() {
                    await browser.url('https://br.grepolis.com/')
                }
            }
        });
    })();
}

exports.class = classPage;