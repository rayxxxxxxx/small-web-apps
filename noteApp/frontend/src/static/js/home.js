const noteForm = document.getElementById('note-form');

function initListeners() {
    document.getElementById('note-create-button').addEventListener('click', async (event) => await createNote(event, noteForm));
    for (elem of document.querySelectorAll('.note-delete-button')) {
        elem.addEventListener('click', async (event) => await deleteNote(event, event.target.getAttribute('x-note-id')));
    }
}

initListeners();