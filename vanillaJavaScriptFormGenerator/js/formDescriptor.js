class FieldDescriptor {
    constructor(label, attrs = new Object()) {
        this.label = label;
        this.attrs = attrs;
    }

    static fromFormData(formData) {
        let label = formData.get('label');

        let fieldDescriptor = new FieldDescriptor(label);

        fieldDescriptor.addAttr('type', formData.get('type'));
        fieldDescriptor.addAttr('id', toDashCase(label));
        fieldDescriptor.addAttr('name', toCamelCase(label));

        let formEntries = Array.from(formData.entries());
        for (let i = 2; i < formEntries.length; i++) {
            if (formEntries[i][1] == "") {
                continue;
            }
            fieldDescriptor.addAttr(formEntries[i][0], formEntries[i][1]);
        }

        return fieldDescriptor;
    }

    addAttr(name, value) {
        this.attrs[name] = value;
    }

    removeAttr(name) {
        delete this.attrs[name];
    }
}

class FormDescriptor {
    constructor(formName = '') {
        this.formName = formName;
        this.fieldsDescriptrors = new Map();
    }

    isEmpty() {
        return this.fieldsDescriptrors.size == 0;
    }

    clear() {
        this.fieldsDescriptrors.clear();
    }

    getFieldsDescriptorsAsArray() {
        return Array.from(this.fieldsDescriptrors.values());
    }

    asJSON() {
        return {
            'name': this.formName,
            'fields': this.getFieldsDescriptorsAsArray()
        }
    }

    addFieldDescriptor(uuid, descriptor) {
        this.fieldsDescriptrors.set(uuid, descriptor);
    }

    removeFieldDescriptor(uuid) {
        this.fieldsDescriptrors.delete(uuid);
    }
}

function generateFieldDescriptorHTML(descriptorUUID, fieldDescriptor, formDescriptor) {
    let root = document.createElement('div');

    let labelElem = document.createElement('p');
    let labelSpan = document.createElement('span');
    labelElem.appendChild(labelSpan);

    let typeElem = document.createElement('p');
    let typeSpan = document.createElement('span');
    typeElem.appendChild(typeSpan);

    let removeButton = document.createElement('button');

    root.appendChild(labelElem);
    root.appendChild(typeElem);
    root.appendChild(removeButton);

    root.setAttribute('class', 'field-descriptor');
    root.setAttribute('id', descriptorUUID);

    labelSpan.innerText = 'label: ';
    labelElem.innerHTML += fieldDescriptor.label;

    typeSpan.innerText = 'type: ';
    typeElem.innerHTML += fieldDescriptor.attrs.type;

    removeButton.setAttribute('type', 'button');
    removeButton.innerText = 'remove';
    removeButton.onclick = () => {
        formDescriptor.removeFieldDescriptor(descriptorUUID);
        document.getElementById(descriptorUUID).remove();
    }

    return root;
}
