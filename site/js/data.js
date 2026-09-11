/*
  =========================================================================
  SITE CONTENT
  =========================================================================
  This is the only file you should need to edit to update the site.

  - SITE: name, role, links, home banner image path.
  - aboutParagraphs: the About page copy, one string per paragraph.
  - researchPapers: add an object to publish a new paper.
  - projects: add an object to publish a new project.
  - talks: add an object to publish a new talk.
  - posts: add an object to publish a new blog post. Write `content` as
    plain HTML (<p>, <h3>, <ul><li>, <strong>, <code> all work). Give it
    a unique `slug` — that's the id used in the URL (post.html?slug=...).

  Nothing elsewhere in the codebase needs to change when you add content.
  =========================================================================
*/

const SITE = {
  brand: "CHRONOFORGE",
  name: "Bhavyadhirr V. Bharadwaj",
  role: "Research Engineer",
  location: "Delhi, India",
  focus: "Quantum-secure systems, autonomous AI infrastructure, and post-classical cryptography.",
  email: "hello@example.com",
  github: "https://github.com/bhavyadhirr",
  youtube: "https://youtube.com/@GenesisofTomorrow/",
  linkedin: "https://linkedin.com/in/Bhavyadhirr/",
  scholar: "",
  cvUrl: "",
  heroImage: "assets/banner.png"
};

/* ---------------------------------------------------------------------
   ABOUT
--------------------------------------------------------------------- */
const aboutParagraphs = [
  "I do all that I do because of the 'inkling'.",
  "I've had the predisposition, and have further refined it, to approach technology, science, research, and innovation, with not a barometer for how good I am at it, but how inclined I am to it.",
  "The reason why most of my work right now sits at the intersection of quantum computation, artificial intelligence, governance-first system design, autonomous security, and physical AI (robotics), is because I'm guided by an inkling that has a lot to do with wanting to fathom how the mind works — natural or artificial; how intelligence emerges, behaves, and should be constrained or optimized.",
  "Much of my focus right now converges on security and robustness in intelligent systems with a growing degree of autonomy and uncertainty. Such applicative areas generally contextualise themselves where failure is extremely costly and ambiguity is often unavoidable.",
  "That marks cryptographic architectures, cognitive modelling, and decision-vectors. I have come to notice that I'm especially drawn towards the areas that pertain to crafting governance for the double-edged nature of this work.",
  "A core priority of my philosophy has also emerged out to be the alignment of synthetic advancement with human embrace. I'm less interested in maximal performance than in understanding why a system behaves as it does, and how that behavior scales under what I call the \"uncertainty factor\" of life and living.",
  "At a more personal level, I value practices that cultivate patience and tranquility — music, writing, and martial arts, being the staples. I firmly believe such 'outside' endeavors become modes of engagement with one's relationship to adaptability, timing, optimization under constraint, and unyielding grit.",
  "That's quite a rhetoric, but quite earnestly, this portfolio isn't intended to be a catalogue of finished products or undying success — more like a reflective dossier spanning time itself. Ideas and work presented here are exploratory by design. One needs to award oneself the freedom to articulate incomplete thought, unpolished assumptions, cognitive revisions.",
  "And yeah, that's pretty much it. Cheers!"
];

/* ---------------------------------------------------------------------
   RESEARCH PAPERS
   Add new entries at the top. `link` is optional — omit it (or leave
   as an empty string) if there's nothing to link to yet.
--------------------------------------------------------------------- */
const researchPapers = [
  {
    title: "MARK-B.L.U.: A Boundary Layer Utility for Quantum-Secure Autonomous Systems",
    venue: "Springer Nature — Working Paper",
    year: "2025",
    description: "Introduces a quantum-secure architectural framework for AI and autonomous systems, defining boundary isolation, lattice-based authentication, and quantum-resistant state encryption as core primitives.",
    link: ""
  }
];

