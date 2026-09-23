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
  ['✳', 'Participatory research', 'Knowledge created together'],
  ['⌁', 'Experiential learning', 'Learning through doing'],
  ['❋', 'Community engagement', 'Change grounded in place'],
];
// One entry per research group, in the same order as englishGroups.
const themes = [
  {icon: '⌁', text: 'Understanding agricultural transformations, environmental pressures, and the connections between forests and farming.'},
  {icon: '✳', text: 'Exploring organic farming networks, Nan’s native red cows, and young people’s engagement with biodiversity.'},
  {icon: '❋', text: 'Learning from local centers, civil society, and experiential education to support an agroecology movement.'},
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
        <div class="hero-note">Agroecology development in Nan, Thailand</div>
      </div>
      <div class="hero-art">
        <img src="assets/landscape.svg" alt="Illustrated mountain landscape with terraced fields and a farm house">
        <span class="art-label">NAN PROVINCE · THAILAND</span>
        <div class="art-caption">
          <span>A future rooted in living landscapes</span>
          <span>Landscape illustration</span>
        </div>
      </div>
    </section>
    <div class="principles">
      ${principles.map(([icon, title, note]) => `
        <div>
          <span aria-hidden="true">${icon}</span>
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
          <article class="card">
            <span class="number">0${i + 1} / RESEARCH THEME</span>
            <span class="icon" aria-hidden="true">${themes[i].icon}</span>
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
          <h2>From shared knowledge<br>to lived experience.</h2>
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
  ['Observe & listen', 'Direct observation, interviews, and focus groups bring different perspectives into the conversation.'],
  ['Explore together', 'Role-play games and participatory workshops help people explore complex systems and possible futures.'],
  ['Learn through practice', 'Field learning connects scientific ideas with community experience and intergenerational knowledge.'],
];

function about() {
  return `
    <div class="container">
      ${heading('Our project', 'A transition grown together', 'ADAPT-Nan: Advances the Development of Agroecology in Nan Province, Thailand through participatory research and experiential education')}
      <div class="split section" style="padding-top:10px">
        <div>
          <h2>Science meets<br>local wisdom</h2>
          <p class="body-copy">Our work connects researchers, educators, young people, and farming communities. Together, they explore a transition from chemical-intensive monocultures toward integrated, sustainable farming systems.</p>
          <p class="body-copy">By valuing farmer knowledge alongside scientific approaches, the project supports the co-creation of knowledge that people can put into practice.</p>
        </div>
        <div class="callout">
          <span class="eyebrow">Our purpose</span>
          <h3>Support the people shaping agroecology’s future</h3>
          <p>Promote participatory research and transformative teaching through co-designed experiential learning.</p>
          <p lang="th"></p>
        </div>
      </div>
      <section class="section">
        <span class="eyebrow">How we work</span>
        <div class="grid">
          ${workingMethods.map(([title, text]) => `
            <div>
              <h3>${title}</h3>
              <p class="body-copy">${text}</p>
            </div>`).join('')}
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
      ${heading('Our research', 'Many perspectives<br>One living landscape', 'Explore nine connected areas of research across agricultural change, social engagement, and the emergence of agroecology.')}
      <label class="sr-only" for="research-search">Search research topics</label>
      <input class="search" id="research-search" type="search" placeholder="Search research topics…">
      <div class="filters" aria-label="Filter research themes">
        ${['All themes', ...groups].map((label, i) => `
          <button class="filter" data-group="${i || 'all'}" aria-pressed="${String(group) === String(i || 'all')}">${label}</button>`).join('')}
      </div>
      <p class="result-count" id="research-count" aria-live="polite"></p>
      <div class="grid research-grid" id="research-results"></div>
      <div class="section"><a class="text-link" href="#resources">Explore the 2026 publication plan ${arrow}</a></div>
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
        <a class="text-link" href="#resources">View the publication outline ${arrow}</a>
      </div>
    </article>`;
}

/* ------------------------------------------------------------------ */
/* Learning                                                            */
/* ------------------------------------------------------------------ */

const learningTabs = {university: 'University', school: 'High school', community: 'Farmers & communities'};
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
          <li>Sustainable practices: soil, water, and integrated pest management</li>
          <li>Systems thinking and companion modeling</li>
          <li>Community solutions and food systems</li>
        </ul>
      </div>
      <div>
        <h3>02 · Learn in Nan</h3>
        <p>Seven days of immersive learning through daily excursions and a cycle of observation, experience, and synthesis. The field block culminates in a multi-stakeholder presentation.</p>
        <span class="badge">Enrollment information coming soon</span>
      </div>
    </div>
    <img class="wide-image" src="assets/image3.png" width="1376" height="739" alt="Curriculum architecture: four weeks of online preparation totaling 16 hours, followed by a 29-hour intensive field block across seven days in Nan. Learning follows an observe, embody, and synthesize cycle.">
    <p class="result-count">Curriculum architecture from the ADAPT-Nan website planning document.</p>`,
  school: `
    <span class="badge">Secondary education</span>
    <h2 style="margin-top:20px">Learning that starts with curiosity</h2>
    <p>Hands-on workshops introduce high school students to agroecological principles and the socio-ecological questions in their own communities</p>
    <ul>
      <li>Explore safe vegetable production and sustainable food systems</li>
      <li>Learn through simulation games, farm visits, and practical workshops</li>
      <li>Connect teachers and university researchers through co-designed learning activities</li>
    </ul>
    <div class="callout">
      <h3>Safe Vegetable Curriculum</h3>
      <p>The curriculum document, classroom materials, photographs, and videos are coming soon.</p>
    </div>`,
  community: `
    <span class="badge">Farmers & communities</span>
    <h2 style="margin-top:20px">Local experience,<br>Shared possibilities</h2>
    <p>ADAPT-Nan supports knowledge sharing among organic farmer groups, local agricultural networks, educators, and researchers</p>
    <ul>
      <li>Training and counseling to support agroecological transitions</li>
      <li>Participatory workshops and role-play games to explore future farming systems</li>
      <li>Nan Forums and online learning media to connect diverse perspectives</li>
    </ul>
    <div class="callout">
      <h3>Learning with communities</h3>
      <p>Workshop schedules and learning resources are coming soon.</p>
    </div>`,
};

function learning(key = 'university') {
  if (!learningContent[key]) key = 'university';
  return `
    <div class="container">
      ${heading('Learning together', 'The landscape is<br>our classroom', 'Experiential education brings scientific knowledge and community wisdom into a shared learning journey.')}
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

// Cards on the resources page, in display order. Give a card a `link` once
// its content is online; cards without one show a "Coming soon" badge.
const resourceCards = [
  {title: 'Serious games', text: 'Participatory games and facilitation tools for exploring agroecological challenges.', link: 'https://gamerepocu.github.io/gamerepocu/', linkLabel: 'Explore the game repository'},
  {title: 'Videos & learning media', text: 'Field experiences, teaching resources, and video learning modules.'},
  {title: 'Publication library', text: 'Research articles and publications on agroecological transitions.'},
];
const externalLink = url => `href="${url}" target="_blank" rel="noopener noreferrer"`;

function resourceCard(card, i) {
  const title = card.link ? `<a ${externalLink(card.link)}>${card.title}</a>` : card.title;
  const action = card.link
    ? `<a class="text-link" ${externalLink(card.link)}>${card.linkLabel} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`
    : '<span class="badge" style="align-self:flex-start">Coming soon</span>';
  return `
    <article class="card">
      <span class="number">0${i + 1} / RESOURCE COLLECTION</span>
      <h3>${title}</h3>
      <p>${card.text}</p>
      ${action}
    </article>`;
}

function resources() {
  return `
    <div class="container">
      ${heading('Knowledge & Dissemination', 'Knowledge to grow with', 'Explore the planned publication and the learning resources being prepared for teachers, researchers, and communities.')}
      <section class="book">
        <div class="book-cover" aria-hidden="true">
          <small>ADAPT–NAN<br>PUBLICATION PLAN · 2026</small>
          <strong>Pathways<br>to agroecology<br>in Nan</strong>
          <small>SCIENCE · PRACTICE · MOVEMENT</small>
        </div>
        <div>
          <span class="badge">Planned publication · Working title</span>
          <h2 style="margin-top:18px">Lessons from agroecological<br>transitions in Nan</h2>
          <p>The 2026 publication plan brings together research on agricultural change, community engagement, and the conditions that support an agroecology movement. Its proposed structure comprises three parts with three chapters each.</p>
          <p>The book title and final publication details are still to be confirmed</p>
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
      <div class="grid section" style="padding-top:10px">${resourceCards.map(resourceCard).join('')}</div>
    </div>`;
}

/* ------------------------------------------------------------------ */
/* Team: project leader, assistants, then members by institution       */
/* ------------------------------------------------------------------ */
// People, roles, emails, and photos are in content/data.js ("team"), and the
// institution order and logos in content/data.js ("institutions").

function teamPage() {
  return `
    <div class="container">
      ${heading('People & partnerships', 'A shared journey<br>A connected community', 'Researchers, educators, and practitioners from universities, schools, and partner institutions work together across Nan and beyond.')}
      <label class="sr-only" for="team-search">Search people or institutions</label>
      <input class="search" id="team-search" type="search" placeholder="Search a person or institution…">
      <p class="result-count" id="team-count" aria-live="polite"></p>
      <div id="team-results"></div>
      <section class="contact-panel">
        <span class="eyebrow">Get in touch</span>
        <h2>More project information:<br>Dr. Jean-Christophe Castella</h2>
        <a class="contact-email" href="mailto:j.castella@ird.fr"><span aria-hidden="true">✉</span>j.castella@ird.fr</a>
      </section>
    </div>`;
}

// `i` is the person's position in the team list (same in both languages).
function personCard(i) {
  const person = team[i];
  const {role, photo, email, name} = window.ADAPT_DATA.team[i];
  const avatar = !role ? '' : `
    <div class="avatar">${photo ? `<img src="${photo}" alt="" loading="lazy">` : `<span aria-hidden="true">${initials(name)}</span>`}</div>`;
  const classes = ['person', role && 'person-featured', role === 'leader' && 'person-lead'].filter(Boolean).join(' ');
  return `
    <article class="${classes}">
      ${avatar}
      <div>
        ${role === 'leader' ? '<span class="eyebrow">Project leader</span>' : ''}
        <h3>${escapeHTML(person.name)}</h3>
        ${role ? `<p>${escapeHTML(person.org)}</p>` : ''}
        ${person.faculty ? `<p>${escapeHTML(person.faculty)}</p>` : ''}
        ${email ? `<a class="person-email" href="mailto:${email}" data-no-translate>${email}</a>` : ''}
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
  if (leaders.length) html += `<section class="team-section">${leaders.map(personCard).join('')}</section>`;
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
    team: teamPage,
  };
  main.innerHTML = (pages[route] || notFound)() + (route === 'home' ? '' : backButton);
  document.title = `${translate(pageTitles[route] || 'Page not found')} — ADAPT-Nan`;

  // Highlight the current section in the main navigation and close the mobile menu.
  const section = route === 'study' ? 'research' : route;
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
  if (route === 'team') {
    updateTeam();
    document.querySelector('#team-search').addEventListener('input', updateTeam);
  }
  document.querySelectorAll('[data-learning]').forEach(b => b.addEventListener('click', () => {
    location.hash = `learning/${b.dataset.learning}`;
  }));

  localize(main);
  window.scrollTo(0, 0);
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
  }
  document.querySelectorAll('details').forEach((d, i) => d.open = expanded[i] || false);
  window.scrollTo(0, scroll);
}));
