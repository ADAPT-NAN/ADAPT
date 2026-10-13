// ADAPT-Nan single-page website.
//
// Every page is an English HTML template below. After a page is rendered,
// i18n.js translates its text into Thai using content/translations.js, so to
// change wording: edit the English here, then update the matching key there.
// Pages are addressed by the URL hash, e.g. #team or #study/1-2.

/* ------------------------------------------------------------------ */
/* State and shared helpers                                            */
/* ------------------------------------------------------------------ */

const main = document.querySelector('main');
const englishGroups = ['Agrarian change', 'Social engagement', 'Agroecology emergence'];
let {research, team} = localizedData();
let groups = englishGroups.map(translate);

const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const translateInstitution = org => window.ADAPT_TRANSLATIONS[org] || org;
const firstSentence = text => text.split(/(?<=[.!?]) /)[0];
// "Assoc. Prof. Dr. Pongchai Dumrongrojwatthana" -> "PD"
const initials = name => name.replace(/\b(Assoc|Assist|Prof|Dr|Mrs|Mr|Ms)\.\s*/g, '').split(/\s+/).filter(Boolean)
  .map((word, i, words) => i === 0 || i === words.length - 1 ? word[0] : '').join('').toUpperCase();

const arrow = '<span aria-hidden="true">↗</span>';
const button = (label, url, light = false) => `<a class="button ${light ? 'light' : ''}" href="${url}">${label} ${arrow}</a>`;
const heading = (label, title, desc) => `
  <div class="page-heading">
    <span class="eyebrow dot">${label}</span>
    <h1>${title}</h1>
    ${desc ? `<p>${desc}</p>` : ''}
  </div>`;
const partners = () => `
  <div class="partners">
    <span class="eyebrow">A shared commitment. A collaborative effort.</span>
    <img src="assets/image2.png" width="1364" height="311" alt="Partners and supporters shown in the project document: French Ministry for Europe and Foreign Affairs, Chulalongkorn University and Center for Social Engagement, IRD, Kasetsart University, Nan Community College, and Rajamangala University of Technology Lanna Nan" loading="lazy">
  </div>`;

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

const principles = [
  ['participatory-research', 'Participatory research', 'Knowledge created together'],
  ['experiential-learning', 'Experiential learning', 'Learning through doing'],
  ['community-engagement', 'Community engagement', 'Change grounded in place'],
];
// One entry per research group, in the same order as englishGroups.
const themes = [
  {photo: 'themes/agrarian-change.jpg', alt: 'Terraced rice fields below forested hills and a village in Nan', text: 'Understanding agricultural transformations, environmental pressures, and the connections between forests and farming.'},
  {photo: 'themes/social-engagement.jpg', alt: 'Farmers and researchers playing a board game together around a workshop table', text: 'Exploring organic farming networks, Nan’s native red cows, and young people’s engagement with biodiversity.'},
  {photo: 'themes/agroecology-emergence.jpg', alt: 'Visitors gathered among the trees of a community learning center forest', text: 'Learning from local initiatives, civil society, and experiential education to support an agroecology movement.'},
];
const learningAudiences = [
  {key: 'university', title: 'University students', note: 'Immersive field learning in agroecology'},
  {key: 'school', title: 'High school students', note: 'Hands-on learning for the next generation'},
  {key: 'community', title: 'Farmers & communities', note: 'Local knowledge, shared practice'},
];

