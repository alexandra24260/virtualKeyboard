class keybord {
    textarea;

    init(keyLayout) {
        const insertLineBreak = ["9", "Shift", "Ctrl", "capslock"];
        let keyElement;
        this.wrapper = document.createElement('div');
        this.wrapper.setAttribute('class', 'wrapper');
        this.keyBlock = document.createElement('div');
        this.keyBlock.setAttribute('class', 'keyboard');
        this.keyBlock.setAttribute('id', 'keyboard');
        this.textArea = document.createElement('textarea');
        this.textArea.setAttribute('rows', '15');
        this.wrapper.appendChild(this.textArea);
        for (let i = 0; i < keyLayout.length; i++) {
            keyElement = document.createElement('div');
            keyElement.setAttribute('class', 'keys');
            keyElement.setAttribute('id', keyLayout[i]);
            switch (keyLayout[i]) {
                case 8:
                    keyLayout[i] = 'backspace';
                    break;
                case 9:
                    keyLayout[i] = 'Tab';
                    break;
                case 13:
                    keyLayout[i] = 'Enter';
                    break;
                case 16:
                    keyLayout[i] = 'Shift';
                    break;
                case 17:
                    keyLayout[i] = 'Ctrl';
                    break;
                case 18:
                    keyLayout[i] = 'Alt';
                    break;
                case '32':
                    keyLayout[i] = '       ';
                    break;
                case 20:
                    keyLayout[i] = 'capslock';
                    break;
                default:
                    break;
            }
            let specialCharacters = typeof keyLayout[i];
            if (specialCharacters === 'string') {
                keyElement.innerHTML = keyLayout[i];
            } else {
                keyElement.innerHTML = String.fromCharCode(keyLayout[i]);
            }
            for (let j = 0; j < insertLineBreak.length; j++) {
                if (keyLayout[i] == insertLineBreak[j]) {
                    this.keyBlock.innerHTML += '<br>';
                }
            }
            this.keyBlock.appendChild(keyElement);
            this.wrapper.appendChild(this.keyBlock);
        }
        return this.wrapper;
    }
}

const keyLayoutEn = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 8, 9,
    113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 20, 97, 115, 100,
    102, 103, 104, 106, 107, 108, 59, 39, 13, 16, 122, 120, 99, 118, 98, 110, 109,
    44, 46, 47, 92, 17, 18, 32, 'ru', 'en'];
const keyLayoutRu = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 8, 9,
    1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 91, 93, 20, 1092, 1099, 1074,
    1072, 1087, 1088, 1086, 1083, 1076, 59, 39, 13, 16, 1103, 1095, 1089, 1084, 1080, 1090, 1100,
    44, 46, 47, 92, 17, 18, 32, 'ru', 'en'];
let output;
let virtualKeyboard = new keybord();
let storageLanguage = localStorage.getItem('language');
if (storageLanguage === 'ru') {
    output = virtualKeyboard.init(keyLayoutRu);
} else {
    output = virtualKeyboard.init(keyLayoutEn);
}
document.body.appendChild(output);
document.onkeypress = function (events) {
    console.log(event.code);
    console.log(event.keyCode);
    document.getElementById(event.keyCode).classList.add('active');
}
document.querySelectorAll('.keys').forEach(function (element) {
    element.onclick = function (event) {
        let code = this.getAttribute('id');
        this.classList.add('active');
        let insertTextarea = document.getElementsByTagName('textarea');
        virtualKeyboard.textArea.innerHTML += String.fromCharCode(code);
    }
})
document.getElementById('ru').onclick = function (event) {
    localStorage.setItem("language", 'ru');
    document.getElementById('ru').classList.add('active');
    output = virtualKeyboard.init(keyLayoutRu);
}
document.getElementById('en').onclick = function (event) {
    localStorage.setItem("language", 'en');
    document.getElementById('en').classList.add('active');
    output = virtualKeyboard.init(keyLayoutEn);
}