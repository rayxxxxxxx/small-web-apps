const mainForm = document.getElementById('main-form');
const inputElements = new Array();

const attributesMapping = new Map();
attributesMapping.set(document.getElementById('placeholder-input'), new Set(['text', 'textarea']));
attributesMapping.set(document.getElementById('pattern-input'), new Set(['text']));
attributesMapping.set(document.getElementById('title-input'), '*');
attributesMapping.set(document.getElementById('maxlength-input'), new Set(['text', 'textarea']));
attributesMapping.set(document.getElementById('placeholder-input'), new Set(['text']));
attributesMapping.set(document.getElementById('size-input'), new Set(['number']));
attributesMapping.set(document.getElementById('min-input'), new Set(['number', 'range']));
attributesMapping.set(document.getElementById('max-input'), new Set(['number', 'range']));
attributesMapping.set(document.getElementById('step-input'), new Set(['number', 'range']));
attributesMapping.set(document.getElementById('multiple-input'), new Set(['file', 'image']));
attributesMapping.set(document.getElementById('accept-input'), new Set(['file', 'image']));

let formDescriptor = new FormDescriptor();

function addFieldDescriptor(event) {
    event.preventDefault();

    let formData = new FormData(mainForm);
    let fieldDescriptor = FieldDescriptor.fromFormData(formData);

    let uuid = crypto.randomUUID();
    formDescriptor.addFieldDescriptor(uuid, fieldDescriptor);
    document.getElementById('fields-descriptors').appendChild(generateFieldDescriptorHTML(uuid, fieldDescriptor, formDescriptor));
}

function onTypeChange(event) {
    for (let [elem, types] of attributesMapping.entries()) {
        if (types === '*' || types.has(mainForm.type.value)) {
            enableInput(elem);
        } else {
            disableInput(elem);
        }
    }
}

function clearFormDescriptor() {
    Array.from(formDescriptor.fieldsDescriptrors.keys()).forEach(key => { document.getElementById(key).remove() });
    formDescriptor.clear();
}

function initListeners() {
    mainForm.addEventListener('submit', addFieldDescriptor);

    document.getElementById('clear-button').onclick = (event) => {
        event.preventDefault();
        mainForm.reset();
        onTypeChange(null);
    };

    let typeInputs = document.getElementById('input-types').querySelectorAll('input');
    for (let elem of typeInputs) {
        elem.addEventListener('change', onTypeChange);
    }

    document.getElementById('download-as-json-button').onclick = (event) => downloadAsJSON(event, formDescriptor);
}

function init() {
    initListeners();
    mainForm.reset();
    onTypeChange(null);
}

init();