function home() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow dot">Rooted in Nan. Growing together.</span>
        <h1>Growing knowledge,<br>Cultivating <em>change</em></h1>
        <p>Connecting science, local wisdom, and the next generation to advance agroecology in Nan Province, Thailand.</p>
        <div class="actions">
          ${button('Our project', '#about')}
          <a class="text-link" href="#research">Explore the research ${arrow}</a>
        </div>
      </div>
      <div class="hero-art">
        <img src="assets/hero-nan.jpg" width="1600" height="901" alt="Rice paddies reflecting the morning sun, with village houses and forested hills behind them in Nan Province">
        <span class="art-label">NAN PROVINCE · THAILAND</span>
        <div class="art-caption">
          <span>A future rooted in living landscapes</span>
          <span>Rice fields at sunrise, Nan</span>
        </div>
      </div>
    </section>
    <div class="principles">
      ${principles.map(([icon, title, note]) => `
        <div>
          <img src="assets/icons/${icon}.svg" width="44" height="44" alt="">
          <div>${title}<small>${note}</small></div>
        </div>`).join('')}
    </div>
    <section class="container section">
      <div class="section-head">
        <div>
          <span class="eyebrow">Our research</span>
          <h2>Understanding the land<br>Supporting the people</h2>
        </div>
        <p>Three connected research themes explore pathways toward more resilient farming systems and communities.</p>
      </div>
      <div class="grid">
        ${groups.map((group, i) => `
          <article class="card theme-card">
            <img class="card-photo" src="assets/${themes[i].photo}" width="800" height="500" alt="${themes[i].alt}" loading="lazy">
            <span class="number">0${i + 1} / RESEARCH THEME</span>
            <h3>${group}</h3>
            <p>${themes[i].text}</p>
            <a class="text-link" href="#research/${i + 1}">Explore this theme ${arrow}</a>
          </article>`).join('')}
      </div>
    </section>
    <section class="learning-band">
      <div class="container section learning-layout">
        <div>
          <span class="eyebrow">Learning beyond the classroom</span>
          <h2>From shared knowledge<br>to lived experience</h2>
          <p>Bringing students, teachers, researchers, and farmers together to learn from the landscapes and communities of Nan.</p>
          ${button('Explore our learning approach', '#learning', true)}
        </div>
        <div class="learning-list">
          ${learningAudiences.map((audience, i) => `
            <a href="#learning/${audience.key}">
              <span class="num">0${i + 1}</span>
              <div><b>${audience.title}</b><small>${audience.note}</small></div>
              <span class="arrow">↗</span>
            </a>`).join('')}
        </div>
      </div>
    </section>
    <div class="container">${partners()}</div>`;
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

const workingMethods = [
  {
    title: 'Observe & listen',
    text: 'Direct observation, interviews, and focus groups bring different perspectives into the conversation.',
    photos: [
      ['methods/method-observe.jpg', 'A researcher and a student interviewing a farmer under a field shelter, taking notes together'],
      ['methods/observe-interview-officials.jpg', 'Researchers interviewing local officials beside a field, notes in hand'],
      ['methods/observe-livestock-visit.jpg', 'A farmer showing his pig pens to visitors during a farm visit'],
      ['methods/observe-tobacco-harvest.jpg', 'A farmer sorting freshly harvested tobacco leaves into baskets'],
      ['methods/observe-cattle-fair.jpg', 'Farmers and researchers inspecting native cattle at a provincial livestock fair'],
    ],
  },
  {
    title: 'Explore together',
    text: 'Role-play games and participatory workshops help people explore complex systems and possible futures.',
    photos: [
      ['methods/method-explore.jpg', 'Community members seated around a role-play game board during a participatory workshop'],
      ['methods/explore-map-workshop.jpg', 'Participants leaning over a large aerial map of their village, marking it together'],
      ['methods/explore-map-closeup.jpg', 'Hands placing orange markers on an aerial map to show land use'],
      ['methods/explore-map-meeting.jpg', 'A group gathered around an aerial map on a meeting table, drawing and discussing'],
      ['methods/explore-model-group.jpg', 'Villagers and students crowding around a three-dimensional landscape model'],
      ['methods/explore-model-discussion.jpg', 'A facilitator explaining the landscape model to seated participants'],
    ],
  },
  {
    title: 'Learn through practice',
    text: 'Field learning connects scientific ideas with community experience and intergenerational knowledge.',
    photos: [
      ['methods/method-practice.jpg', 'Villagers and a researcher sitting together on the forest floor during a community forest visit'],
      ['methods/practice-community-forest.jpg', 'A community forest of tall trees with a collection point among the trunks'],
      ['methods/practice-vegetable-nursery.jpg', 'A grower tending trays of lettuce seedlings under a shade net'],
      ['methods/practice-sorting-harvest.jpg', 'A farmer spreading the harvest on a drying mat beside her house'],
      ['methods/practice-drying-racks.jpg', 'Rows of bamboo drying racks laid out in the open air after harvest'],
      ['methods/practice-rice-terraces.jpg', 'Young rice growing in irrigated paddies framed by trees and hills'],
    ],
  },
];

// A photo slideshow: arrows, dots, and swiping move between photos, and a
// click opens the photo full size in the shared lightbox. `photos` is a list of
// [path inside assets/, description] pairs; `key` names the slideshow.
const galleryPhotos = {};
function gallery(photos, key) {
  galleryPhotos[key] = photos;
  return `
      <div class="gallery" data-gallery="${key}">
        <div class="gallery-frame">
          ${photos.map(([src, alt], i) => `
            <button type="button" class="gallery-slide${i ? '' : ' is-current'}" data-slide="${i}" aria-label="Open photo full size" ${i ? 'tabindex="-1" aria-hidden="true"' : ''}>
              <img src="assets/${src}" width="1200" height="675" alt="${alt}" loading="lazy">
            </button>`).join('')}
          <button type="button" class="gallery-arrow prev" data-step="-1" aria-label="Previous photo">‹</button>
          <button type="button" class="gallery-arrow next" data-step="1" aria-label="Next photo">›</button>
          <span class="gallery-count" aria-hidden="true">1 / ${photos.length}</span>
        </div>
        <div class="gallery-dots" role="tablist" aria-label="Choose a photo">
          ${photos.map((p, i) => `
            <button type="button" class="gallery-dot${i ? '' : ' is-current'}" data-dot="${i}" role="tab" aria-selected="${!i}" aria-label="Photo ${i + 1}"></button>`).join('')}
        </div>
      </div>`;
}

// One slideshow per working method on the About page.
function methodGallery(method, index) {
  return `
    <div class="method">
      ${gallery(method.photos, `method-${index}`)}
      <h3>${method.title}</h3>
      <p class="body-copy">${method.text}</p>
    </div>`;
}

function about() {
  return `
    <div class="container">
      ${heading('Our project', 'A transition grown together', 'ADAPT-Nan: Advances the Development of Agroecology in Nan Province, Thailand through participatory research and experiential education')}
      <div class="split section about-intro">
        <div>
          <h2>Science meets<br>local wisdom</h2>
          <p class="body-copy">Our work connects researchers, educators, young people, and farming communities. Together, they explore a transition from chemical-intensive monocultures toward integrated, sustainable farming systems.</p>
          <p class="body-copy">By valuing farmer knowledge alongside scientific approaches, the project supports the co-creation of knowledge that people can put into practice.</p>
        </div>
        <div class="callout">
          <span class="eyebrow">Our purpose</span>
          <h3>Support the people shaping agroecology’s future</h3>
          <p>Promote participatory research and transformative pedagogy through co-designed experiential learning.</p>
          <p>Re-enchant agriculture for younger generations through agroecological practices grounded in respect for the environment.</p>
        </div>
      </div>
      <section class="section how-we-work">
        <span class="eyebrow">How we work</span>
        <div class="grid">
          ${workingMethods.map(methodGallery).join('')}
        </div>
      </section>
      ${partners()}
    </div>`;
}

/* ------------------------------------------------------------------ */
/* Research list, filters, and detail pages                            */
/* ------------------------------------------------------------------ */

function researchCard(r) {
  // Thai summaries come from content/th.js; English uses the first sentence.
  const summary = r.summary ?? firstSentence(r.paragraphs[0]);
  return `
    <article class="card">
      <span class="number">${r.number} / ${groups[r.group - 1].toUpperCase()}</span>
      <h3>${escapeHTML(r.title)}</h3>
      <p>${escapeHTML(summary)}</p>
      <a class="text-link" href="#study/${r.id}">Read research overview ${arrow}</a>
    </article>`;
}

function researchPage(group = 'all') {
  return `
    <div class="container">
      ${heading('Our research', 'One living landscape', 'Many learning perspectives: explore nine connected areas of research across agricultural change, social engagement, and the emergence of agroecology.')}
      <label class="sr-only" for="research-search">Search research topics</label>
      <input class="search" id="research-search" type="search" placeholder="Search research topics…">
      <div class="filters" aria-label="Filter research themes">
        ${['All themes', ...groups].map((label, i) => `
          <button class="filter" data-group="${i || 'all'}" aria-pressed="${String(group) === String(i || 'all')}">${label}</button>`).join('')}
      </div>
      <p class="result-count" id="research-count" aria-live="polite"></p>
      <div class="grid research-grid" id="research-results"></div>
    </div>`;
}

// Re-runs the search and theme filter on the research page. Matches either language.
function updateResearch() {
  const query = document.querySelector('#research-search').value.trim().toLowerCase();
  const group = document.querySelector('[data-group][aria-pressed=true]').dataset.group;
  const items = research.filter((r, i) => {
    const inGroup = group === 'all' || r.group === Number(group);
    const searchable = [r.title, ...r.paragraphs, ...Object.values(window.ADAPT_DATA.research[i]), ...Object.values(window.ADAPT_TH.research[i])];
    return inGroup && searchable.join(' ').toLowerCase().includes(query);
  });
  document.querySelector('#research-results').innerHTML = items.length
    ? items.map(researchCard).join('')
    : '<p class="empty">No research topics found. Try another keyword or select all themes.</p>';
  document.querySelector('#research-count').textContent = translate(`${items.length} of ${research.length} research topics`);
  localize(document.querySelector('#research-results'));
}

function study(id) {
  const r = research.find(x => x.id === id);
  if (!r) return notFound();
  const group = groups[r.group - 1];
  return `
    <div class="container">${heading(group, escapeHTML(r.title), '')}</div>
    <article class="article">
      <a class="breadcrumb" href="#research/${r.group}">← Back to ${group.toLowerCase()}</a>
      ${r.paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('')}
      <div class="callout">
        <span class="eyebrow">Connected knowledge</span>
        <p>This research theme also forms part of the planned ADAPT-Nan publication.</p>
        <div class="actions">
          <a class="text-link" href="#resources">View the publication outline ${arrow}</a>
          <a class="text-link" href="#media/${r.id}">Learning media on this topic ${arrow}</a>
        </div>
      </div>
    </article>`;
}

/* ------------------------------------------------------------------ */
/* Learning                                                            */
/* ------------------------------------------------------------------ */

const learningTabs = {university: 'University students', school: 'High school students', community: 'Farmers & communities'};

// Photo slots for the learning pathways. Each slot shows its photos as a
// slideshow; a slot with no photos yet shows a "Photos coming soon" frame.
const learningPhotos = {
  universityOnline: [],
  universityField: [],
  schoolVegetables: [],
  schoolRice: [],
};
const photoSlot = key => {
  const photos = learningPhotos[key];
  if (!photos.length) return '<div class="photo-slot" aria-hidden="true"><span>Photos coming soon</span></div>';
  return gallery(photos, key);
};
const learningContent = {
  university: `
    <span class="badge">University learning</span>
    <h2 style="margin-top:20px">Agroecology, experienced in the field</h2>
    <p>The proposed international BSc curriculum connects foundational learning with an immersive field block in Nan. The curriculum architecture combines 16 hours online with 29 hours in the field: 45 hours and 3 credits.</p>
    <div class="split">
      <div>
        <h3>01 · Prepare online</h3>
        <ul>
          <li>Foundations of agroecology</li>
          <li>Soil, water, and integrated pest management</li>
          <li>Systems thinking and companion modeling</li>
          <li>Community solutions and food systems</li>
        </ul>
        ${photoSlot('universityOnline')}
      </div>
      <div>
        <h3>02 · Learn in Nan</h3>
        <p>Seven days of immersive learning through daily excursions and a cycle of observation, experience, and synthesis. The field block culminates in a multi-stakeholder presentation.</p>
        <p>A group of 30 BSc students from Kasetsart University, Chulalongkorn University, Nan Community College and Rajamangala University of Technology Lanna Nan have enrolled in the field journey and collaborative learning.</p>
        ${photoSlot('universityField')}
      </div>
    </div>
    <div class="callout">
      <h3>Curriculum documents</h3>
      <div class="doc-links">
        <a class="doc-link" href="assets/docs/bsc-curriculum-flyer.pdf" target="_blank" rel="noopener noreferrer">Programme flyer <small>PDF · 899 KB</small></a>
      </div>
    </div>`,
  school: `
    <span class="badge">Secondary education</span>
    <h2 style="margin-top:20px">Learning that starts with curiosity</h2>
    <p>Hands-on workshops introduce high school students to agroecological principles and the socio-ecological questions in their own communities</p>
    <ul>
      <li>Explore safe vegetable production and sustainable food systems</li>
      <li>Learn through simulation games, farm visits, and practical workshops</li>
      <li>Connect teachers and university researchers through co-designed learning activities</li>
    </ul>
    <p class="body-copy">Two integrated curricula were designed together by the teachers of Sattha Sila Phet Rangsan School and university staff, and are taught at the school with support from community resource people. Students first met the approach through role-play games and lectures before experiencing it directly in the vegetable and rice fields.</p>
    <div class="split">
      <div>
        <h3>Safe vegetable production</h3>
        <ul>
          <li>Food security, food safety, and what “safe vegetables” mean for Gen Z</li>
          <li>Surveying local and indigenous vegetables, and market demand near the school</li>
          <li>Seedbeds, growing media, and safe crop care</li>
          <li>Insects, plant diseases, and biological pest management</li>
          <li>Non-turning compost and fermented liquid fertiliser</li>
          <li>Processing, sales planning, and working as a team</li>
        </ul>
        ${photoSlot('schoolVegetables')}
      </div>
      <div>
        <h3>Indigenous rice farming</h3>
        <ul>
          <li>The Sufficiency Economy Philosophy in everyday life</li>
          <li>Thai proverbs and sayings about rice and rice farming</li>
          <li>Thai rice varieties, GI rice, and a rice variety card game</li>
          <li>Grain structure, germination, and seedling growth</li>
          <li>The rice field ecosystem, its pests and natural enemies, through a food web game</li>
          <li>Rice traditions: the buffalo spirit ceremony and the rice destiny ceremony</li>
        </ul>
        ${photoSlot('schoolRice')}
      </div>
    </div>
    <div class="callout">
      <h3>Curriculum documents</h3>
      <p>The high school curriculum documents will be added here.</p>
      <a class="text-link" href="#media">Browse the learning resources ${arrow}</a>
    </div>`,
  community: `
    <span class="badge">Farmers & communities</span>
    <h2 style="margin-top:20px">Local experience, shared possibilities</h2>
    <p>ADAPT-Nan supports knowledge sharing among organic farmer groups, local agricultural networks, educators, and researchers</p>
    <ul>
      <li>Training and counseling to support agroecological transitions</li>
      <li>Participatory workshops and role-play games to explore future farming systems</li>
      <li>Nan Forums and online learning media to connect diverse perspectives</li>
    </ul>
    <div class="learning-centers" data-learning-centers></div>`,
};

function learning(key = 'university') {
  // The former "Learning center" tab now lives at the end of Farmers & communities.
  if (key === 'centers') key = 'community';
  if (!learningContent[key]) key = 'university';
  return `
    <div class="container">
      ${heading('Learning together', 'The landscape is our classroom', 'Experiential education brings scientific knowledge and community wisdom into a shared learning journey.')}
      <div class="filters" aria-label="Choose a learning pathway">
        ${Object.entries(learningTabs).map(([k, label]) => `
          <button class="filter" data-learning="${k}" aria-pressed="${k === key}">${label}</button>`).join('')}
      </div>
      <section class="tabs-content" style="margin-bottom:70px">${learningContent[key]}</section>
    </div>`;
}

/* ------------------------------------------------------------------ */
/* Resources (publication plan and resource collections)               */
/* ------------------------------------------------------------------ */

// Cards on the resources page, in display order. A link starting with "#" stays
// on this website; any other link opens in a new tab. Cards without a link show
// a "Coming soon" badge. Each card has a slideshow of photos.
const resourceCards = [
  {
    title: 'Serious games',
    text: 'Participatory games and facilitation tools for exploring agroecological challenges.',
    link: 'https://gamerepocu.github.io/gamerepocu/',
    linkLabel: 'Explore the game repository',
    photos: [
      ['resources/games-students.jpg', 'Students gathered around a game board during a role-play session'],
      ['resources/games-trays.jpg', 'Students playing a land-use game with coloured trays and cards'],
      ['resources/games-workshop.jpg', 'Workshop participants playing a role-play game on a large board'],
      ['methods/method-explore.jpg', 'Community members seated around a role-play game board during a participatory workshop'],
    ],
  },
  {
    title: 'Learning media',
    text: 'Field experiences, teaching resources, and publications on agroecological transitions.',
    link: '#media',
    linkLabel: 'Find learning resources',
    photos: [
      ['resources/learning-center-visit.jpg', 'Students seated in a circle during a visit to a learning center'],
      ['media/chtn-learning-center.jpg', 'Cover of the Nan Headwaters Community Learning Center brochure'],
      ['media/rice-farmer-field-school.jpg', 'Cover of the Rice Farmer Field School brochure'],
    ],
  },
];
const externalLink = url => `href="${url}" target="_blank" rel="noopener noreferrer"`;

function resourceCard(card, i) {
  const internal = card.link?.startsWith('#');
  const href = internal ? `href="${card.link}"` : card.link && externalLink(card.link);
  const title = card.link ? `<a ${href}>${card.title}</a>` : card.title;
  const action = card.link
    ? `<a class="text-link" ${href}>${card.linkLabel} ${arrow}${internal ? '' : '<span class="sr-only"> (opens in a new tab)</span>'}</a>`
    : '<span class="badge" style="align-self:flex-start">Coming soon</span>';
  return `
    <article class="card resource-card">
      ${gallery(card.photos, `resource-${i}`)}
      <span class="number">0${i + 1} / RESOURCE COLLECTION</span>
      <h3>${title}</h3>
      <p>${card.text}</p>
      ${action}
    </article>`;
}

function resources() {
  return `
    <div class="container">
      ${heading('Knowledge Dissemination', 'Knowledge to grow with', 'Learning resources for teachers, researchers and communities')}
      <section class="book">
        <div class="book-cover" aria-hidden="true">
          <small>ADAPT–NAN<br>PUBLICATION</small>
          <strong>Pathways<br>to agroecology<br>in Nan</strong>
          <small>SCIENCE · PRACTICE · MOVEMENT</small>
        </div>
        <div>
          <span class="badge">Working title</span>
          <h2 style="margin-top:18px">Lessons from agroecological<br>transitions in Nan</h2>
          <p class="book-intro">The ADAPT-Nan publication brings together research on agricultural change, community engagement, and the conditions that support an agroecology movement. Its proposed structure comprises three parts with three chapters each.</p>
          ${groups.map((group, i) => `
            <details>
              <summary>Part ${['I', 'II', 'III'][i]} · ${group}</summary>
              <ol>
                ${research.filter(r => r.group === i + 1).map(r => `
                  <li><a href="#study/${r.id}">${escapeHTML(r.title)} ↗</a></li>`).join('')}
              </ol>
            </details>`).join('')}
        </div>
      </section>
      <div class="grid resource-grid section" style="padding-top:10px">${resourceCards.map(resourceCard).join('')}</div>
    </div>`;
}

/* ------------------------------------------------------------------ */
/* Learning media repository (#media, #media/2-3 for one topic)        */
/* ------------------------------------------------------------------ */
// The resources themselves are listed in content/media.js.

function mediaPage(topic = '') {
  const {types} = window.ADAPT_MEDIA;
  const topicButton = r => `
    <button class="filter" data-media-topic="${r.id}" aria-pressed="${r.id === topic}">${r.number} ${escapeHTML(r.short)}</button>`;
  return `
    <div class="container">
      ${heading('Document repository', 'Find learning resources', 'Field experiences, teaching resources, and publications on agroecological transitions.')}
      <label class="sr-only" for="media-search">Search media, topics or keywords</label>
      <input class="search" id="media-search" type="search" placeholder="Search media, topics or keywords…">
      <div class="filters" aria-label="Filter by media type">
        ${['', ...types].map(type => `
          <button class="filter" data-media-type="${type}" aria-pressed="${!type}">${type || 'All media'}</button>`).join('')}
      </div>
      <div class="topic-filters" aria-label="Filter by research topic">
        <button class="filter" data-media-topic="" aria-pressed="${!topic}">All topics</button>
        ${groups.map((group, i) => `
          <div class="topic-group">
            <span class="topic-group-name">${group}</span>
            ${research.filter(r => r.group === i + 1).map(topicButton).join('')}
          </div>`).join('')}
      </div>
      <p class="result-count" id="media-count" aria-live="polite"></p>
      <div class="grid media-grid" id="media-results"></div>
    </div>`;
}

function mediaCard(item) {
  const external = /^https?:/.test(item.link);
  const target = external ? 'target="_blank" rel="noopener noreferrer"' : 'target="_blank" rel="noopener"';
  const topics = item.topics.map(id => research.find(r => r.id === id)).filter(Boolean);
  return `
    <article class="card media-card">
      <img class="card-photo" src="assets/${item.image}" width="560" height="432" alt="" loading="lazy">
      <div class="media-tags"><span class="badge">${item.type}</span>${topics.map(r => `<span class="topic-tag">${r.number} ${escapeHTML(r.short)}</span>`).join('')}</div>
      <h3>${escapeHTML(item.title)}</h3>
      ${item.place ? `<p class="media-place">${escapeHTML(item.place)}</p>` : ''}
      <p>${escapeHTML(item.summary)}</p>
      <a class="text-link" href="${item.link}" ${target}>${item.linkLabel} ${arrow}${item.size ? ` <small>${item.size}</small>` : ''}<span class="sr-only"> (opens in a new tab)</span></a>
    </article>`;
}

// Re-runs the search and both filters. Matches English and Thai wording.
function updateMedia() {
  const query = document.querySelector('#media-search').value.trim().toLowerCase();
  const type = document.querySelector('[data-media-type][aria-pressed=true]').dataset.mediaType;
  const topic = document.querySelector('[data-media-topic][aria-pressed=true]').dataset.mediaTopic;
  const {items} = window.ADAPT_MEDIA;
  const shown = items.filter(item => {
    const topicWords = item.topics.flatMap(id => {
      const i = window.ADAPT_DATA.research.findIndex(r => r.id === id);
      return i < 0 ? [] : [window.ADAPT_DATA.research[i].short, window.ADAPT_TH.research[i].short];
    });
    const words = [item.title, item.place, item.summary, item.type, ...topicWords].flatMap(w => [w, translate(w || '')]);
    return (!type || item.type === type)
      && (!topic || item.topics.includes(topic))
      && words.join(' ').toLowerCase().includes(query);
  });
  document.querySelector('#media-results').innerHTML = shown.length
    ? shown.map(mediaCard).join('')
    : '<p class="empty">No resources found. Try another keyword, media type, or topic.</p>';
  document.querySelector('#media-count').textContent = translate(`${shown.length} of ${items.length} resources`);
  localize(document.querySelector('#media-results'));
}

/* ------------------------------------------------------------------ */
/* Team: project leader, assistants, then members by institution       */
/* ------------------------------------------------------------------ */
// People, roles, emails, and photos are in content/data.js ("team"), and the
// institution order and logos in content/data.js ("institutions").

function teamPage() {
  return `
    <div class="container">
      ${heading('People & partnerships', 'A connected community', 'Researchers, educators, and practitioners from universities, schools, and partner institutions work together across Nan and beyond.')}
      <label class="sr-only" for="team-search">Search people or institutions</label>
      <input class="search" id="team-search" type="search" placeholder="Search a person or institution…">
      <p class="result-count" id="team-count" aria-live="polite"></p>
      <div id="team-results"></div>
      <section class="contact-panel">
        <span class="eyebrow">Get in touch</span>
        <h2>Questions about the project?</h2>
        <button type="button" class="button" data-open-contact>Contact us <span aria-hidden="true">✉</span></button>
      </section>
      ${partners()}
    </div>`;
}

const avatarFor = ({photo, name}) => `
    <div class="avatar">${photo ? `<img src="${photo}" alt="" loading="lazy">` : `<span aria-hidden="true">${initials(name)}</span>`}</div>`;

// `i` is the person's position in the team list (same in both languages).
// People with a "bio" in content/data.js open a window with their bio when clicked.
function personCard(i) {
  const person = team[i];
  const english = window.ADAPT_DATA.team[i];
  const {role, photo, bio} = english;
  const classes = ['person', (role || photo) && 'person-featured', role === 'leader' && 'person-lead', bio && 'has-bio'].filter(Boolean).join(' ');
  return `
    <article class="${classes}">
      ${role || photo ? avatarFor(english) : ''}
      <div>
        <h3>${bio ? `<button type="button" class="person-open" data-person="${i}">${escapeHTML(person.name)}</button>` : escapeHTML(person.name)}</h3>
        ${role ? `<p>${escapeHTML(person.org)}</p>` : ''}
        ${person.faculty ? `<p>${escapeHTML(person.faculty)}</p>` : ''}
        ${bio ? '<span class="person-more" aria-hidden="true">Read bio →</span>' : ''}
      </div>
    </article>`;
}

function institutionGroup({name, logo}, members) {
  const mark = logo
    ? `<img class="org-logo" src="${logo}" alt="" loading="lazy">`
    : `<span class="org-logo org-logo-text" aria-hidden="true">${initials(name)}</span>`;
  return `
    <section class="org-group">
      <div class="org-head">${mark}<h3>${name}</h3></div>
      <div class="team-grid">${members.map(personCard).join('')}</div>
    </section>`;
}

// Re-runs the team search and redraws the grouped directory.
function updateTeam() {
  const query = document.querySelector('#team-search').value.trim().toLowerCase();
  const english = window.ADAPT_DATA.team;
  const matches = team.map((person, i) => i).filter(i => {
    const searchable = [...Object.values(team[i]), ...Object.values(english[i]), window.ADAPT_TH.names[i], translateInstitution(english[i].org)];
    return searchable.join(' ').toLowerCase().includes(query);
  });
  const withRole = role => matches.filter(i => english[i].role === role);
  const leaders = withRole('leader');
  const assistants = withRole('assistant');
  const members = matches.filter(i => !english[i].role);
  const institutionGroups = window.ADAPT_DATA.institutions
    .map(institution => [institution, members.filter(i => english[i].org === institution.name)])
    .filter(([, ids]) => ids.length);

  let html = '';
  if (leaders.length) html += `
    <section class="team-section">
      <h2 class="team-heading">Project leaders</h2>
      <div class="team-grid featured-grid">${leaders.map(personCard).join('')}</div>
    </section>`;
  if (assistants.length) html += `
    <section class="team-section">
      <h2 class="team-heading">Project assistants</h2>
      <div class="team-grid featured-grid">${assistants.map(personCard).join('')}</div>
    </section>`;
  if (institutionGroups.length) html += `
    <section class="team-section">
      <h2 class="team-heading">Team by institution</h2>
      ${institutionGroups.map(([institution, ids]) => institutionGroup(institution, ids)).join('')}
    </section>`;

  document.querySelector('#team-results').innerHTML = html || '<p class="empty">No people found. Try another name or institution.</p>';
  document.querySelector('#team-count').textContent = translate(`${matches.length} of ${team.length} team members`);
  localize(document.querySelector('#team-results'));
}

/* ------------------------------------------------------------------ */
/* Pop-up windows: a person's bio and the contact form                 */
/* ------------------------------------------------------------------ */

// Messages from the contact form are delivered by FormSubmit (formsubmit.co) to
// this address. The first message triggers a one-time confirmation email to it.
const CONTACT_EMAIL = 'adaptnan@gmail.com';

function openDialog(html, className = '') {
  document.querySelector('dialog.modal')?.remove();
  const dialog = document.createElement('dialog');
  dialog.className = `modal ${className}`;
  dialog.innerHTML = `<button type="button" class="modal-close" aria-label="Close">×</button>${html}`;
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  // A click on the dimmed backdrop (outside the window's box) closes it.
  dialog.addEventListener('click', e => {
    const box = dialog.getBoundingClientRect();
    if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => dialog.remove());
  document.body.append(dialog);
  localize(dialog);
  dialog.showModal();
  return dialog;
}

function openPerson(i) {
  const person = team[i];
  const english = window.ADAPT_DATA.team[i];
  openDialog(`
    <div class="bio">
      ${avatarFor(english)}
      <div>
        <h2>${escapeHTML(person.name)}</h2>
        <p class="bio-org">${escapeHTML(person.org)}${person.faculty ? ` · ${escapeHTML(person.faculty)}` : ''}</p>
      </div>
    </div>
    <p class="bio-text">${escapeHTML(english.bio)}</p>`, 'bio-modal');
}

function openContact() {
  const dialog = openDialog(`
    <h2>Contact us</h2>
    <p class="body-copy">Send a message to the ADAPT-Nan team. We will reply by email.</p>
    <form class="contact-form">
      <label>Your name<input name="name" required autocomplete="name"></label>
      <label>Your email<input name="email" type="email" required autocomplete="email"></label>
      <label>Message<textarea name="message" rows="6" required></textarea></label>
      <input type="text" name="_honey" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button type="submit" class="button">Send message</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>`, 'contact-modal');
  const form = dialog.querySelector('form');
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return;
    form.querySelector('[type=submit]').disabled = true;
    status.textContent = translate('Sending…');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({...data, _subject: 'ADAPT-Nan website message', _template: 'table'}),
      });
      if (!response.ok) throw new Error(response.statusText);
      form.reset();
      status.textContent = translate('Thank you. Your message has been sent.');
    } catch {
      status.textContent = translate('The message could not be sent. Please try again later.');
    }
    form.querySelector('[type=submit]').disabled = false;
  });
}

main.addEventListener('click', e => {
  if (e.target.closest('[data-open-contact]')) return openContact();
  const card = e.target.closest('.has-bio');
  if (card) openPerson(Number(card.querySelector('[data-person]').dataset.person));
});

/* ------------------------------------------------------------------ */
/* Not found                                                           */
/* ------------------------------------------------------------------ */

function notFound() {
  return `
    <div class="container section">
      ${heading('Page not found', 'Let’s get you back to the project.', 'The page you are looking for is not available.')}
      ${button('Back to home', '#home')}
    </div>`;
}

/* ------------------------------------------------------------------ */
/* Back link at the end of every page except home                      */
/* ------------------------------------------------------------------ */
// Each history entry records how many in-site pages precede it, so Back never
// leaves the site: with no earlier page (e.g. a shared link opened directly)
// it goes to the home page instead.

const backButton = '<div class="page-back"><button type="button" class="back-button"><span aria-hidden="true">←</span> Back</button></div>';
let lastDepth = 0;
const depth = () => history.state?.depth ?? lastDepth;
if (!history.state) history.replaceState({depth: 0}, '');

main.addEventListener('click', e => {
  if (!e.target.closest('.back-button')) return;
  if (history.state?.depth > 0) history.back();
  else location.hash = 'home';
});

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

// Browser tab title for each route (translated before use).
const pageTitles = {
  home: 'Growing knowledge, cultivating change',
  about: 'Our project',
  research: 'Research',
  study: 'Research overview',
  learning: 'Learning',
  resources: 'Dissemination',
  media: 'Learning media',
  team: 'People & contact',
};

function render() {
  ({research, team} = localizedData());
  groups = englishGroups.map(translate);
  localizeShell();

  const [route = 'home', param] = (location.hash.slice(1) || 'home').split('/');
  const pages = {
    home,
    about,
    research: () => researchPage(['1', '2', '3'].includes(param) ? param : 'all'),
    study: () => study(param),
    learning: () => learning(param),
    resources,
    media: () => mediaPage(research.some(r => r.id === param) ? param : ''),
    team: teamPage,
  };
  main.innerHTML = (pages[route] || notFound)() + (route === 'home' ? '' : backButton);
  document.title = `${translate(pageTitles[route] || 'Page not found')} — ADAPT-Nan`;

  // Highlight the current section in the main navigation and close the mobile menu.
  const section = {study: 'research', media: 'resources'}[route] || route;
  document.querySelectorAll('nav a').forEach(a => {
    a.removeAttribute('aria-current');
    if (a.hash.slice(1) === section) a.setAttribute('aria-current', 'page');
  });
  closeMenu();

  if (route === 'research') {
    updateResearch();
    document.querySelector('#research-search').addEventListener('input', updateResearch);
    document.querySelectorAll('[data-group]').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('[data-group]').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      updateResearch();
    }));
  }
  if (route === 'media') {
    updateMedia();
    document.querySelector('#media-search').addEventListener('input', updateMedia);
    for (const attr of ['data-media-type', 'data-media-topic']) {
      document.querySelectorAll(`[${attr}]`).forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll(`[${attr}]`).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        updateMedia();
      }));
    }
  }
  if (route === 'team') {
    updateTeam();
    document.querySelector('#team-search').addEventListener('input', updateTeam);
  }
  document.querySelectorAll('[data-learning]').forEach(b => b.addEventListener('click', () => {
    location.hash = `learning/${b.dataset.learning}`;
  }));

  mountGalleries();

  localize(main);
  // The learning-center map renders its own (already bilingual) content.
  const centers = document.querySelector('[data-learning-centers]');
  if (centers) {
    centers.innerHTML = window.NanLearning.html();
    window.NanLearning.mount();
  }
  window.scrollTo(0, 0);
}

/* ------------------------------------------------------------------ */
/* Photo galleries and lightbox                                        */
/* ------------------------------------------------------------------ */

function mountGalleries() {
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const photos = galleryPhotos[gallery.dataset.gallery];
    const slides = [...gallery.querySelectorAll('.gallery-slide')];
    const dots = [...gallery.querySelectorAll('.gallery-dot')];
    const count = gallery.querySelector('.gallery-count');
    let current = 0;

    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const on = i === current;
        slide.classList.toggle('is-current', on);
        slide.toggleAttribute('aria-hidden', !on);
        slide.tabIndex = on ? 0 : -1;
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-current', i === current);
        dot.setAttribute('aria-selected', String(i === current));
      });
      count.textContent = `${current + 1} / ${slides.length}`;
    };

    gallery.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      show(current + Number(button.dataset.step));
    }));
    dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.dot))));
    slides.forEach(slide => slide.addEventListener('click', () => openLightbox(photos, Number(slide.dataset.slide))));

    // Swiping left or right moves between photos on a touch screen.
    let startX = null;
    gallery.addEventListener('touchstart', e => {startX = e.changedTouches[0].clientX;}, {passive: true});
    gallery.addEventListener('touchend', e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, {passive: true});
  });
}

let lightboxPhotos = [];
let lightboxIndex = 0;
let lightboxOpener = null;

function lightboxElement() {
  let box = document.querySelector('.lightbox');
  if (box) return box;
  box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close">×</button>
    <button type="button" class="lightbox-arrow prev" data-step="-1" aria-label="Previous photo">‹</button>
    <figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure>
    <button type="button" class="lightbox-arrow next" data-step="1" aria-label="Next photo">›</button>`;
  box.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  box.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
    showLightbox(lightboxIndex + Number(button.dataset.step));
  }));
  box.addEventListener('click', event => {
    if (event.target === box) closeLightbox();
  });
  document.body.append(box);
  return box;
}