/* ---------------------------------------------------------------------
   PROJECTS
   `status` is a short label like "Active", "Prototype", "Complete".
--------------------------------------------------------------------- */
const projects = [
  {
    title: "MARK-B.L.U. Framework",
    period: "2024 — Present",
    status: "Active",
    stack: ["Python", "Rust", "CRYSTALS-Kyber", "CRYSTALS-Dilithium"],
    description: "Reference implementation of the MARK-B.L.U. research: composable Rust crates for lattice-based key encapsulation, signatures, and a boundary-isolation runtime for agent communication, with Python bindings for research use.",
    link: ""
  },
  {
    title: "Quantum Security Engine",
    period: "2024 — Present",
    status: "Active",
    stack: ["C++", "OpenQASM", "SPHINCS+", "zkSNARKs"],
    description: "A deployable, sidecar-style security engine for agentic AI pipelines: stateless hash-based signing for operation logs, zero-knowledge verification of agent state transitions, and a direct interface to quantum processing units.",
    link: ""
  },
  {
    title: "Neural Threat Intelligence System",
    period: "2024",
    status: "Prototype",
    stack: ["PyTorch", "Transformers", "FastAPI", "Redis"],
    description: "A transformer-based classification pipeline for real-time threat intelligence across distributed AI infrastructure nodes, with a severity-weighted alerting layer for human operators.",
    link: ""
  },
  {
    title: "Agentic Sandbox Environment",
    period: "2025",
    status: "Draft",
    stack: ["Docker", "LangGraph", "Formal Verification"],
    description: "An isolated environment for testing multi-agent orchestration and adversarial agent behaviour, with a runtime policy checker for verifying agent state transitions against declared safety specifications.",
    link: ""
  }
];

/* ---------------------------------------------------------------------
   TALKS
   Add new entries at the top. Leave `link` empty if there's no
   recording or slides to point to yet.
--------------------------------------------------------------------- */
const talks = [
  // {
  //   title: "Post-Quantum Trust for Agentic Pipelines",
  //   event: "Example Conference",
  //   year: "2026",
  //   description: "A short description of what the talk covered.",
  //   link: ""
  // }
];

/* ---------------------------------------------------------------------
   BLOG POSTS / ARTICLES
   Add new posts at the top of the array. `content` is plain HTML.
--------------------------------------------------------------------- */
const posts = [
  {
    slug: "post-quantum-agentic-ai",
    title: "Post-Quantum Cryptography for Agentic AI",
    date: "2025-03-14",
    tags: ["Cryptography", "Agents"],
    excerpt: "As agentic pipelines become operational infrastructure, the cryptographic contracts governing agent interaction need to outlast classical threat models.",
    content: `
      <p>As agentic AI pipelines become operational infrastructure — scheduling work, controlling systems, making decisions at machine speed — the cryptographic contracts governing their interaction need to outlast classical threat models. This is a short summary of a research thread I've been developing on what post-quantum cryptography looks like when applied to machine-to-machine agent protocols, rather than human-facing communication.</p>
      <h3>The problem</h3>
      <p>Classical cryptographic protocols generally assume human-speed communication with relatively static keys. Agentic pipelines operate at millisecond cadence, with dynamic agent spawning, short-lived task contexts, and constant establishment of new trust relationships. Existing post-quantum cryptography (PQC) standards weren't designed with this operational profile in mind.</p>
      <h3>Approach</h3>
      <p>The research adapts lattice-based key encapsulation and hash-based signature schemes for multi-agent orchestration contexts. Two pieces are worth calling out:</p>
      <ul>
        <li><strong>Ephemeral trust protocol</strong> — sub-50ms mutual authentication for newly spawned agents.</li>
        <li><strong>Context-bound keys</strong> — keys scoped to a task's lifetime rather than a session's duration, so revocation is cheap and default-safe.</li>
      </ul>
      <p>The specification for the ephemeral trust layer is complete, and benchmarking against classical alternatives is underway. Integration with the MARK-B.L.U. primitives is planned next.</p>
    `
  },
  {
    slug: "threat-surfaces-distributed-ai",
    title: "Threat Surface Modelling in Distributed AI Infrastructure",
    date: "2025-01-22",
    tags: ["Security", "Distributed Systems"],
    excerpt: "Existing threat-modelling frameworks assume bounded, enumerable system states. AI infrastructure doesn't behave that way.",
    content: `
      <p>The attack surface of distributed AI infrastructure is qualitatively different from classical networked systems. Model weights, inference endpoints, orchestration layers, and data pipelines introduce threat vectors that existing taxonomies don't fully capture.</p>
      <h3>What's different</h3>
      <p>Classical threat modelling — STRIDE and its relatives — assumes bounded, enumerable system states. AI infrastructure, particularly orchestrated multi-model deployments, is characterised by emergent behaviour, probabilistic outputs, and soft system boundaries. The attack surface isn't static: it shifts with model updates, prompt distributions, and the introduction of new agents.</p>
      <h3>A proposed taxonomy</h3>
      <p>I'm developing a threat taxonomy organised around five categories: model extraction, inference manipulation, orchestration subversion, data-pipeline poisoning, and agent impersonation. Each is paired with a threat tree and a set of detection heuristics, grounded in publicly documented incidents of AI system compromise.</p>
    `
  }
];
