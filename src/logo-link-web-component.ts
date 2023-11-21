class LogoLink extends HTMLAnchorElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const id = this.innerHTML.toLowerCase().replace(/ /g, '');
        const height = this.getAttribute('height');
        const width = this.getAttribute('width');

        this.setAttribute('id', id);
        this.setAttribute('aria-label', `${this.innerHTML} Logo`);
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                            height="${height ?? '28px'}" width="${width ?? '28px'}">
                                <use href="/images/logos.svg#${id}" />
                            </svg>`;
    }
}

customElements.define('logo-link', LogoLink, { extends: 'a' });
