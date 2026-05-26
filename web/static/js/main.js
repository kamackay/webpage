(() => {
  "use strict";

  // ---- Content data (kept here so the site works without any backend) ----
  const data = {
    experience: [
      {
        company: "Big Nerd Ranch",
        title: "Senior Software Engineer",
        years: "July 2020 — Present",
        img: "/images/bnr.png",
        description:
          "Cloud engineering consultant. Designing platforms and shipping production systems for clients across industries.",
      },
      {
        company: "Cisco",
        title: "Software Engineer",
        years: "April 2019 — July 2020",
        img: "/images/cisco.svg",
        description:
          "Built dockerized webapps in Kubernetes for internal developer tools. Delivered platform services — DNS, Artifactory, source control — to other engineering teams.",
      },
      {
        company: "Q-Free",
        title: "Junior Software Engineer",
        years: "December 2017 — April 2019",
        img: "/images/q-free.jpg",
        description:
          "Worked on a GWT app showing live traffic data to DOTs. Used TypeScript and D3 for live visualizations and to automatically adjust Variable Speed Limit (VSL) signs.",
      },
      {
        company: "Honeywell",
        title: "Junior Software Engineer",
        years: "January 2017 — December 2017",
        img: "/images/honeywell.png",
        description:
          "Wrote a Python library for blackbox firmware tests to assist EE staff, plus small Angular tools for managing ownership of test machines.",
      },
      {
        company: "iPipeline",
        title: "Software Configuration Specialist",
        years: "May 2016 — August 2016",
        img: "/images/ipipeline.png",
        description:
          "Converted a cloud app to a locally hosted instance for customers needing offline access. Automated installation flows for end-users.",
      },
      {
        company: "iPipeline",
        title: "Lead Development Intern",
        years: "December 2013 — November 2015",
        img: "/images/ipipeline.png",
        description:
          "Worked on a C#.NET web app meeting customer requests for insurance application behaviors. Built a tool to detect and fix duplicate configurations to optimize build times.",
      },
    ],
    skills: [
      { name: "JavaScript", img: "/images/js.svg" },
      { name: "TypeScript", img: "/images/ts.png" },
      { name: "Java", img: "/images/java.svg" },
      { name: "Kotlin", img: "/images/kotlin.png" },
      { name: "Docker", img: "/images/docker.png" },
      { name: "Kubernetes", img: "/images/k8s.svg" },
      { name: "Git", img: "/images/git.png" },
      { name: "Go", img: "/images/golang.svg" },
      { name: "React", img: "/images/react.png" },
      { name: "MongoDB", img: "/images/mongodb.png" },
      { name: "Python", img: "/images/python.png" },
      { name: "SQL", img: "/images/sql.png" },
      { name: "Android", img: "/images/android.png" },
      { name: "C# / .NET", img: "/images/csharp.png" },
    ],
    tags: [
      "Artifactory",
      "Ambassador",
      "Spring",
      "Prometheus",
      "Helm",
      "AWS",
      "QA",
      "Logstash",
      "Semantic-UI",
      "CI/CD",
    ],
    projects: [
      {
        title: "QR Code Generator",
        subheader: "Convert URLs and text into a scannable QR code",
        url: "./qr",
        img: "/images/qr.png",
      },
    ],
    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/keith-mackay-047b9387/",
        icon: "linkedin",
      },
      { name: "GitLab", url: "https://gitlab.com/kamackay", icon: "gitlab" },
      { name: "GitHub", url: "http://github.com/kamackay", icon: "github" },
    ],
  };

  // ---- Tiny SVG icon set (inline so there are no external deps) ----
  const icons = {
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 11.001-3.601A1.8 1.8 0 016.5 6.7zM19 19h-3v-5.6c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.6-1.7 1.3-.1.2-.1.6-.1.9V19h-3V8h3v1.3c.4-.6 1.1-1.5 2.8-1.5 2 0 3.7 1.3 3.7 4V19z"/></svg>',
    gitlab:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.65 14.39 12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.12 2c.18 0 .34.13.39.3l2.44 7.49h8.1l2.44-7.49a.42.42 0 0 1 .39-.3c.18 0 .34.13.4.3l2.44 7.51 1.23 3.78a.84.84 0 0 1-.3.94z"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1-.02-1.95-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.2 0 .31.21.67.8.55C20.21 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>',
  };

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

  // ---- Renderers ----
  function renderTimeline() {
    const root = $("#timeline");
    if (!root) return;
    data.experience.forEach((job) => {
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

  function renderSkills() {
    const root = $("#skills-grid");
    if (!root) return;
    data.skills.forEach((s) => {
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

  function renderTags() {
    const root = $("#tag-cloud");
    if (!root) return;
    data.tags.forEach((t) => root.appendChild(el("li", {}, t)));
  }

  function renderProjects() {
    const root = $("#project-grid");
    if (!root) return;
    data.projects.forEach((p) => {
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

  function renderSocials() {
    const root = $("#social-list");
    if (!root) return;
    data.socials.forEach((s) => {
      const a = el("a", {
        href: s.url,
        target: "_blank",
        rel: "noopener noreferrer",
      });
      a.innerHTML = `${icons[s.icon] || ""}<span>${s.name}</span>`;
      root.appendChild(el("li", {}, a));
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
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    renderTimeline();
    renderSkills();
    renderTags();
    renderProjects();
    renderSocials();
    setupNavToggle();
    setupReveal();
  });
})();
