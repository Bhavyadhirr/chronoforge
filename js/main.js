/*
  Renders the homepage from the content defined in data.js.
  You should not need to edit this file to update site content —
  edit js/data.js instead.
*/

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.href) node.href = opts.href;
  if (opts.target) node.target = opts.target;
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  if (opts.id) node.id = opts.id;
  children.forEach(c => c && node.appendChild(c));
  return node;
}

/* ---------------- HERO ---------------- */
function renderHero() {
  document.getElementById("hero-name").textContent = SITE.name;
  document.getElementById("hero-role").textContent = SITE.role;
  document.getElementById("hero-location").textContent = SITE.location;
  document.getElementById("hero-focus").textContent = SITE.focus;

  const linksWrap = document.getElementById("hero-links");
  const links = [
    { label: "YouTube", href: "https://youtube.com/@GenesisofTomorrow/" }
    { label: "LinkedIn", href: "https://linkedin.com/in/Bhavyadhirr/" }
    { label: "GitHub", href: SITE.github },
    { label: "Email", href: `mailto:${SITE.email}` }
  ];
  if (SITE.scholar) links.push({ label: "Scholar", href: SITE.scholar });
  if (SITE.cvUrl) links.push({ label: "CV", href: SITE.cvUrl });

  links.forEach(l => {
    if (!l.href) return;
    linksWrap.appendChild(el("a", { href: l.href, text: l.label, target: l.href.startsWith("http") ? "_blank" : "" }));
  });
}

/* ---------------- ABOUT ---------------- */
function renderAbout() {
  const wrap = document.getElementById("about-text");
  SITE.intro.forEach(paragraph => {
    wrap.appendChild(el("p", { text: paragraph }));
  });

  const list = document.getElementById("research-list");
  researchAreas.forEach(area => {
    list.appendChild(
      el("div", { class: "research-item" }, [
        el("h3", { text: area.title }),
        el("p", { text: area.description })
      ])
    );
  });
}

/* ---------------- PROJECTS ---------------- */
function renderProjects() {
  const list = document.getElementById("projects-list");
  if (!projects.length) {
    list.appendChild(el("div", { class: "empty-state", text: "No projects listed yet." }));
    return;
  }
  projects.forEach(p => {
    const titleNode = p.link
      ? el("a", { class: "entry-title-link", href: p.link, target: "_blank", text: p.title })
      : el("span", { text: p.title });

    const tags = el("div", { class: "entry-tags" });
    (p.stack || []).forEach(s => tags.appendChild(el("span", { class: "entry-tag", text: s })));

    list.appendChild(
      el("div", { class: "entry" }, [
        el("div", { class: "entry-top" }, [
          el("div", { class: "entry-title" }, [titleNode]),
          p.status ? el("span", { class: "entry-status", text: p.status }) : null
        ]),
        el("div", { class: "entry-sub", text: p.period }),
        el("div", { class: "entry-desc", text: p.description }),
        tags
      ])
    );
  });
}

/* ---------------- PUBLICATIONS ---------------- */
function renderPublications() {
  const list = document.getElementById("publications-list");
  if (!publications.length) {
    list.appendChild(el("div", { class: "empty-state", text: "No publications listed yet." }));
    return;
  }
  publications.forEach(p => {
    const titleNode = p.link
      ? el("a", { class: "entry-title-link", href: p.link, target: "_blank", text: p.title })
      : el("span", { text: p.title });

    list.appendChild(
      el("div", { class: "entry" }, [
        el("div", { class: "entry-top" }, [
          el("div", { class: "entry-title" }, [titleNode]),
          el("div", { class: "entry-meta", text: p.year })
        ]),
        el("div", { class: "entry-sub", text: p.venue }),
        el("div", { class: "entry-desc", text: p.description })
      ])
    );
  });
}

/* ---------------- WRITING / POSTS ---------------- */
function renderPosts() {
  const list = document.getElementById("posts-list");
  if (!posts.length) {
    list.appendChild(el("div", { class: "empty-state", text: "No posts published yet." }));
    return;
  }
  posts.forEach(p => {
    const row = el("div", { class: "entry post-row" }, [
      el("a", { href: `pages/post.html?slug=${p.slug}` }, [
        el("div", { class: "entry-top" }, [
          el("div", { class: "entry-title", text: p.title }),
          el("div", { class: "entry-meta", text: formatDate(p.date) })
        ]),
        el("div", { class: "post-excerpt", text: p.excerpt })
      ])
    ]);
    list.appendChild(row);
  });
}

/* ---------------- CONTACT ---------------- */
function renderContact() {
  document.getElementById("contact-text").textContent =
    "Open to research collaboration and technical correspondence. Get in touch through any of the channels below.";

  const wrap = document.getElementById("contact-links");
  const rows = [
    { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { label: "GitHub", value: SITE.github.replace("https://", ""), href: SITE.github },
    { label: "YouTube", href: "https://youtube.com/@GenesisofTomorrow/" }
    { label: "LinkedIn", href: "https://linkedin.com/in/Bhavyadhirr/" }
  ];
  rows.forEach(r => {
    if (!r.value) return;
    const valueNode = r.href
      ? el("a", { href: r.href, text: r.value, target: r.href.startsWith("http") ? "_blank" : "" })
      : el("span", { text: r.value });
    wrap.appendChild(
      el("div", { class: "contact-row" }, [
        el("span", { class: "contact-label", text: r.label }),
        valueNode
      ])
    );
  });
}

/* ---------------- FOOTER ---------------- */
function renderFooter() {
  document.getElementById("footer-copy").textContent =
    `© ${new Date().getFullYear()} ${SITE.name}`;
}

/* ---------------- ACTIVE NAV ON SCROLL ---------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-links a");
  const map = {};
  links.forEach(l => (map[l.getAttribute("href").slice(1)] = l));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove("active"));
          const link = map[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach(s => observer.observe(s));
}

renderHero();
renderAbout();
renderProjects();
renderPublications();
renderPosts();
renderContact();
renderFooter();
initScrollSpy();