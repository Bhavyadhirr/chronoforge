/* -------------------------------------------------------
   PALETTE.JS — Command Palette (⌘K)
------------------------------------------------------- */

const NAV_ITEMS = [
    { name: "Home", url: "index.html" },
    { name: "Research", url: "research/index.html" },
    { name: "Projects", url: "projects/index.html" },
    { name: "Media", url: "media/index.html" },
    { name: "About", url: "about/index.html" },
    { name: "Contact", url: "contact/index.html" },
    { name: "MARK-B.L.U.", url: "research/mark-blu.html" }
];

(function () {
    let overlay, container, input, results;

    function createPalette() {
        overlay = document.createElement("div");
        overlay.className = "palette-overlay";

        container = document.createElement("div");
        container.className = "palette-container";

        input = document.createElement("input");
        input.className = "palette-input";
        input.placeholder = "Search or navigate...";

        results = document.createElement("div");
        results.className = "palette-results";

        container.appendChild(input);
        container.appendChild(results);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        input.addEventListener("input", updateResults);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) hidePalette();
        });
    }

    function updateResults() {
        const query = input.value.toLowerCase();
        results.innerHTML = "";

        const filtered = NAV_ITEMS.filter(item =>
            item.name.toLowerCase().includes(query)
        );

        filtered.forEach(item => {
            const div = document.createElement("div");
            div.textContent = item.name;
            div.addEventListener("click", () => navigateTo(item.url));
            results.appendChild(div);
        });
    }

    function showPalette() {
        overlay.style.display = "block";
        input.focus();
        updateResults();
    }

    function hidePalette() {
        overlay.style.display = "none";
        input.value = "";
        results.innerHTML = "";
    }

    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            if (overlay.style.display === "block") hidePalette();
            else showPalette();
        }
        if (e.key === "Escape") hidePalette();
    });

    // Initialize
    createPalette();
})();
