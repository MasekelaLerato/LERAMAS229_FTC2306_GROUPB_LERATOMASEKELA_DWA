import { LitElement, html } from "DWA14/libs/Lit-html";
import './header.js';
import './app.js';

class TallyApp extends LitElement {
    render() {
        return html`
        <tally-header></tally-header>
        <tally-main></tally-main>
        `;
    }
}

customElements.define('tally-app', TallyApp);


 

  
