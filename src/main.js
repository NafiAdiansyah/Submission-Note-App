import '../element/app-bar.js'
import '../element/note-list.js'
import '../element/archived-notes.js'
import '../element/app-footer.js'
import '../element/pop-up.js';
import '../element/card-box.js';
import {
    getAllNotes,
    createNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    getAllArchivedNotes
} from '../data/api.js';
//import notesData from '../data/data-dummy.js';

document.addEventListener('DOMContentLoaded', function () {
    const notes = document.querySelector('#notes');
    const popupBox = document.querySelector('.popup-note');
    const addNoteButton = document.querySelector('.add-box');
    const closeButton = document.querySelector('.close');
    const addNewNoteButton = document.getElementById('tambah-catatan');
    const inputJudul = document.getElementById('subject');
    const inputDeskripsi = document.getElementById('deskripsi');
    const simpanButton = document.getElementById('simpan-edit');
    const myNoteList = document.querySelector('my-note-list');

    if (addNewNoteButton) {
        addNewNoteButton.addEventListener('click', async function () {
            const judul = inputJudul.value.trim();
            const deskripsi = inputDeskripsi.value.trim();
            const judulError = document.getElementById('subject-error');
            const deskripsiError = document.getElementById('deskripsi-error');

            if (judul.length === 0 || judul.length > 36) {
                judulError.textContent = 'Judul harus diisi dan maksimal 36 karakter.';
                return;
            } else {
                judulError.textContent = '';
            }

            if (deskripsi.length === 0 || deskripsi.length > 180) {
                deskripsiError.textContent = 'Deskripsi harus diisi dan maksimal 180 karakter.';
                return;
            } else {
                deskripsiError.textContent = '';
            }

            try {
                // Buat catatan baru dengan judul dan deskripsi yang diberikan
                const newNote = await createNote(judul, deskripsi);

                // Simpan catatan ke REST API (Jika diperlukan)

                // Buat elemen catatan menggunakan judul dan deskripsi baru
                const noteElement = createNoteElement(judul, deskripsi);

                // Tambahkan elemen catatan ke dalam elemen my-note-list
                myNoteList.appendChild(noteElement);

                console.log(`Catatan dengan judul ${judul} berhasil dibuat`);

                // Sembunyikan kotak popup setelah menambahkan catatan
                popupBox.style.display = 'none';
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.error('Element with ID "addNewNoteButton" not found.');
    }

    addNoteButton.addEventListener('click', function () {
        popupBox.style.display = 'block';
        inputJudul.value = '';
        inputDeskripsi.value = '';
    });

    closeButton.addEventListener('click', function () {
        popupBox.style.display = 'none';
    });

    function createNoteElement(subject, deskripsi) {
        const div = document.createElement('div');
        div.classList.add('note');

        const subjectP = document.createElement('p');
        subjectP.textContent = subject;

        const subjectSpan = document.createElement('span');
        subjectSpan.textContent = deskripsi;

        const noteDateSpan = document.createElement('span');
        noteDateSpan.classList.add('note-date');
        noteDateSpan.textContent = getTodayDate();

        const noteActionsDiv = document.createElement('div');
        noteActionsDiv.classList.add('note-actions');

        const archiveButton = document.createElement('button');
        archiveButton.classList.add('button-archive');
        archiveButton.textContent = 'Arsipkan';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('button-delete');
        deleteButton.textContent = 'Hapus';

        noteActionsDiv.appendChild(archiveButton);
        noteActionsDiv.appendChild(deleteButton);

        div.appendChild(subjectP);
        div.appendChild(subjectSpan);
        div.appendChild(noteDateSpan);
        div.appendChild(noteActionsDiv);

        return div;
    }

    function getTodayDate() {
        const today = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const dateString = today.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        const timeString = today.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${dateString}\n${timeString}`;
    }

    function formatDate(dateString) {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options).replace(',', '');
    }

});