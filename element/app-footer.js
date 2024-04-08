class FooterElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="footer">
            <p>Made with &#10084; | <a href="https://www.instagram.com/nafiadnsyh_/">Find Me</a>
            </p>
        </div>
    `;

        const footerStyles = `
        .footer {
        display: block;
        justify-content: center;
        align-items: center;
        bottom: 0;
        width: 100%;
        background-color: #E5DDC5;
        height: 50px;
        color: black;
        position:fixed;
        }  
        .footer p{

        margin: 5px;
        }
        @media screen and (max-width: 768px) {
        .footer {
            flex-direction: column;
        }
        }
    `;

        const styleElement = document.createElement('style');
        styleElement.textContent = footerStyles;
        document.head.appendChild(styleElement);
    }
}

customElements.define('app-footer', FooterElement);