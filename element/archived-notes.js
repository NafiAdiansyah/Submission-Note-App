class MyNoteList extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="btnArsip">
        <button id="arsip-button"><span class="material-symbols-outlined">inventory_2</span></button>
      </div>
      <h1 id="archived-notes-title">Archived Notes</h1>  <div class="note-list" id="arsip-note">
        
      </div>
      `;
        const cardStyles = `
        .note-list {
          list-style-type: none;
          margin: 60px;
          display: none; /* Sembunyikan secara default */
          grid-template-columns: repeat(auto-fill, 300px);
          gap: 10px;
          margin-top:120px;
        }
        .note-list.show { /* Tampilkan ketika kelas 'show' ditambahkan */
          display: grid;
        }
        .note-list li {
            display:flex;
          position: relative;
          background-color: #F1EEDC;
          list-style:none;
          border-radius: 5px;
          padding: 15px 20px 20px;
          height: 250px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        }
        #arsip-button {
          position: fixed; /* Mengatur posisi floating */
          bottom: 10%; /* Mengatur jarak dari bawah */
          right:10px; /* Mengatur jarak dari kanan */
          z-index: 999; /* Mengatur lapisan untuk menampilkan di atas elemen lain */
          background-color: #FFAF45; /* Warna latar belakang */
          color: black; /* Warna teks */
          border: none; /* Tanpa border */
          border-radius: 50%; /* Untuk membuatnya bundar */
          width: 75px; /* Lebar */
          height: 75px; /* Tinggi */
          font-size: 10px; /* Ukuran font */
          cursor: pointer; /* Pointer ketika dihover */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Bayangan untuk efek melayang */
        }
        #arsip-button:hover {
          background-color: #b4792d; /* Warna latar belakang saat dihover */
          color:white;
        }
        #archived-notes-title {
          display: none;  
        }
          #archived-notes-title.show { /* Tampilkan judul ketika kelas 'show' ditambahkan */
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f1eedc; /* Warna background */
            height: 50px; /* Penuhi tinggi halaman */
          }
      `;
        const styleElement = document.createElement('style');
        styleElement.textContent = cardStyles;
        document.head.appendChild(styleElement);

        this.notes = [];
        this.archivedNotes = []; // Add an array to store archived notes

        this.addEventListener('click', this.onButtonClick.bind(this));
        document.getElementById('arsip-button').addEventListener('click', this.toggleArchivedNotes.bind(this)); // Add event listener for the toggle button
    }

    async loadNotes() {
        try {
            const response = await fetch('https://notes-api.dicoding.dev/v2/notes/archived', {
                method: 'GET',
            });
            const responseData = await response.json();
            this.notes = responseData.data;
            this.renderNotes();
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    renderNotes() {
        const notesList = this.querySelector('#arsip-note');
        notesList.innerHTML = '';

        if (Array.isArray(this.notes)) {
            this.notes.forEach(note => {
                const noteElement = document.createElement('li');
                noteElement.classList.add('note');
                noteElement.dataset.id = note.id;

                const date = new Date(note.createdAt);
                const formattedDate = date.toLocaleDateString();

                noteElement.innerHTML = `
                <div class="noteDetail">
                <p>${note.title.length > 16 ? note.title.substring(0, 16) + '<br>' + note.title.substring(13) : note.title}</p>
                
                <span>${note.body}</span>
                </br>
                <span class="note-date">${formattedDate}</span>
                </div>
               
                <div class="note-actions">
                <button class="button-unarchive">Unarchive</button>
                <button class="button-delete">Delete</button>
                </div>
                  `;
                notesList.appendChild(noteElement);
            });
        } else {
            console.error('Data notes bukan array:', this.notes);
        }
    }

    async toggleArchivedNotes() {
        const notesList = this.querySelector('#arsip-note');
        const title = this.querySelector('#archived-notes-title');
        if (!this.archivedNotes.length) {
            this.loadNotes(); // Load archived notes only if not already loaded
        } else {
            this.renderNotes(); // Render archived notes if already loaded
        }
        notesList.classList.toggle('show'); // Toggle class 'show' to display/hide the notes list
        title.classList.toggle('show');
    }


    async onButtonClick(event) {
        const target = event.target;

        if (target.classList.contains('button-unarchive')) {
            const noteId = target.closest('.note').dataset.id;
            await this.unarchiveNote(noteId);
        } else if (target.classList.contains('button-delete')) {
            const noteId = target.closest('.note').dataset.id;
            const noteElement = target.closest('.note');
            await this.deleteNote(noteId, noteElement);
        }
    }

    async unarchiveNote(noteId) {
        try {
            const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`, {
                method: 'POST',
            });

            if (response.ok) {
                console.log('Note diarsipkan!');
                // Reload notes to update both active and archived lists
                this.loadNotes();
            } else {
                const error = await response.json();
                console.error('Error:', error.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async deleteNote(noteId, noteElement) {
        try {
            const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Note dihapus!');
                noteElement.remove();
            } else {
                const error = await response.json();
                console.error('Error:', error.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

customElements.define('archived-notes', MyNoteList);