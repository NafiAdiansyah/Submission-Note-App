const BASE_URL = `https://notes-api.dicoding.dev/v2`;

const getAllNotes = async () => {
    const response = await fetch(`${BASE_URL}/notes`);
    const json = await response.json();
    return json.data;
}
const createNote = async (title, body) => {
    const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            body
        }),
    });
    const json = await response.json();
    return json.data;
};

const deleteNote = async (id) => {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
    });
    const json = await response.json();
    return json.status;
};

const archiveNote = async (id) => {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
    });
    const json = await response.json();
    return json.status;
};

const unarchiveNote = async (id) => {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
    });
    const json = await response.json();
    return json.status;
};

const getAllArchivedNotes = async () => {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const json = await response.json();
    return json.data;
};
const getDetailNote = async () => {
    const response = await fetch(`${BASE_URL}/notes`);
    const json = await response.json();
    return json.data;
};
export {
    getAllNotes,
    createNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    getAllArchivedNotes,
    getDetailNote
};