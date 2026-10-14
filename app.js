(function () {
  const profile = window.PROFILE;
  if (!profile) return;

  const track = document.getElementById("track");
  const topName = document.getElementById("topName");
  const topPage = document.getElementById("topPage");
  const pageAbout = document.getElementById("pageAbout");
  const pageContact = document.getElementById("pageContact");
  const tabContact = document.getElementById("tabContact");
  const tabAbout = document.getElementById("tabAbout");
  const dots = document.querySelectorAll(".dot");

  let page = 0;
  let startX = 0;
  let startY = 0;
  let tracking = false;

  // ---- fill content from content.js ----
  topName.textContent = profile.name;
  document.getElementById("fullName").textContent = profile.name;
  document.getElementById("headline").textContent = profile.headline;
  document.getElementById("location").textContent = profile.location;

  const photo = document.getElementById("photo");
  const photoFallback = document.getElementById("photoFallback");
  if (profile.photo) {
    photo.src = profile.photo;
    photo.alt = profile.photoAlt || profile.name;
    photo.onload = function () {
      photo.hidden = false;
      photoFallback.hidden = true;
    };
    photo.onerror = function () {
      photo.hidden = true;
      photoFallback.hidden = false;
    };
  }

  fillList("achievements", profile.achievements);
  fillChips("specialties", profile.specialties);
  fillChips("hobbies", profile.hobbies);
  fillSocials(profile.socials || []);
  fillWechat(profile.wechat);

  function fillList(id, items) {
    const el = document.getElementById(id);
    el.innerHTML = "";
    (items || []).forEach(function (text) {
      const li = document.createElement("li");
      li.textContent = text;
      el.appendChild(li);
    });
  }

  function fillChips(id, items) {
    const el = document.getElementById(id);
    el.innerHTML = "";
    (items || []).forEach(function (text) {
      const li = document.createElement("li");
      li.textContent = text;
      el.appendChild(li);
    });
  }

  function fillSocials(socials) {
    const el = document.getElementById("socials");
    el.innerHTML = "";
    socials.forEach(function (s, i) {
      const li = document.createElement("li");
      li.className = "reveal";
      li.dataset.delay = String(i + 2);

      const a = document.createElement("a");
      a.className = "social-link";
      a.href = s.href;
      a.target = "_blank";
      a.rel = "noreferrer";

      const icon = document.createElement("span");
      icon.className = "social-icon";
      icon.innerHTML = iconSvg(s.label);

      const text = document.createElement("span");
      text.className = "social-text";
      text.innerHTML =
        '<span class="social-label"></span><span class="social-handle"></span>';
      text.querySelector(".social-label").textContent = s.label;
      text.querySelector(".social-handle").textContent = s.handle || "";

      a.appendChild(icon);
      a.appendChild(text);
      li.appendChild(a);
      el.appendChild(li);
    });
  }

  function iconSvg(label) {
    // Simple line icons
    const common =
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    switch (label) {
      case "Instagram":
        return (
          '<svg viewBox="0 0 24 24" ' +
          common +
          '><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>'
        );
      case "LinkedIn":
        return (
          '<svg viewBox="0 0 24 24" ' +
          common +
          '><path d="M6 9v12M6 5v.01M10 21V10c0-1.5 1-3 3-3s3 1.5 3 3v11M16 21V10"/></svg>'
        );
      case "LINE":
      case "WhatsApp":
        return (
          '<svg viewBox="0 0 24 24" ' +
          common +
          '><path d="M21 11.5a8.4 8.4 0 0 1-1.2 4.4 8.5 8.5 0 0 1-7.3 4.1 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z"/></svg>'
        );
      case "GroupMe":
        return (
          '<svg viewBox="0 0 24 24" ' +
          common +
          '><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><path d="M14 16c1.5-.8 4-1 5.5.2 1 .8 1.5 2 1.5 2.8"/></svg>'
        );
      default:
        return (
          '<svg viewBox="0 0 24 24" ' +
          common +
          '><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>'
        );
    }
  }

  function fillWechat(wechat) {
    if (!wechat) return;
    document.getElementById("wechatTitle").textContent = wechat.label || "WeChat";
    document.getElementById("wechatHint").textContent = wechat.hint || "";
    const img = document.getElementById("wechatImg");
    const fallback = document.getElementById("wechatFallback");
    if (wechat.image) {
      img.src = wechat.image;
      img.onload = function () {
        img.hidden = false;
        fallback.hidden = true;
      };
      img.onerror = function () {
        img.hidden = true;
        fallback.hidden = false;
      };
    }
  }

  // ---- page switching + animation ----
  function setPage(next) {
    if (next === page) return;
    const prevPage = page;
    const prevEl = prevPage === 0 ? pageAbout : pageContact;
    const nextEl = next === 0 ? pageAbout : pageContact;

    prevEl.classList.remove("is-active");
    prevEl.classList.add("is-leaving");

    page = next;
    track.style.transform = "translateX(-" + page * 50 + "%)";
    topPage.textContent = page === 0 ? "About" : "Contact";
    tabContact.hidden = page !== 0;
    tabAbout.hidden = page !== 1;

    dots.forEach(function (dot) {
      dot.classList.toggle("is-active", Number(dot.dataset.page) === page);
    });

    // Force reflow so enter animation restarts
    void nextEl.offsetWidth;
    nextEl.classList.remove("is-leaving");
    nextEl.classList.add("is-active");

    window.setTimeout(function () {
      prevEl.classList.remove("is-leaving");
    }, 320);
  }

  // First paint
  pageAbout.classList.add("is-active");

  tabContact.addEventListener("click", function () {
    setPage(1);
  });
  tabAbout.addEventListener("click", function () {
    setPage(0);
  });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      setPage(Number(dot.dataset.page));
    });
  });

  const viewport = document.getElementById("viewport");

  viewport.addEventListener(
    "pointerdown",
    function (e) {
      if (e.target.closest("a, button")) return;
      tracking = true;
      startX = e.clientX;
      startY = e.clientY;
    },
    { passive: true }
  );

  viewport.addEventListener(
    "pointerup",
    function (e) {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) setPage(1);
      else setPage(0);
    },
    { passive: true }
  );

  viewport.addEventListener("pointercancel", function () {
    tracking = false;
  });
})();