function showLightbox(index) {
  const box = lightboxElement();
  lightboxIndex = (index + lightboxPhotos.length) % lightboxPhotos.length;
  const [src, alt] = lightboxPhotos[lightboxIndex];
  box.querySelector('img').src = `assets/${src}`;
  box.querySelector('img').alt = alt;
  box.querySelector('figcaption').textContent = `${translate(alt)} · ${lightboxIndex + 1} / ${lightboxPhotos.length}`;
}

function openLightbox(photos, index) {
  lightboxPhotos = photos;
  lightboxOpener = document.activeElement;
  const box = lightboxElement();
  box.hidden = false;
  document.body.classList.add('no-scroll');
  showLightbox(index);
  box.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  const box = document.querySelector('.lightbox');
  if (!box || box.hidden) return;
  box.hidden = true;
  document.body.classList.remove('no-scroll');
  lightboxOpener?.focus();
}

/* ------------------------------------------------------------------ */
/* Mobile menu                                                         */
/* ------------------------------------------------------------------ */

function closeMenu() {
  document.querySelector('nav').classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
}

document.querySelector('.menu-toggle').addEventListener('click', e => {
  const open = document.querySelector('nav').classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', e => {
  const box = document.querySelector('.lightbox');
  if (box && !box.hidden) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
    return;
  }
  if (e.key === 'Escape') closeMenu();
});

