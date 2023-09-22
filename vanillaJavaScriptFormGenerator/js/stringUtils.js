function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
}

function toSnakeCase(sentence) {
    return sentence.split(' ').map(word => word.toLowerCase()).join('_');
}

function toDashCase(sentence) {
    return sentence.split(' ').map(word => word.toLowerCase()).join('-');
}

function toCamelCase(sentence) {
    let splitted = sentence.split(' ');
    splitted[0] = splitted[0].toLowerCase();
    for (let i = 1; i < splitted.length; i++) {
        splitted[i] = capitalize(splitted[i]);
    }
    return splitted.join('');
}

function toUpperCamelCase(sentence) {
    let splitted = sentence.split(' ');
    return splitted.map(word => capitalize(word)).join('');
}

function fromSnakeCase(s) {
    return s.split('_').join(' ');
}

function fromDashCase(s) {
    return s.split('-').join(' ');
}

function toIdAttrCase(sentence) {
    return toDashCase(sentence);
}

function toClassAttrCase(sentence) {
    return toDashCase(sentence);
}

function toNameAttrCase(sentence) {
    return toCamelCase(sentence);
}