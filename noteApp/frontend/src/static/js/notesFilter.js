const filterForm = document.getElementById('filter-form');
const notes = document.querySelectorAll('.note');

function filterNotes(event) {
    event.preventDefault();

    let formData = new FormData(filterForm);

    let filterTags = formData.get('filterTags');
    if (filterTags == '') {
        resetNotesFilter(event);
        return;
    };
    filterTags = filterTags.trim().replace(/\s{2,}/g, ' ').split(' ');

    for (let i = 0; i < notes.length; i++) {
        let tags = notes[i].querySelector('.note-tags').textContent;
        tags = new Set(cleanTags(tags).split(' '));

        let hasAllTag = filterTags.reduce(
            (hasAllTag, current) => { return hasAllTag && tags.has(current) },
            true
        );

        if (hasAllTag) {
            notes[i].style.display = 'flex';
        } else {
            notes[i].style.display = 'none';
        }
    }

}

function resetNotesFilter(event) {
    event.preventDefault();
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].style.display == 'none') {
            notes[i].style.display = 'flex';
        }
    }
}

function initListeners() {
    document.getElementById('filter-button').addEventListener('click', (event) => filterNotes(event));
    document.getElementById('reset-filter-button').addEventListener('click', (event) => resetNotesFilter(event));
}

initListeners();