window.addEventListener('hashchange', () => {
  if (!history.state) history.replaceState({depth: depth() + 1}, '');
  lastDepth = depth();
  // The "Skip to content" link targets #main; move focus instead of re-rendering.
  if (location.hash === '#main') {
    main.focus();
    return;
  }
  render();
  main.focus({preventScroll: true});
});

render();

/* ------------------------------------------------------------------ */
/* Language switch                                                     */
/* ------------------------------------------------------------------ */
// Preserve the current page and search/filter state when changing languages.

document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
  if (language === button.dataset.language) return;
  const search = document.querySelector('input[type="search"]');
  const query = search?.value;
  const group = document.querySelector('[data-group][aria-pressed="true"]')?.dataset.group;
  const mediaFilters = [...document.querySelectorAll('[data-media-type][aria-pressed="true"], [data-media-topic][aria-pressed="true"]')]
    .map(b => [b.hasAttribute('data-media-type') ? 'data-media-type' : 'data-media-topic', b.getAttribute(b.hasAttribute('data-media-type') ? 'data-media-type' : 'data-media-topic')]);
  const expanded = [...document.querySelectorAll('details')].map(d => d.open);
  const scroll = window.scrollY;

  language = button.dataset.language;
  try { localStorage.setItem('adapt-language', language); } catch {}
  render();

  if (query !== undefined) document.querySelector('input[type="search"]').value = query;
  if (group) {
    document.querySelectorAll('[data-group]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.group === group)));
    updateResearch();
  } else if (document.querySelector('#team-search')) {
    updateTeam();
  } else if (document.querySelector('#media-search')) {
    for (const [attr, value] of mediaFilters) {
      document.querySelectorAll(`[${attr}]`).forEach(b => b.setAttribute('aria-pressed', String(b.getAttribute(attr) === value)));
    }
    updateMedia();
  }
  document.querySelectorAll('details').forEach((d, i) => d.open = expanded[i] || false);
  window.scrollTo(0, scroll);
}));
