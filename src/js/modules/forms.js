export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll("input")
        this.message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с вами свяжемся!',
            failure: 'Что-то пошло не так...'
        };
        this.path = 'assets/question.php';
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        })
    }

    checkMailInputs(){
        const mailInputs = document.querySelectorAll('[type="email"]')

        mailInputs.forEach(input => {
            input.addEventListener('keypress', function (e){
                if (e.key.match(/[^a-z 0-9 @ _ \.]/ig)) {
                    e.preventDefault();
                }
            })
        })
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange()

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(e) {
            let matrix = '+1 (___) __-___';
            let i = 0;
            let def = matrix.replace(/\D/g, "");
            let val = this.value.replace(/\D/g, "");

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, (a) => {
                return /[_\d]/.test(a) && i < val.length
                    ? val.charAt(i++) : i >= val.length
                        ? '' : a
            })

            if (e.type === 'blur') {
                if (this.value.length === 2) this.value = ''
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        })
    }

    init(){
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000)
                    });
            })
        })
    }
}