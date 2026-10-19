(() => {
  const storageKey = 'turmalin-language';
  const htmlTranslations = {
    '.hero-download-links a:first-child': 'Press Kit <span aria-hidden="true">↓</span>',
    '.hero-copy span:last-child': 'Deep electronic sound journeys - from downtempo to psytech.',
    '.artist-section h2': 'Biography & Soundscape',
    '.bio-copy p:nth-child(1)': 'I am Philipp from Augsburg, Germany, and I have been playing electronic music in <span class="gold-text">clubs, at festivals and at my own events</span> since 2020. As TURMALIN, my sound blends deep, gritty basslines with groovy rhythms, distinctive vocals and organic textures – atmospheric, full of character and energy.',
    '.bio-copy p:nth-child(2)': 'My sound moves from deep <span class="gold-text">downtempo</span> and <span class="gold-text">midtempo</span> through punchy <span class="gold-text">indie dance</span> to driving <span class="gold-text">psytech</span>. I create electronic sound journeys that unfold with the energy of the moment: sometimes nasty and bouncy, sometimes psychedelic and driving.',
    '.bio-copy p:nth-child(3)': '<span class="gold-text">Live electric guitar</span> adds an extra <span class="gold-text">psychedelic, organic and atmospheric touch</span> to my sound.',
    '.sc-card:first-child .sc-card-context': 'Mix series · Technoid sound journey',
    '.sc-card:nth-child(2) .sc-card-context': 'Live set · Technoid sound journey',
    '.soundcloud-more a': 'All sets on SoundCloud ↗',
    '#references h2': 'Selected appearances',
    '.reference-columns > div:nth-child(2) h3': 'Festivals & Open Airs',
    '#videos .live-gallery-clip:first-child figcaption': 'Live electric guitar @ Psychedelic Cruise',
    '#booking h2': 'Booking enquiries',
    '.booking-intro': 'Tell me a little about your event.',
    '.message-label': 'Your message',
    '.booking-customizer summary': 'Choose sound & set length <span>(optional)</span>',
    '.customizer-hint': 'Only your selections will be added to the enquiry. Play the audio examples to get a feel for the sound.',
    '[data-range-from]': 'From',
    '[data-range-to]': 'To',
    '.booking-config-block:nth-of-type(2) .config-title': 'Characteristics',
    '.booking-config-block:nth-of-type(3) .config-title': 'Set length',
    '[data-reset-config]': 'Reset selections',
    '.booking-mail-button': 'Open enquiry in your email app',
    '[data-copy-email]': 'Copy',
    '.booking-phone': 'Phone: <a href="tel:+4915158729065">+49 151 58729065</a>',
    '#presskit-heading': 'Press Kit & Downloads',
    '.presskit-download[href*="Presskit_DE"] span': 'Press Kit German',
    '.presskit-download[href*="Presskit_DE"] small': 'PDF · 2 pages · 1.0 MB',
    '.presskit-download[href*="Presskit_EN"] small': 'PDF · 2 pages · 1.0 MB',
    '.presskit-download[href*="Pressefotos"] span': 'Press photos & Logo',
    '.presskit-download[href*="Pressefotos"] small': 'ZIP · 5 photos + logo · 16.6 MB',
    '.presskit-credit-note': 'Press photos for promoting my performances. Photo credits: Cheyenne Flock and Tim Riegel – see the download for individual credits.',
    '#technical-rider-heading': 'Technical requirements',
    '.presskit-download[href*="Rider_DE"] span': 'Technical Rider German',
    '.presskit-download[href*="Rider_DE"] small': 'PDF · 1 page · 668 KB',
    '.side-project .kicker': 'My second artist project',
    '.side-project-copy': 'Alongside TURMALIN, Sun Spirit explores another musical world: <span class="gold-text">warm, emotional and spiritual</span>. The sound moves from <span class="gold-text">downtempo to house</span> in its many forms, touching on <span class="gold-text">melodic, driving techno</span> depending on the setting. The sets unfold as organic, atmospheric sound journeys with room for <span class="gold-text">lightness, depth and connection</span>.'
  };
  const attributeTranslations = [
    ['.hero-startbild', 'src', 'hero-start-en.png'],
    ['meta[name="description"]', 'content', 'TURMALIN creates deep electronic sound journeys from downtempo to psytech. DJ sets, live electric guitar, selected appearances and booking.'],
    ['meta[property="og:description"]', 'content', 'Deep electronic sound journeys from downtempo to psytech.'],
    ['.hero', 'aria-label', 'TURMALIN artist homepage'],
    ['.hero-startbild', 'alt', 'TURMALIN – deep electronic sound journeys from downtempo to psytech'],
    ['.hero-copy', 'aria-label', 'TURMALIN – deep electronic sound journeys from downtempo to psytech'],
    ['.hero-actions', 'aria-label', 'Booking'],
    ['.image-cta', 'aria-label', 'Send a booking enquiry'],
    ['.hero-download-links', 'aria-label', 'Press and technical information'],
    ['.hero-social-links', 'aria-label', 'TURMALIN on social media'],
    ['.hero-social-links a:first-child', 'aria-label', 'TURMALIN on SoundCloud (new tab)'],
    ['.hero-social-links a:last-child', 'aria-label', 'TURMALIN on Instagram (new tab)'],
    ['[data-featured-video]', 'aria-label', 'TURMALIN live at Rave am See'],
    ['[data-featured-play]', 'aria-label', 'Play live clip with sound'],
    ['.sc-card:first-child .sc-cover', 'aria-label', 'Open Tief & Knatschig #2 on SoundCloud'],
    ['.sc-card:nth-child(2) .sc-cover', 'aria-label', 'Open Psychedelic Cruise on SoundCloud'],
    ['#videos .live-gallery-clip:first-child video', 'aria-label', 'TURMALIN with live electric guitar at Psychedelic Cruise'],
    ['#videos .live-gallery-clip:nth-child(2) video', 'aria-label', 'TURMALIN live at Soho Stage, clip 4'],
    ['#videos .live-gallery-clip:nth-child(3) video', 'aria-label', 'TURMALIN live at Soho Stage, clip 3'],
    ['#bookingMessage', 'placeholder', 'Date, venue and planned set time – if already known.'],
    ['.booking-config', 'aria-label', 'Set preferences for your booking enquiry'],
    ['#bookingBpmMin', 'aria-label', 'Minimum BPM'],
    ['#bookingBpmMax', 'aria-label', 'Maximum BPM'],
    ['#setLength', 'aria-label', 'Set length'],
    ['.side-image img', 'alt', 'Sun Spirit DJ set at Sonnendeck'],
    ['[data-language-switch]', 'aria-label', 'Choose language']
  ];
  const characteristics = { Psychedelisch: 'Psychedelic', Mystisch: 'Mystical', Energetisch: 'Energetic', Erdig: 'Earthy' };
  const messages = {
    hours: ['Stunden', 'hours'], hour: ['Stunde', 'hour'],
    bpm: ['Gewünschte BPM-Spanne', 'Preferred BPM range'],
    length: ['Gewünschte Setlänge', 'Preferred set length'],
    attributes: ['Musikalische Attribute', 'Musical characteristics'],
    preferences: ['Sound & Setlänge:', 'Sound & set length:'],
    subject: ['Booking Anfrage TURMALIN', 'TURMALIN booking enquiry'],
    copied: ['E-Mail-Adresse kopiert.', 'Email address copied.'],
    copyError: ['Bitte die E-Mail-Adresse markieren und kopieren.', 'Please select and copy the email address.'],
    videoError: ['Bitte starte den Clip über die Videosteuerung.', 'Please start the clip using the video controls.'],
    start: ['Start bei', 'Starts at']
  };
  const entries = Object.entries(htmlTranslations).map(([selector, en]) => {
    const element = document.querySelector(selector);
    return element && {element, de: element.innerHTML, en};
  }).filter(Boolean);
  const attrs = attributeTranslations.map(([selector, attribute, en]) => {
    const element = document.querySelector(selector);
    return element && {element, attribute, de: element.getAttribute(attribute), en};
  }).filter(Boolean);
  document.querySelectorAll('.reference-table dd').forEach(element => {
    const en = {München: 'Munich', Köln: 'Cologne', 'zwischen Hamburg & Berlin': 'between Hamburg & Berlin'}[element.textContent.trim()];
    if (en) entries.push({element, de: element.innerHTML, en});
  });
  document.querySelectorAll('[data-attribute-toggle]').forEach(element => {
    const de = element.textContent.trim();
    if (characteristics[de]) entries.push({element, de, en: characteristics[de]});
  });
  document.querySelectorAll('[data-attribute-audio]').forEach(element => {
    const original = element.getAttribute('aria-label');
    const deName = original.replace(' Track abspielen', '');
    attrs.push({element, attribute: 'aria-label', de: original, en: 'Play '+(characteristics[deName] || deName)+' audio example'});
  });
  // Translate only fallback text, keeping video sources and playback state intact.
  const videoFallbacks = [...document.querySelectorAll('video')].flatMap(video =>
    [...video.childNodes].filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('Dein Browser'))
      .map(node => ({node, de: node.textContent})));
  let language = 'de';
  const applyLanguage = (next, persist = false) => {
    if (next !== 'de' && next !== 'en') return;
    const scrollY = window.scrollY;
    const anchor = [...document.querySelectorAll('main > section, footer')].find(element => element.getBoundingClientRect().bottom > 0);
    const anchorTop = anchor?.getBoundingClientRect().top;
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    language = next;
    document.documentElement.lang = next;
    entries.forEach(({element, de, en}) => { element.innerHTML = next === 'en' ? en : de; });
    attrs.forEach(({element, attribute, de, en}) => { element.setAttribute(attribute, next === 'en' ? en : de); });
    videoFallbacks.forEach(({node, de}) => { node.textContent = next === 'en' ? 'Your browser does not support this video.' : de; });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === next));
    });
    document.querySelectorAll('[data-copy-status], [data-featured-status]').forEach(element => {element.textContent = '';});
    if (persist) { try { localStorage.setItem(storageKey, next); } catch {} }
    window.dispatchEvent(new CustomEvent('turmalin:languagechange', {detail: {language: next}}));
    // Compensate for translated content above the current section without navigating.
    if (persist && anchor) window.scrollTo({top: scrollY === 0 ? 0 : scrollY + anchor.getBoundingClientRect().top - anchorTop, behavior: 'instant'});
    document.documentElement.style.scrollBehavior = previousBehavior;
  };
  window.turmalinI18n = {
    get language() { return language; },
    t: key => messages[key][language === 'en' ? 1 : 0]
  };
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.language !== language) applyLanguage(button.dataset.language, true);
  }));
  let saved = 'de';
  try { if (localStorage.getItem(storageKey) === 'en') saved = 'en'; } catch {}
  applyLanguage(saved);
})();
