/*
  Renders a single post on pages/post.html based on the ?slug= query
  parameter, looking it up in the `posts` array from data.js.
*/

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.href) node.href = opts.href;
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  children.forEach(c => c && node.appendChild(c));
  return node;
}

function renderNotFound(root) {
  root.appendChild(
    el("div", { class: "post-header" }, [
      el("h1", { text: "Post not found" })
    ])
  );
  root.appendChild(
    el("div", { class: "post-body" }, [
      el("p", { text: "This post may have been moved or removed. Head back to the writing index to see what's available." })
    ])
  );
}

function renderPost() {
  const root = document.getElementById("post-root");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const index = posts.findIndex(p => p.slug === slug);

  if (index === -1) {
    renderNotFound(root);
    return;
  }

  const post = posts[index];
  document.getElementById("doc-title").textContent = `${post.title} — Bhavyadhirr V. Bharadwaj`;

  const tags = el("div", { class: "entry-tags" });
  (post.tags || []).forEach(t => tags.appendChild(el("span", { class: "entry-tag", text: t })));

  root.appendChild(
    el("div", { class: "post-header" }, [
      el("h1", { text: post.title }),
      el("div", { class: "post-meta-row" }, [
        el("time", { text: formatDate(post.date) }),
        tags
      ])
    ])
  );

  root.appendChild(el("div", { class: "post-body", html: post.content }));

  const prev = posts[index + 1]; // older
  const next = posts[index - 1]; // newer
  const footer = el("div", { class: "post-footer" });
  footer.appendChild(
    prev
      ? el("a", { href: `post.html?slug=${prev.slug}`, text: `← ${prev.title}` })
      : el("span")
  );
  footer.appendChild(
    next
      ? el("a", { href: `post.html?slug=${next.slug}`, text: `${next.title} →` })
      : el("span")
  );
  root.appendChild(footer);
}

document.getElementById("footer-copy").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
renderPost();