import { LitElement, html } from "../libs/lit-html.js";
import "./tally-header.js"
import "./tally-main.js"

//defining a custom web component called tally-app using LitElement. This component appears to include two child components, tally-header and tally-main. It's a well-structured way to build a web application using web components.


 class TallyApp extends LitElement {
    render() {
        return html`
        
        <tally-header></tally-header> 
        <tally-main></tally-main>
        `;
    }
}

customElements.define('tally-app', TallyApp);


 

  
