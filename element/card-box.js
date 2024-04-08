class Card extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        
        <div class="add-box">
        <button><span class="material-symbols-outlined">
        add_circle
    </span></button>
      </div>
      
        `;
    const cardStyles = `
          .add-box button {
            position: fixed; /* Mengatur posisi floating */
            bottom: 20%; /* Mengatur jarak dari bawah */
            right:10px; /* Mengatur jarak dari kanan */
            z-index: 999; /* Mengatur lapisan untuk menampilkan di atas elemen lain */
            background-color: #90D26D; /* Warna latar belakang */
            color: black; /* Warna teks */
            border: none; /* Tanpa border */
            border-radius: 50%; /* Untuk membuatnya bundar */
            width: 75px; /* Lebar */
            height: 75px; /* Tinggi */
            font-size: 10px; /* Ukuran font */
            cursor: pointer; /* Pointer ketika dihover */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Bayangan untuk efek melayang */
            margin-bottom:30px;
          }
          .add-box button:hover {
            background-color: #76ac59;
            color:white;
          }
          
        `;
    const styleElement = document.createElement('style');
    styleElement.textContent = cardStyles;
    document.head.appendChild(styleElement);
  }
}
customElements.define('card-box', Card);