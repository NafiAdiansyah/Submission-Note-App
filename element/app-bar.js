class AppBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class='navbar'>
        <li class=nav-item>
        <h1 class='item'>My Note Apps</h1>
        </li>
        </div>
        `;

        const navbarStyles = `
        .navbar{
            display:flex;
            position:fixed;
            width:100%;
            top:0;
            background-color:#E5DDC5;
            height:80px;
            z-index:10;
            justify-content: center;
            align-items: center; 
        }
        .nav-item{
            padding-inline:4rem;
            display:flex;
            gap:2rem;
            max-height:100%;
        }
        @media screen and (max-width: 768px) {
            .navbar{
                justify-content:center;
            }
        }
        @media screen and (max-width: 520px) {
            .navbar{
                align-items:center;
            }
            .logo{
                max-width:50px;
            }
            .item{
                display:none;
            }
        }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = navbarStyles;
        document.head.appendChild(styleElement);
    }
}
customElements.define('app-bar', AppBar);