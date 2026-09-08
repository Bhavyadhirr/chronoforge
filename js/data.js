/*
  =========================================================================
  SITE CONTENT
  =========================================================================
  This is the only file you need to edit to update the site.

  - To add a PUBLICATION: add an object to the `publications` array.
  - To add a PROJECT: add an object to the `projects` array.
  - To add a BLOG POST / ARTICLE: add an object to the `posts` array.
    Write the body as plain HTML in the `content` field (use <p>, <h3>,
    <ul>, <li>, <blockquote>, <pre><code> etc). Give it a unique `slug` —
    that's the id used in the URL (post.html?slug=your-slug).

  Nothing elsewhere in the codebase needs to change when you add content.
  =========================================================================
*/

const SITE = {
  name: "Bhavyadhirr V. Bharadwaj",
  role: "Research Engineer",
  focus: "Quantum-secure systems, autonomous AI infrastructure, and post-classical cryptography.",
  location: "Delhi, India",
  email: "hello@example.com",
  github: "https://github.com/bhavyadhirr",
  scholar: "",
  cvUrl: "",
  intro: [
    "I work on the security and architecture of autonomous AI systems, with a focus on what happens when classical cryptographic assumptions stop holding — quantum-capable adversaries, machine-speed trust negotiation, and infrastructure that has to defend itself without a human in the loop.",
    "My current work centers on MARK-B.L.U., a quantum-secure architectural framework for autonomous systems, alongside research on post-quantum cryptography for agentic pipelines and threat modelling for distributed AI infrastructure."
  ]
};

const researchAreas = [
  {
    title: "Quantum-Secure Systems",
    description: "Architectures and cryptographic primitives that remain sound against adversaries with quantum computational capability."
  },
  {
    title: "Autonomous AI Infrastructure",
    description: "Security, memory, and trust models for AI agents and multi-agent pipelines operating with limited human oversight."
  },
  {
    title: "Post-Quantum Cryptography",
    description: "Lattice- and hash-based cryptographic schemes adapted for high-churn, machine-speed operational environments."
  }
];

/* ---------------------------------------------------------------------
   PUBLICATIONS
   Add new entries at the top. `link` is optional — omit it (or leave
   as an empty string) if there's nothing to link to yet.
--------------------------------------------------------------------- */
const publications = [
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