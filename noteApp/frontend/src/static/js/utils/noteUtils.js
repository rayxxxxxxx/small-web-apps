function cleanTags(tagsStr) {
    return tagsStr.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
}

async function createNote(event, noteForm) {
    event.preventDefault();

    let noteFormData = new FormData(noteForm);
    let noteData = Object.fromEntries(noteFormData.entries());
    noteData['tags'] = cleanTags(noteData['tags']).split(' ');

    let url = buildURL('api', 7000, '/note');
    let status = await fetchPostJSON(url, noteData);
    window.location.replace('/home');
}

async function deleteNote(event, noteId) {
    event.preventDefault();

    let url = buildURL('api', 7000, `/notes/${noteId}`);
    let status = await fetchDelete(url);
    window.location.replace('/home');
}

async function updateNote(event, noteId, noteForm) {
    event.preventDefault();

    let noteFormData = new FormData(noteForm);
    let noteData = Object.fromEntries(noteFormData.entries());
    noteData['tags'] = cleanTags(noteData['tags']).split(' ');


    let url = buildURL('api', 7000, `/notes/${noteId}`);
    let status = await fetchPutJSON(url, noteData);
    window.location.replace('/home');
}