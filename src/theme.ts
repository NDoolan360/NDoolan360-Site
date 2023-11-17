// Below script Adapted from:
// https://web.dev/patterns/theming/theme-switch/#js
let theme: string;

if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme")!;
    document.firstElementChild?.setAttribute('data-theme', theme);
} else {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    document.firstElementChild?.setAttribute('data-theme', theme);
}

const onClick = () => {
    // flip current value
    theme = theme === 'light'
        ? 'dark'
        : 'light';

    setPreference();
}

const setPreference = () => {
    localStorage.setItem("theme", theme);
    reflectPreference();
}

const reflectPreference = () => {
    document.firstElementChild?.setAttribute('data-theme', theme);
    document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme);
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference();

    // Button element adapted from:
    // https://web.dev/patterns/theming/theme-switch/#html
    const themeSwitch = document.getElementById("theme-toggle")!;
    themeSwitch.addEventListener('click', onClick);
    themeSwitch.innerHTML = `<svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24"><mask class="moon" id="moon-mask"><rect x="0" y="0" width="100%" height="100%" fill="white" /><circle cx="24" cy="10" r="6" fill="black" /></mask><circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" /><g class="sun-beams" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></g></svg>`;
}

// sync with system changes
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches: isDark }) => {
        theme = isDark ? 'dark' : 'light'
        setPreference()
    });
