import { LitElement, html, css } from "../libs/lit-html.js";

class TallyMain extends LitElement {
    static styles = css`
    :root{
        --color-green:#31c48d;
        --color-white:#ffffff;
        --color-dark-grey:#33333d;
        --color-medium-grey:#424250;
        --color-light-grey:#9ca3ae;
             }
    
    
    *{
        box-sizing: border-box;
    }
    html{
        height: 100vh;
    }
    body{
        margin: 0;
        color: var(--color-white);
        background-color: var(--color-medium-grey);
        font-family: Roboto, Arial, Helvetica, sans-serif;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    /*header*/
    .header{
        text-align: center;
    }
    .header_title{
        font-size: 3rem;
        font-weight: 900;
        color: var(--color-light-grey);
    }
    /*counter*/
    
    .controls{
        background: yellow;
    }
    /*counter*/
    .counter{
        background: var(--color-dark-grey);
    }
    .counter_value{
        width: 100%;
        height: 15rem;
        text-align: center;
        font-size: 6rem;
        font-weight: 900;
        background: none;
        color:var(--color-white);
        border-width: 0;
        border-bottom: 1px solid var(--color-light-grey);
    }
    .counter_button:disabled{
        opacity: 0.2
    }
    .counter_actions{
        display: flex;
    }
    .counter_button{
        background: none;
        width: 50%;
        border-width: 0;
     
        color: var(--color-white);
     font-size: 3rem;
     height: 10rem;
     border-bottom: 1px solid var(--color-light-grey);
     transition: transform 0.3sec;
     transform: translateY(0);
    }
    .counter_button_first{
        border-right: 1px solid var(--color-light-grey);
    
    }
    .counter_button:active{
        background: var(--color-medium-grey);
        transform: translateY(2%);
    }
    /*footer*/
    .footer{
        background-color: var(--color-dark-grey);
        color: var(--color-light-grey);
       padding: 2rem;
       font-size: 0.8rem;
       text-align: center;
    
    }
    .footer_link{
        color: var(--color-white);
    }`

    static properties = {
        number: { type: Number },
        min: { type: Boolean, default: false },
        max: { type: Boolean, default: false },
        reset: { type: Boolean, default: false },
    };

    constructor() {
        super();
        this.number = 0;
        this.min = false;
        this.max = false;
    };

    increment() {
        if (this.number < 10) {
            this.number++;
            this.min = false;
            this.max = false;
            this.reset = false;
        } else {
            this.max = true;
        }
    };

    decrement() {
        if (this.number > 0) {
            this.number--;
            this.min = false;
            this.max = false;
            this.reset = false;
        } else {
            this.min = true;
        }
    };

    restart() {
        this.number = 0;
        this.min = false;
        this.max = false;
        this.reset = true;
    };

    render() {
        return html`
        <main>
            <input class="counter__value" data-key="number" readonly value="${this.number}" />

                <div class="counter__action">

                    <button @click="${this.decrement}" ?disabled="${this.min}" data-key="subtract" class="counter__button">
                    Subtract(-)</button>

                    <button @click="${this.increment}" ?disabled="${this.max}" data-key="add" class="counter__button">
                    Add(+)</button>

                </div>

                <div class="reset_actions">
                    <button @click="${this.restart}" ?disabled="${this.reset}" data-key="reset" class="reset-button"> Reset </button>
                </div>
        </main>
        `;
    }
};

customElements.define('tally-main', TallyMain)