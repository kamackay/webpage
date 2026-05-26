(() => {
  "use strict";

  const STORAGE_KEY = "keithmackay:qr:input";
  const EC_LEVEL = "L";
  // Render the SVG and exported PNG at this fixed resolution; CSS scales
  // the SVG to fit whatever width the container gives it.
  const RENDER_SIZE = 512;

  const $ = (id) => document.getElementById(id);
  const input    = $("qr-input");
  const canvas   = $("qr-canvas");
  const dlPng    = $("qr-download-png");
  const status   = $("qr-status");

  // Year in footer.
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Restore from query string or localStorage.
  function restore() {
    const params = new URLSearchParams(location.search);
    const fromQuery = params.get("q");
    if (fromQuery) return fromQuery;
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  }
  input.value = restore();

  // Pick the smallest QR version that fits — qrcode-generator wants an
  // explicit type code (1-40) and error correction level.
  function buildQR(text, ecLevel) {
    for (let typeNumber = 4; typeNumber <= 40; typeNumber++) {
      try {
        const qr = qrcode(typeNumber, ecLevel);
        qr.addData(text);
        qr.make();
        return qr;
      } catch (e) {
        // Too small — try the next type number.
      }
    }
    throw new Error("input too long for a QR code");
  }

  function setStatus(msg, kind) {
    status.textContent = msg || "";
    status.style.color = kind === "error" ? "var(--danger)" : "var(--accent)";
  }

  function setDisabled(flag) {
    dlPng.disabled = flag;
  }

  function clearCanvas() {
    canvas.innerHTML = '<p class="qr-placeholder">Type something above to generate a QR code.</p>';
    setDisabled(true);
  }

  // Render the QR as an inline SVG so it scales crisply at any size.
  function renderSVG(qr, sizePx) {
    const count = qr.getModuleCount();
    const quietZone = 0; // wrapper has its own padding
    const totalModules = count + quietZone * 2;
    const cell = sizePx / totalModules;

    let rects = "";
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          const x = (c + quietZone) * cell;
          const y = (r + quietZone) * cell;
          rects += `<rect x="${x.toFixed(3)}" y="${y.toFixed(3)}" width="${cell.toFixed(3)}" height="${cell.toFixed(3)}"/>`;
        }
      }
    }
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sizePx} ${sizePx}" ` +
      `width="${sizePx}" height="${sizePx}" shape-rendering="crispEdges" fill="#000000">` +
      `<rect width="100%" height="100%" fill="#ffffff"/>${rects}</svg>`;
    canvas.innerHTML = svg;
  }

  // For PNG export, draw the same modules onto an offscreen canvas.
  function drawCanvas(qr, sizePx) {
    const count = qr.getModuleCount();
    const c = document.createElement("canvas");
    const ratio = window.devicePixelRatio || 1;
    c.width = sizePx * ratio;
    c.height = sizePx * ratio;
    const ctx = c.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, sizePx, sizePx);
    ctx.fillStyle = "#000000";
    const cell = sizePx / count;
    for (let r = 0; r < count; r++) {
      for (let col = 0; col < count; col++) {
        if (qr.isDark(r, col)) {
          ctx.fillRect(col * cell, r * cell, Math.ceil(cell), Math.ceil(cell));
        }
      }
    }
    return c;
  }

  let lastQR = null;

  function update() {
    const text = input.value;

    try { localStorage.setItem(STORAGE_KEY, text); } catch {}

    if (!text) {
      clearCanvas();
      setStatus("");
      lastQR = null;
      return;
    }

    try {
      const qr = buildQR(text, EC_LEVEL);
      renderSVG(qr, RENDER_SIZE);
      lastQR = qr;
      setDisabled(false);
      setStatus("");
    } catch (err) {
      console.error(err);
      clearCanvas();
      setStatus(err.message || "couldn't generate", "error");
      lastQR = null;
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function downloadPNG() {
    if (!lastQR) return;
    const c = drawCanvas(lastQR, RENDER_SIZE);
    c.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, "qrcode.png");
      setStatus("saved qrcode.png");
    }, "image/png");
  }

  // Debounce typing so very long input doesn't pin a CPU.
  let pending = 0;
  function schedule() {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(update);
  }

  input.addEventListener("input", schedule);
  dlPng.addEventListener("click", downloadPNG);

  update();
})();
