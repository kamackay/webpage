(() => {
  "use strict";

  // ---- DOM helpers ----
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (v === false || v == null) return;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else node.setAttribute(k, v);
    });
    children.flat().forEach((c) => {
      if (c == null || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  };

  const fetchJSON = async (url) => {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    return res.json();
  };

  // ---- Renderers ----
  function renderTimeline(experience) {
    const root = $("#timeline");
    if (!root) return;
    experience.forEach((job) => {
      root.appendChild(
        el(
          "li",
          { class: "reveal" },
          el(
            "div",
            { class: "timeline-marker" },
            el("img", {
              src: job.img,
              alt: `${job.company} logo`,
              loading: "lazy",
            }),
          ),
          el(
            "div",
            { class: "timeline-card" },
            el("h3", {}, job.company),
            el("div", { class: "role" }, job.title),
            el("div", { class: "years" }, job.years),
            el("p", {}, job.description),
          ),
        ),
      );
    });
  }

  function renderSkills(skills) {
    const root = $("#skills-grid");
    if (!root) return;
    skills.forEach((s) => {
      root.appendChild(
        el(
          "li",
          { class: "skill reveal" },
          el("img", {
            class: "skill-icon",
            src: s.img,
            alt: "",
            loading: "lazy",
          }),
          el("span", { class: "skill-name" }, s.name),
        ),
      );
    });
  }

  function renderTags(tags) {
    const root = $("#tag-cloud");
    if (!root) return;
    tags.forEach((t) => root.appendChild(el("li", {}, t)));
  }

  function renderProjects(projects) {
    const root = $("#project-grid");
    if (!root) return;
    projects.forEach((p) => {
      root.appendChild(
        el(
          "li",
          { class: "reveal" },
          el(
            "a",
            { class: "project-card", href: p.url },
            el(
              "div",
              { class: "thumb" },
              el("img", { src: p.img, alt: "", loading: "lazy" }),
            ),
            el(
              "div",
              { class: "body" },
              el("h3", {}, p.title),
              el("p", {}, p.subheader),
            ),
          ),
        ),
      );
    });
  }

  function renderSocials(socials) {
    const root = $("#social-list");
    if (!root) return;
    socials.forEach((s) => {
      root.appendChild(
        el(
          "li",
          {},
          el(
            "a",
            {
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            el("span", {
              class: "social-icon",
              "aria-hidden": "true",
              style: `--icon: url(/images/icons/${s.icon}.svg)`,
            }),
            el("span", {}, s.name),
          ),
        ),
      );
    });
  }

  // ---- Interactions ----
  function setupNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const list = $("#nav-list");
    if (!toggle || !list) return;
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    list.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }),
    );
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("visible");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((i) => io.observe(i));
  }

  function setYear() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // ---- Boot ----
  document.addEventListener("DOMContentLoaded", async () => {
    setYear();
    setupNavToggle();

    const [experience, skills, projects, socials] = await Promise.all([
      fetchJSON("/api/experience"),
      fetchJSON("/api/skills"),
      fetchJSON("/api/projects"),
      fetchJSON("/api/socials"),
    ]);

    renderTimeline(experience);
    renderSkills(skills.skills);
    renderTags(skills.tags);
    renderProjects(projects);
    renderSocials(socials);
    setupReveal();
  });
})();
