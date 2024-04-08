class MyNoteList extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="display" id="notes">
          
        </div>
      `;
        const displayStyles = `
        .display {
            list-style-type: none;
            margin: 60px;
            display: grid;
            grid-template-columns: repeat(auto-fill, 300px);
            gap: 10px;
            margin-top:120px;
          }
          .display li {
            display:flex;
            position: relative;
            background-color: #F1EEDC;
            list-style:none;
            border-radius: 5px;
            padding: 15px 20px 20px;
            height: 250px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            overflow:auto;
          }
      `;
        const styleElement = document.createElement('style');
        styleElement.textContent = displayStyles;
        document.head.appendChild(styleElement);


        this.notes = [];

        this.loadNotes();

        this.addEventListener('click', this.onButtonClick.bind(this)); // bind 'this' to the event listener
    }

    async loadNotes() {
        try {
            const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
                method: 'GET',
            });
            const responseData = await response.json();
            this.notes = responseData.data; // Menggunakan responseData.data untuk mendapatkan array catatan
            this.renderNotes();
        } catch (error) {
            console.error('Error fetching notes:', error)
        }
    }


    renderNotes() {
        const notesList = this.querySelector('#notes');
        notesList.innerHTML = '';

        if (Array.isArray(this.notes)) { // Check if this.notes is an array
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
                    <button class="button-archive">Archive</button>
                    <button class="button-delete">Delete</button>
                    </div>
                  `;
                notesList.appendChild(noteElement);
            });
        } else {
            console.error('Data notes bukan array:', this.notes);
        }
    }


    async onButtonClick(event) {
        const target = event.target;
        const noteElement = target.closest('.note');

        // Tambahkan pengecekan apakah noteElement tidak null sebelum mengakses dataset
        if (noteElement) {
            const noteId = noteElement.dataset.id;

            if (target.classList.contains('button-archive')) {
                await this.archiveNote(noteId);
            } else if (target.classList.contains('button-delete')) {
                await this.deleteNote(noteId, noteElement);
            }
        }
    }


    async archiveNote(noteId) {
        try {
            const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`, {
                method: 'POST',
            });

            if (response.ok) {
                console.log('Note berhasil diarsipkan!');
                this.loadNotes(); // Reload notes after archiving
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
                noteElement.remove(); // Hapus elemen note dari DOM
            } else {
                const error = await response.json();
                console.error('Error:', error.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

customElements.define('my-note-list', MyNoteList);