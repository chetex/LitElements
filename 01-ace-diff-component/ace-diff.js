import { LitElement, html, css } from 'lit';
import 'ace-diff';

class TextComparator extends LitElement {
  static properties = {
    text1: { type: String },
    text2: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
    }
    .container {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 16px;
      background-color: #f9f9f9;
    }
    .editor {
      height: 200px;
      width: 100%;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 1em;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  constructor() {
    super();
    this.text1 = 'Texto inicial en el lado izquierdo.';
    this.text2 = 'Texto inicial en el lado derecho.';

    // Hacer accesible el método públicamente
    this.updateComparison = this.updateComparison.bind(this);
  }

  firstUpdated() {
    this.aceDiff = new AceDiff({
      element: this.shadowRoot.querySelector('.container'),
      left: {
        content: this.text1,
        editable: true,
      },
      right: {
        content: this.text2,
        editable: true,
      },
    });
  }

  updateComparison() {
    const leftEditor = this.aceDiff.getEditors().left;
    const rightEditor = this.aceDiff.getEditors().right;

    leftEditor.setValue(this.text1, -1);
    rightEditor.setValue(this.text2, -1);

    this.aceDiff.diff();
  }

  render() {
    return html`
      <div class="container">
        <h2>Comparador de Textos</h2>
        <div class="editor"></div>
        <div class="editor"></div>
        <button @click="${this.updateComparison}">Actualizar Comparación</button>
      </div>
    `;
  }
}

customElements.define('text-comparator', TextComparator);