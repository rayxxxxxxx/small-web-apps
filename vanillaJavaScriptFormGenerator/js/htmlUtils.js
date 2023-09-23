function enableInput(element) {
    element.removeAttribute('disabled');
    element.parentElement.removeAttribute('hidden');
}

function disableInput(element) {
    element.setAttribute('disabled', true);
    element.parentElement.setAttribute('hidden', true);
}
