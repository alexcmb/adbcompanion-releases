/* Site d'ADB Companion : apparitions, thème, visionneuse et téléchargements (pages FR et EN). */
(() => {
  "use strict";
  const REPO = "alexcmb/adbcompanion-releases";

  /* ── Textes selon la langue de la page (<html lang>) ── */
  const LANG = document.documentElement.lang === "en" ? "en" : "fr";
  const TEXT = {
    fr: {
      locale: "fr-FR",
      megabytes: "Mo",
      yourSystem: "Votre système",
      notAvailable: "Pas encore disponible pour cette version.",
      published: (version, date) => `Version ${version} · publiée le ${date}`,
      experimental: "Expérimentale",
      notes: "Notes de version",
      allReleases: "Toutes les versions",
      newerPre: "Une version expérimentale plus récente existe : ",
      heroVersion: (version, pre) => `Version ${version}${pre ? " · expérimentale" : ""}`,
      downloadFor: (platform) => `Télécharger pour ${platform}`,
      heroMeta: (name, size) => `${name} · ${size} · autres systèmes plus bas`,
      failed: "Impossible de lister les versions pour le moment. ",
      failedLink: "Voir les versions sur GitHub",
      windows: { note: "Windows 10 et 11, 64 bits.", exe: ["Installeur", "Recommandé · installation portable"], msi: ["Paquet MSI", "Déploiement en entreprise"] },
      macos: { note: "macOS 11 Big Sur ou plus récent.", arm: ["Apple Silicon", "Mac M1, M2, M3, M4…"], intel: ["Intel", "Mac à processeur Intel"] },
      linux: { note: "x86_64. Règles udev Android nécessaires pour l'USB (voir la FAQ).", appimage: ["AppImage", "Toutes distributions"], deb: ["Paquet .deb", "Debian, Ubuntu, Mint…"], rpm: ["Paquet .rpm", "Fedora, openSUSE…"] },
    },
    en: {
      locale: "en-US",
      megabytes: "MB",
      yourSystem: "Your system",
      notAvailable: "Not available yet for this version.",
      published: (version, date) => `Version ${version} · released ${date}`,
      experimental: "Experimental",
      notes: "Release notes",
      allReleases: "All releases",
      newerPre: "A newer experimental version is available: ",
      heroVersion: (version, pre) => `Version ${version}${pre ? " · experimental" : ""}`,
      downloadFor: (platform) => `Download for ${platform}`,
      heroMeta: (name, size) => `${name} · ${size} · other systems below`,
      failed: "Releases can't be listed right now. ",
      failedLink: "See the releases on GitHub",
      windows: { note: "Windows 10 and 11, 64-bit.", exe: ["Installer", "Recommended · portable install"], msi: ["MSI package", "For enterprise deployment"] },
      macos: { note: "macOS 11 Big Sur or later.", arm: ["Apple Silicon", "M1, M2, M3, M4… Macs"], intel: ["Intel", "Intel-based Macs"] },
      linux: { note: "x86_64. Android udev rules required for USB (see the FAQ).", appimage: ["AppImage", "Any distribution"], deb: [".deb package", "Debian, Ubuntu, Mint…"], rpm: [".rpm package", "Fedora, openSUSE…"] },
    },
  }[LANG];

  /* ── Choix de la langue mémorisé (lien FR / EN de la navigation) ── */
  document.querySelectorAll("a[data-lang]").forEach((link) => {
    link.addEventListener("click", () => {
      try { localStorage.setItem("lang", link.dataset.lang); } catch { /* stockage indisponible */ }
    });
  });
  const RELEASES = `https://github.com/${REPO}/releases`;

  /* ── Apparition progressive des éléments au défilement ── */
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 })
    : null;

  /** Prépare des éléments : `step` décale chaque élément d'un groupe (en ms), `variant` choisit le mouvement. */
  function reveal(elements, { step = 0, base = 0, variant = "" } = {}) {
    [...elements].forEach((node, i) => {
      node.classList.add("reveal");
      if (variant) node.classList.add(variant);
      node.style.setProperty("--delay", `${base + i * step}ms`);
      if (observer) observer.observe(node);
      else node.classList.add("is-visible");
    });
  }

  reveal(document.querySelectorAll(".hero > .pill, .hero h1, .hero .lead, .hero .cta, .hero .meta"), { step: 90 });
  reveal(document.querySelectorAll(".shot-frame"), { base: 420, variant: "zoom" });
  reveal(document.querySelectorAll(".section-head"));
  reveal(document.querySelectorAll(".grid .feature"), { step: 70 });
  document.querySelectorAll(".detail").forEach((row) => {
    const reversed = row.classList.contains("reverse");
    reveal(row.querySelectorAll(".text"), { variant: reversed ? "from-right" : "from-left" });
    reveal(row.querySelectorAll("figure"), { base: 120, variant: "zoom" });
  });
  reveal(document.querySelectorAll(".faq details"), { step: 50 });

  // Inclinaison de la capture du héros, redressée au fil du défilement.
  const heroShot = document.querySelector(".shot-frame");
  if (heroShot && !reducedMotion) {
    let ticking = false;
    const tilt = () => {
      ticking = false;
      const progress = Math.min(1, Math.max(0, window.scrollY / 500));
      heroShot.style.setProperty("--tilt", `${(1 - progress) * 10}deg`);
    };
    tilt();
    // Après l'apparition : l'inclinaison suit le défilement sans retard.
    heroShot.addEventListener("transitionend", () => {
      heroShot.style.transition = "transform 120ms linear";
      heroShot.style.setProperty("--delay", "0ms");
    }, { once: true });
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(tilt); }
    }, { passive: true });
  }

  /* ── Thème ── */
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch { /* stockage indisponible */ }
  document.getElementById("theme").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch { /* ignoré */ }
  });

  /* ── Visionneuse des captures ── */
  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewer-img");
  const viewerCaption = document.getElementById("viewer-caption");
  document.querySelectorAll("img[data-zoom]").forEach((img) => {
    img.tabIndex = 0;
    const open = () => {
      viewerImg.src = img.currentSrc || img.src;
      viewerImg.alt = img.alt;
      viewerCaption.textContent = img.alt;
      viewer.showModal();
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });

  /* ── Téléchargements (API GitHub, sans dépendance) ── */
  /** Icône SVG déclarée dans un <template> de la page. */
  const icon = (id) => document.getElementById(`icon-${id}`).content.cloneNode(true);

  /** Fichiers proposés, dans l'ordre d'affichage. Les signatures `.sig` et archives de mise à jour sont ignorées. */
  const file = (re, [name, desc], main = false) => ({ re, name, desc, main });
  const PLATFORMS = [
    { id: "windows", name: "Windows", note: TEXT.windows.note, files: [
      file(/_x64-setup\.exe$/i, TEXT.windows.exe, true),
      file(/\.msi$/i, TEXT.windows.msi),
    ] },
    { id: "macos", name: "macOS", note: TEXT.macos.note, files: [
      file(/_aarch64\.dmg$/i, TEXT.macos.arm, true),
      file(/_x64\.dmg$/i, TEXT.macos.intel),
    ] },
    { id: "linux", name: "Linux", note: TEXT.linux.note, files: [
      file(/\.AppImage$/i, TEXT.linux.appimage, true),
      file(/\.deb$/i, TEXT.linux.deb),
      file(/\.rpm$/i, TEXT.linux.rpm),
    ] },
  ];

  const ua = navigator.userAgent;
  const currentOs = /Windows/i.test(ua) ? "windows" : /Mac OS X|Macintosh/i.test(ua) ? "macos" : /Linux|X11/i.test(ua) && !/Android/i.test(ua) ? "linux" : null;

  const fmtSize = (bytes) => `${(bytes / 1e6).toLocaleString(TEXT.locale, { maximumFractionDigits: 1 })} ${TEXT.megabytes}`;
  const fmtDate = (iso) => new Date(iso).toLocaleDateString(TEXT.locale, { day: "numeric", month: "long", year: "numeric" });
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  function render(release, newerPre) {
    const host = document.getElementById("downloads");
    host.replaceChildren();
    const assets = release.assets.filter((a) => !a.name.endsWith(".sig"));
    let heroAsset = null;

    for (const p of PLATFORMS) {
      const card = el("article", "platform glass" + (p.id === currentOs ? " current" : ""));
      const head = el("header");
      head.append(icon(p.id));
      head.append(el("h3", null, p.name));
      if (p.id === currentOs) head.append(el("span", "tag", TEXT.yourSystem));
      card.append(head);
      const list = el("div", "files");
      for (const f of p.files) {
        const asset = assets.find((a) => f.re.test(a.name));
        if (!asset) continue;
        const a = el("a", "file");
        a.href = asset.browser_download_url;
        a.append(icon("file"));
        const label = el("span");
        label.append(el("div", "name", f.name), el("div", "desc", f.desc));
        a.append(label, el("span", "size", fmtSize(asset.size)));
        list.append(a);
        if (f.main && p.id === currentOs) heroAsset = { asset, platform: p.name };
      }
      if (!list.children.length) list.append(el("p", "note", TEXT.notAvailable));
      card.append(list, el("p", "note", p.note));
      host.append(card);
    }

    reveal(host.children, { step: 90 });

    const version = release.tag_name.replace(/^v/, "");
    const info = document.getElementById("release-info");
    info.replaceChildren(TEXT.published(version, fmtDate(release.published_at)));
    if (release.prerelease) info.append(el("span", "badge-pre", TEXT.experimental));
    info.append(" · ");
    const notes = el("a", null, TEXT.notes);
    notes.href = release.html_url;
    info.append(notes, " · ");
    const all = el("a", null, TEXT.allReleases);
    all.href = RELEASES;
    info.append(all);
    if (newerPre) {
      info.append(el("br"), TEXT.newerPre);
      const pre = el("a", null, newerPre.tag_name);
      pre.href = newerPre.html_url;
      info.append(pre);
    }

    document.getElementById("hero-version").textContent = TEXT.heroVersion(version, release.prerelease);
    if (heroAsset) {
      const btn = document.getElementById("hero-download");
      btn.href = heroAsset.asset.browser_download_url;
      document.getElementById("hero-download-label").textContent = TEXT.downloadFor(heroAsset.platform);
      document.getElementById("hero-meta").textContent = TEXT.heroMeta(heroAsset.asset.name, fmtSize(heroAsset.asset.size));
    }
  }

  function fail() {
    const host = document.getElementById("downloads");
    host.replaceChildren();
    const box = el("div", "glass fallback");
    box.append(TEXT.failed);
    const a = el("a", null, TEXT.failedLink);
    a.href = RELEASES;
    box.append(a);
    host.append(box);
  }

  fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, { headers: { Accept: "application/vnd.github+json" } })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((list) => {
      const published = list.filter((r) => !r.draft && r.assets.length);
      if (!published.length) return fail();
      // Version stable de préférence ; à défaut, la plus récente des versions expérimentales.
      const stable = published.find((r) => !r.prerelease);
      const release = stable || published[0];
      const newerPre = stable && published[0] !== stable && published[0].prerelease ? published[0] : null;
      render(release, newerPre);
    })
    .catch(fail);
})();
