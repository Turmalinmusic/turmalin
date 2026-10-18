const header = document.querySelector("[data-header]");
const range = document.querySelector("[data-bpm-range]");
const trackButtons = [...document.querySelectorAll("[data-track]")];
const attributes = [...document.querySelectorAll("[data-attribute-toggle]")];
const attributeAudioButtons = [...document.querySelectorAll("[data-attribute-audio]")];
const mailLinks = [...document.querySelectorAll("[data-mail-link]")];
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
const isBlinkBrowser = /\b(Chrome|Chromium|CriOS|Edg|OPR|Ecosia)\b/i.test(navigator.userAgent)
  && !/\bSafari\/[\d.]+ Version\//i.test(navigator.userAgent);

document.documentElement.classList.toggle("is-blink-browser", isBlinkBrowser);

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

let bpmChosen = false;
let lengthChosen = false;

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
  const bodyLines = [message?.value || ""];
  const configLines = [];
  if (bpmChosen && customRange) configLines.push(`Gewünschte BPM-Spanne: ${customRange.min}–${customRange.max} BPM`);
  if (lengthChosen && lengthText) configLines.push(`Gewünschte Setlänge: ${lengthText}`);
  if (attrs.length) configLines.push(`Musikalische Attribute: ${attrs.join(", ")}`);
  if (configLines.length) bodyLines.push("", "Sound & Setlänge:", ...configLines);
  const body = bodyLines.join("\n");
  mailLinks.forEach((mailLink) => {
    mailLink.href = `mailto:turmalin.music@gmail.com?subject=${encodeURIComponent("Booking Anfrage TURMALIN")}&body=${encodeURIComponent(body)}`;
  });
};

mailLinks.forEach((mailLink) => {
  mailLink.addEventListener("click", updateBooking);
});

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
    const selected = button.classList.toggle("is-active");
    button.setAttribute("aria-pressed", String(selected));
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
  input?.addEventListener("input", () => { bpmChosen = true; updateBooking(); });
});

setLength?.addEventListener("input", () => { lengthChosen = true; updateBooking(); });
attributes.forEach((button) => button.setAttribute("aria-pressed", "false"));
document.querySelector("[data-reset-config]")?.addEventListener("click", () => {
  bpmChosen = false;
  lengthChosen = false;
  [bookingBpmMin, bookingBpmMax, setLength].forEach((input) => { if (input) input.value = input.defaultValue; });
  attributes.forEach((button) => {
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");
  });
  stopAttributeAudio();
  updateBooking();
});
document.querySelector("[data-customizer]")?.addEventListener("toggle", (event) => {
  if (!event.target.open) stopAttributeAudio();
});
document.querySelector("[data-copy-email]")?.addEventListener("click", async () => {
  const status = document.querySelector("[data-copy-status]");
  try {
    await navigator.clipboard.writeText("turmalin.music@gmail.com");
    status.textContent = "E-Mail-Adresse kopiert.";
  } catch {
    status.textContent = "Bitte die E-Mail-Adresse markieren und kopieren.";
  }
});
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

const featuredVideo = document.querySelector("[data-featured-video]");
const featuredPlay = document.querySelector("[data-featured-play]");
const featuredStatus = document.querySelector("[data-featured-status]");
if (featuredVideo && featuredPlay) {
  featuredVideo.controls = true;
  featuredPlay.hidden = false;
  featuredPlay.addEventListener("click", async () => {
    featuredVideo.controls = true;
    featuredVideo.muted = false;
    try {
      await featuredVideo.play();
      featuredPlay.hidden = true;
      featuredStatus.textContent = "";
    } catch {
      featuredPlay.hidden = true;
      featuredStatus.textContent = "Bitte starte den Clip über die Videosteuerung.";
    }
  });
  featuredVideo.addEventListener("play", () => { featuredPlay.hidden = true; });
  featuredVideo.addEventListener("seeking", () => { featuredPlay.hidden = true; });
  featuredVideo.addEventListener("ended", () => { featuredPlay.hidden = false; });
  const featuredObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (!entry.isIntersecting) featuredVideo.pause(); });
  });
  featuredObserver.observe(featuredVideo);
}
