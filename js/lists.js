/*
  Shared rendering helpers for the data-driven list pages (research,
  projects, talks, writing). Reads from the arrays defined in data.js.
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

function renderResearch(containerId) {
  const list = document.getElementById(containerId);
  if (!researchPapers.length) {
    list.appendChild(el("div", { class: "empty-state", text: "No papers published yet." }));
    return;
  }
  researchPapers.forEach(p => {
    const titleNode = el("span", { text: p.title });
    const children = [
      el("div", { class: "entry-top" }, [
        el("div", { class: "entry-title" }, [titleNode]),
        el("div", { class: "entry-meta", text: p.year })
      ]),
      el("div", { class: "entry-sub", text: p.venue }),
      el("div", { class: "entry-desc", text: p.description })
    ];
    if (p.link) children.push(el("a", { class: "entry-link-out", href: p.link, target: "_blank", text: "Read paper" }));
    list.appendChild(el("div", { class: "entry" }, children));
  });
}

function renderProjects(containerId) {
  const list = document.getElementById(containerId);
  if (!projects.length) {
    list.appendChild(el("div", { class: "empty-state", text: "No projects listed yet." }));
    return;
  }
  projects.forEach(p => {
    const titleNode = el("span", { text: p.title });
    const tags = el("div", { class: "entry-tags" });
    (p.stack || []).forEach(s => tags.appendChild(el("span", { class: "entry-tag", text: s })));

    const children = [
      el("div", { class: "entry-top" }, [
        el("div", { class: "entry-title" }, [titleNode]),
        p.status ? el("span", { class: "entry-status", text: p.status }) : null
      ]),
      el("div", { class: "entry-sub", text: p.period }),
      el("div", { class: "entry-desc", text: p.description }),
      tags
    ];
    if (p.link) children.push(el("a", { class: "entry-link-out", href: p.link, target: "_blank", text: "View project" }));
    list.appendChild(el("div", { class: "entry" }, children));
  });
}

function renderTalks(containerId) {
  const list = document.getElementById(containerId);
  if (!talks.length) {
    list.appendChild(el("div", { class: "empty-state", text: "No talks listed yet." }));
    return;
  }
  talks.forEach(t => {
    const children = [
      el("div", { class: "entry-top" }, [
        el("div", { class: "entry-title", text: t.title }),
        el("div", { class: "entry-meta", text: t.year })
      ]),
      el("div", { class: "entry-sub", text: t.event }),
      el("div", { class: "entry-desc", text: t.description })
    ];
    if (t.link) children.push(el("a", { class: "entry-link-out", href: t.link, target: "_blank", text: "Watch / slides" }));
    list.appendChild(el("div", { class: "entry" }, children));
  });
}

function renderPosts(containerId, linkPrefix = "") {
  const list = document.getElementById(containerId);
  if (!posts.length) {
    list.appendChild(el("div", { class: "empty-state", text: "No posts published yet." }));
    return;
  }
  posts.forEach(p => {
    list.appendChild(
      el("div", { class: "entry" }, [
        el("a", { href: `${linkPrefix}post.html?slug=${p.slug}` }, [
          el("div", { class: "entry-top" }, [
            el("div", { class: "entry-title", text: p.title }),
            el("div", { class: "entry-meta", text: formatDate(p.date) })
          ]),
          el("div", { class: "entry-desc", text: p.excerpt })
        ])
      ])
    );
  });
}
