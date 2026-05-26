const header = document.querySelector("[data-header]");
const range = document.querySelector("[data-bpm-range]");
const trackButtons = [...document.querySelectorAll("[data-track]")];
const attributes = [...document.querySelectorAll("[data-attribute-toggle]")];
const attributeAudioButtons = [...document.querySelectorAll("[data-attribute-audio]")];
const includeConfig = document.querySelector("[data-include-config]");
const summary = document.querySelector("[data-summary]");
const mailLink = document.querySelector("[data-mail-link]");
const message = document.querySelector("#bookingMessage");
const bpmLabel = document.querySelector("[data-bpm-label]");
const trackTitle = document.querySelector("[data-track-title]");
const trackDetail = document.querySelector("[data-track-detail]");
const spotifyPlayer = document.querySelector("[data-spotify-player]");
const bookingBpmMin = document.querySelector("[data-booking-bpm-min]");
const bookingBpmMax = document.querySelector("[data-booking-bpm-max]");
const bookingBpmMinLabel = document.querySelector("[data-booking-bpm-min-label]");
const bookingBpmMaxLabel = document.querySelector("[data-booking-bpm-max-label]");
const bookingRangeAxis = document.querySelector("[data-booking-range-axis]");
const setLength = document.querySelector("[data-set-length]");
const setLengthLabel = document.querySelector("[data-set-length-label]");

const tracks = trackButtons.map((button) => ({
  bpm: Number(button.dataset.bpm),
  kind: button.dataset.kind,
  title: button.dataset.title,
  start: button.dataset.start,
  spotify: button.dataset.spotify,
  button,
}));

let activeTrack = tracks.find((track) => track.bpm === Number(range?.value)) || tracks[0] || null;

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const nearestTrack = (bpm) => {
  if (!tracks.length) return null;
  return tracks.reduce((closest, track) =>
    Math.abs(track.bpm - bpm) < Math.abs(closest.bpm - bpm) ? track : closest
  );
};

const selectedAttributes = () =>
  attributes.filter((button) => button.classList.contains("is-active")).map((button) => button.textContent.trim());

const bookingBpmRange = () => {
  if (!bookingBpmMin || !bookingBpmMax) return null;
  let min = Number(bookingBpmMin.value);
  let max = Number(bookingBpmMax.value);

  if (min > max) {
    if (document.activeElement === bookingBpmMin) {
      max = min;
      bookingBpmMax.value = String(max);
    } else {
      min = max;
      bookingBpmMin.value = String(min);
    }
  }

  bookingBpmMinLabel.textContent = `${min} BPM`;
  bookingBpmMaxLabel.textContent = `${max} BPM`;
  if (bookingRangeAxis) {
    const inputMin = Number(bookingBpmMin.min);
    const inputMax = Number(bookingBpmMin.max);
    const span = inputMax - inputMin;
    bookingRangeAxis.style.setProperty("--min-percent", `${((min - inputMin) / span) * 100}%`);
    bookingRangeAxis.style.setProperty("--max-percent", `${((max - inputMin) / span) * 100}%`);
  }
  return { min, max };
};

const bookingSetLength = () => {
  if (!setLength) return null;
  const length = Number(setLength.value);
  const label = `${String(length).replace(".", ",")} ${length === 1 ? "Stunde" : "Stunden"}`;
  if (setLengthLabel) setLengthLabel.textContent = label;
  const min = Number(setLength.min);
  const max = Number(setLength.max);
  const span = max - min;
  setLength.style.setProperty("--length-percent", `${((length - min) / span) * 100}%`);
  return label;
};

