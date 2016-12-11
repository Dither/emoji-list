if (typeof browser === 'undefined' && typeof chrome !== 'undefined') browser = chrome;
browser.runtime.onConnect.addListener(function(port) {
    function insertAtCaret(text) {
        var active = document.activeElement;
        if (!active) return;

        var scrollPos = active.scrollTop,
            strPos = active.selectionStart,
            front = active.value ? active.value.substring(0, strPos) : '',
            back = active.value ? active.value.substring(strPos, active.value.length) : '';

        active.value = front + text + back;
        strPos = strPos + text.length;

        active.selectionStart = strPos;
        active.selectionEnd = strPos;
        active.focus();

        active.scrollTop = scrollPos;
    };

    port.onMessage.addListener(function(ev) {
        if (ev.data.type === 'set-emoji')
            insertAtCaret(ev.data.text);
    });
});
