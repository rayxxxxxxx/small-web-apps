const noteForm = document.getElementById('note-form');

function initListeners() {
    document.getElementById('note-update-button').addEventListener('click', (event) => updateNote(event, event.target.getAttribute('x-note-id'), noteForm));
}

initListeners();