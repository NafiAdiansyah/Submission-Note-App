class PopupBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="popup-note">
          <div class="popup-content">
            <span class="close">&times;</span>
            <div class="input-container">
              <label for="subject">Subject:</label>
              <input type="text" id="subject" name="subject">
              <span id="subject-error" class="error"></span>
            </div>
            <div class="input-container">
              <label for="deskripsi">Deskripsi:</label>
              <textarea id="deskripsi" name="deskripsi"></textarea>
              <span id="deskripsi-error" class="error"></span>
            </div>
            <button id="tambah-catatan">Buat Catatan</button>
          </div>
        </div>
      `;
    const popupBoxStyles = `
      .popup-note {
          display: none;
          position: fixed;
          z-index: 999;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-height: 80%;
          overflow-y: auto;
          width: 70%;
          max-width: 400px;
          background-color: #fefefe;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
      .popup-content {
          padding: 20px;
          position: relative;
          background-color:#E5DDC5;
      }
      
      .close {
          color: #aaa;
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
      }
      
      .input-container {
          margin-bottom: 15px;
      }
      
      .input-container label {
          display: block;
          margin-bottom: 5px;
      }
      
      .input-container input,
      .input-container textarea {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
      }
      
      #tambah-catatan {
          background-color: #628591;
          color: #E5DDC5;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
      }
      `;
    // Buat elemen style dan pasang ke dalam dokumen
    const styleElement = document.createElement('style');
    styleElement.textContent = popupBoxStyles;
    document.head.appendChild(styleElement);
  }
}

customElements.define('popup-note', PopupBox);