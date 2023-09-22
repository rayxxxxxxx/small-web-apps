function enableInput(element) {
    element.removeAttribute('disabled');
    element.parentElement.removeAttribute('hidden');
}

function disableInput(element) {
    element.setAttribute('disabled', true);
    element.parentElement.setAttribute('hidden', true);
}

function generateFieldDescriptorHTML(descriptorUUID, fieldDescriptor, formDescriptor) {
    let descriptorElement = document.createElement('div');

    let descriptorLabelElement = document.createElement('p');
    let labelElementSpan = document.createElement('span');
    descriptorLabelElement.appendChild(labelElementSpan);

    let descriptorTypeElement = document.createElement('p');
    let typeElementSpan = document.createElement('span');
    descriptorTypeElement.appendChild(typeElementSpan);

    let removeButton = document.createElement('button');

    descriptorElement.appendChild(descriptorLabelElement);
    descriptorElement.appendChild(descriptorTypeElement);
    descriptorElement.appendChild(removeButton);

    descriptorElement.setAttribute('class', 'field-descriptor');
    descriptorElement.setAttribute('id', descriptorUUID);

    labelElementSpan.innerText = 'label:';
    descriptorLabelElement.innerText += fieldDescriptor.label;

    typeElementSpan.innerText = 'type:';
    descriptorTypeElement.innerText += fieldDescriptor.attrs.type;

    removeButton.setAttribute('type', 'button');
    removeButton.innerText = 'remove';
    removeButton.onclick = () => {
        delete formDescriptor.removeFieldDescriptor(descriptorUUID);
        document.getElementById(descriptorUUID).remove();
    }

    return descriptorElement;
}