const updateBooking = () => {
  if (activeTrack) {
    if (bpmLabel) bpmLabel.textContent = `${activeTrack.bpm} BPM`;
    if (trackTitle) trackTitle.textContent = activeTrack.title;
    if (trackDetail) trackDetail.textContent = `${activeTrack.kind} · Start bei ${activeTrack.start}`;
    if (spotifyPlayer && activeTrack.spotify && spotifyPlayer.src !== activeTrack.spotify) {
      spotifyPlayer.src = activeTrack.spotify;
    }
    if (range) range.value = activeTrack.bpm;
  }

  trackButtons.forEach((button) => {
    button.classList.toggle("is-active", button === activeTrack?.button);
  });

  const attrs = selectedAttributes();
  const customRange = bookingBpmRange();
  const lengthText = bookingSetLength();
  const customRangeText = customRange ? `${customRange.min} - ${customRange.max} BPM` : "noch offen";
  const shouldIncludeConfig = includeConfig?.checked ?? true;
  const bodyLines = [
    "Hi TURMALIN,",
    "",
    "ich möchte dich gerne für ein Set anfragen.",
    "",
    "Event-Infos:",
    message?.value || "",
  ];

  if (shouldIncludeConfig) {
    bodyLines.splice(
      4,
      0,
      `Gewünschte Set-Spanne: ${customRangeText}`,
      `Gewünschte Set-Länge: ${lengthText || "noch offen"}`,
      `Attribute: ${attrs.length ? attrs.join(", ") : "noch offen"}`
    );

    if (activeTrack) {
      bodyLines.splice(
        6,
        0,
        `Gewünschte BPM/Energie: ${activeTrack.bpm} BPM`,
        `Track-Referenz: ${activeTrack.title} (${activeTrack.kind}, Start bei ${activeTrack.start})`
      );
    }
  }

  const body = bodyLines.join("\n");
  const attrText = attrs.length ? attrs.join(", ") : "Attribute noch auswählen";
  const referenceText = activeTrack ? ` · Referenz: ${activeTrack.bpm} BPM ${activeTrack.kind}` : "";
  const lengthSummary = lengthText ? ` · ${lengthText}` : "";

  if (summary) {
    summary.textContent = shouldIncludeConfig
      ? `${customRangeText}${lengthSummary}${referenceText} · ${attrText}`
      : "BPM & Charakteristiken werden nicht in die E-Mail übernommen.";
  }
  if (mailLink) {
    mailLink.href = `mailto:turmalin.music@gmail.com?subject=${encodeURIComponent("Booking Anfrage TURMALIN")}&body=${encodeURIComponent(body)}`;
  }
};

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTrack = tracks.find((track) => track.button === button);
    updateBooking();
  });
});

range?.addEventListener("input", () => {
  activeTrack = nearestTrack(Number(range.value));
  updateBooking();
});

attributes.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-active");
    updateBooking();
  });
});

let activeAttributeAudio = null;
let activeAttributeButton = null;

const stopAttributeAudio = () => {
  if (activeAttributeAudio) {
    activeAttributeAudio.pause();
    activeAttributeAudio.currentTime = 0;
  }
  activeAttributeButton?.classList.remove("is-playing");
  if (activeAttributeButton) {
    activeAttributeButton.textContent = "▶";
  }
  activeAttributeAudio = null;
  activeAttributeButton = null;
};

attributeAudioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (activeAttributeButton === button) {
      stopAttributeAudio();
      return;
    }

    stopAttributeAudio();
    activeAttributeAudio = new Audio(button.dataset.attributeAudio);
    activeAttributeButton = button;
    button.classList.add("is-playing");
    button.textContent = "■";
    activeAttributeAudio.addEventListener("ended", stopAttributeAudio, { once: true });
    activeAttributeAudio.play().catch(stopAttributeAudio);
  });
});

[bookingBpmMin, bookingBpmMax].forEach((input) => {
  input?.addEventListener("input", updateBooking);
});

setLength?.addEventListener("input", updateBooking);
includeConfig?.addEventListener("change", updateBooking);
message?.addEventListener("input", updateBooking);
window.addEventListener("scroll", updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal-3d").forEach((element) => revealObserver.observe(element));

const tiltTarget = document.querySelector("[data-tilt]");
window.addEventListener(
  "scroll",
  () => {
    if (!tiltTarget) return;
    const progress = Math.min(1, window.scrollY / 700);
    tiltTarget.style.transform = `rotateX(${progress * 8}deg) rotateY(${-progress * 10}deg) translateY(${progress * 22}px)`;
  },
  { passive: true }
);

const autoVideos = [...document.querySelectorAll("[data-auto-video]")];
const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      video.muted = true;
      if (entry.isIntersecting) {
        video.play?.().catch(() => {});
      } else {
        video.pause?.();
      }
    });
  },
  { threshold: 0.35 }
);

autoVideos.forEach((video) => {
  video.pause?.();
  videoObserver.observe(video);
  const rect = video.getBoundingClientRect();
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  if (visibleHeight > rect.height * 0.35) {
    video.muted = true;
    video.play?.().catch(() => {});
  }
});

updateHeader();
updateBooking();
