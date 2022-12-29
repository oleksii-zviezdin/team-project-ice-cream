inp = document.querySelector('.inp');
btn = document.querySelector('.btnd');
btn.setAttribute('disabled', true);
inp.oninput = function () {
    if (inp.value.length < 10) {
        btn.setAttribute('disabled', true);
    } else {
        btn.removeAttribute('disabled');
    }
}