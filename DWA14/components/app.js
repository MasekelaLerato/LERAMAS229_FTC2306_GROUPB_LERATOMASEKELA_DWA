import { LitElement, html, css } from "DWA14/libs/Lit-html";

class TallyMain extends LitElement {
    static styles = css`
    .counter__value {
        width: 100%;
        height: 15rem;
        text-align: center;
        font-size: 4rem;
        font-weight: 900;
        padding-bottom: 1rem;
      }

      .counter__action {
        display: flex;
      }
      
      .counter__button {
        text-align: center;
        width: 100%;
        height: 15rem;
        padding-left: 10rem;
        padding-top: 1rem;
        border-width: 100;
        columns: #4c4e53;
        font-size: 3rem;
        border-bottom: 1px solid #4c4e53;
        transition: transform 0.3s;
        transform: translateY(0);
      }
      
      .counter__button::part(base) {
       font-size: 12rem;
      }
      .counter__button:active {
        background: rgb(36, 34, 34);
        transform: translateY(2%);
      }
      .counter__button:disabled {
        opacity: 0.2;
      }
      .reset_actions {
        display: flex;
        justify-content: center;
        // border-bottom: 1px solid #4c4e53;
        padding-top: 1rem;
      }
      
      .reset-button {
        font-size: 4rem;
        border-radius: 3rem;
        background-color: red;
        
      }
    `;

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