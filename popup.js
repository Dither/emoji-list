if (typeof browser === 'undefined' && typeof chrome !== 'undefined') browser = chrome;

function sendMessage(message) {
   browser.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        if (!tabs[0] || !message) return;
        browser.tabs.connect(tabs[0].id).postMessage({data: message});
    });
}

function copyToClipboard(str) {
    var text = document.getElementById('buffer');
    if (!text) {
        text = document.createElement('input');
        text.id = 'buffer'
        text.type = 'text';
        text.style.opacity = 0;
        text.style.width = '1px';
        text.style.heigth = '1px';
        document.body.appendChild(text);
    }
    text.value += str;
    text.select();
    document.execCommand('copy', false, null);
    //document.body.removeChild(text);
}

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('button.emoji');
    for (var i = buttons.length; i--;) {
        buttons[i].addEventListener('click', function() {
            sendMessage({type:'set-emoji', text: this.innerText});
            copyToClipboard(this.innerText);
        }, false);
    }
}, false);
