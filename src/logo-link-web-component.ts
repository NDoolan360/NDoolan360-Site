export default class LogoLink extends HTMLAnchorElement {
    connectedCallback() {
        const id = this.innerHTML.toLowerCase().replaceAll(/\s/g, "");

        this.classList.add(id);
        this.setAttribute("aria-label", `${this.innerHTML} Logo`);
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><use href="/images/logos.svg#${id}" /></svg>`;
    }
}

customElements.define("logo-link", LogoLink, { extends: "a" });
