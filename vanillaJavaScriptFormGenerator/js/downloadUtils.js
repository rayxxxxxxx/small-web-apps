function downloadPrepare(formDescriptor) {
    if (formDescriptor.isEmpty()) {
        alert('form is empty. Add some fields to form in order to download file');
        return false;
    }
    formDescriptor.formName = document.getElementById('form-name').value;
    return formDescriptor;
}

function downloadAsJSON(event, formDescriptor) {
    if (downloadPrepare(formDescriptor)) {
        let formDescriptorBLOB = new Blob([JSON.stringify(formDescriptor.asJSON())], { 'type': 'application/json' });
        let url = URL.createObjectURL(formDescriptorBLOB);
        downloadPrompt(url, formDescriptor.formName);
    }
}

function downloadPrompt(url, name) {
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    link.click();
    link.remove();
}