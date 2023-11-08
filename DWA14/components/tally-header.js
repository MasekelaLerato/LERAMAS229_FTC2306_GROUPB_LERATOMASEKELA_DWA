import { LitElement, html, css } from '../libs/lit-html.js'

 class TallyHeader extends LitElement {
    static styles = css`
    header {
        display: flex;
        margin: 10px;
        justify-content: center;
        background color:green;
      }
      h1 {
        font-size: 3rem;
      }
    `;

    render() {
        return html`
        <header>
        <h1> <i class="fa-solid fa-up-down fa-lg"></i> Tally Counter </h1>
    </header>
    `;
    }
};

customElements.define('tally-header', TallyHeader);