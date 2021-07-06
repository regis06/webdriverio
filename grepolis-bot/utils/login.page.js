// login.page.js
const classLoginPage = () => {
    const page = require('./page');

    console.log(page);

    let Page = page.class();

    return class LoginPage extends Page {

        get username() { return super.browser.$('#login_userid') }
        get password() { return $('#login_password') }
        get submitBtn() { return $('form button[type="submit"]') }
        get flash() { return $('#flash') }
        get headerLinks() { return $$('#header a') }

        async open() {
            await super.open()
        }

        submit() {
            this.submitBtn.click()
        }

    }
}

exports.class = classLoginPage;