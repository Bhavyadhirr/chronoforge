/* -------------------------------------------------------
   MAIN.JS — Site Bootstrap & Hero Init
------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", async () => {

    /* Load Components */
    await loadComponent("#header-placeholder", "components/header.html");
    await loadComponent("#footer-placeholder", "components/footer.html");

    /* Initialize Theme Toggle */
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            // theme.js handles logic
        });
    }

    /* Initialize ⌘K Palette Button */
    const paletteBtn = document.getElementById("palette-btn");
    if (paletteBtn) {
        paletteBtn.addEventListener("click", () => {
            // palette shows on Ctrl/Cmd+K already
            document.dispatchEvent(new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true
            }));
        });
    }

    /* Initialize Hero (Three.js & Shader Canvases) */
    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("wavefield-canvas")) initWavefield();
        if (document.getElementById("torus-canvas")) initTorus();
    });


});
