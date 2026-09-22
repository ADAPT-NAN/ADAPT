// Keep the authored English templates and translate their text nodes and
// accessible labels. The original values are retained for reversible switching.
let language='en';
try { language=localStorage.getItem('adapt-language')==='th'?'th':'en'; } catch {}
const originalText=new WeakMap();
const originalAttributes=new WeakMap();
// Exact matches first; otherwise ignore case, spacing and trailing punctuation so
// small edits to the English copy (e.g. removing a final period) keep their translation.
const normalizeKey=s=>s.trim().replace(/\s+/g,' ').replace(/[.,:;!]+$/,'').toLowerCase();
let normalizedTranslations;
function lookup(key){
  if(Object.hasOwn(window.ADAPT_TRANSLATIONS,key))return window.ADAPT_TRANSLATIONS[key];
  normalizedTranslations??=new Map(Object.entries(window.ADAPT_TRANSLATIONS).map(([en,th])=>[normalizeKey(en),th]));
  return normalizedTranslations.get(normalizeKey(key));
}
function translate(text){
  if(language!=='th')return text;
  const key=text.trim();
  let translated=lookup(key);
  if(translated===undefined){
    translated=key.replace(/^(\d+) of (\d+) research topics$/, '$1 จาก $2 ประเด็นวิจัย')
      .replace(/^(\d+) of (\d+) team members$/, '$1 จาก $2 สมาชิกทีมงาน')
      .replace(/^(\d+) \/ RESEARCH THEME$/, '$1 / ประเด็นวิจัย')
      .replace(/^(\d+) \/ RESOURCE COLLECTION$/, '$1 / คลังความรู้')
      .replace(/^Part (I|II|III) · /, 'ส่วนที่ $1 · ')
      .replace(/^← Back to /, '← กลับไปที่ ');
    for(const [en,th] of Object.entries(window.ADAPT_TRANSLATIONS)){
      if(['Agrarian change','Social engagement','Agroecology emergence'].includes(en)){
        translated=translated.replace(en.toUpperCase(),th).replace(en.toLowerCase(),th);
      }
    }
  }
  return text.replace(key,translated);
}
function localize(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    if(node.parentElement.closest('script,style,[data-no-translate]'))continue;
    if(!originalText.has(node))originalText.set(node,node.nodeValue);
    node.nodeValue=translate(originalText.get(node));
  }
  const elements=[...(root.nodeType===1?[root]:[]),...root.querySelectorAll('[alt],[aria-label],[placeholder]')];
  for(const el of elements){
    if(el.closest('[data-no-translate]'))continue;
    if(!originalAttributes.has(el))originalAttributes.set(el,{});
    const originals=originalAttributes.get(el);
    for(const attr of ['alt','aria-label','placeholder']){
      if(el.hasAttribute(attr)){
        if(!(attr in originals))originals[attr]=el.getAttribute(attr);
        el.setAttribute(attr,translate(originals[attr]));
      }
    }
  }
}
function localizedData(){
  const original=window.ADAPT_DATA;
  if(language==='en')return original;
  return {
    research:original.research.map((r,i)=>({...r,...window.ADAPT_TH.research[i]})),
    team:original.team.map((p,i)=>({...p,name:window.ADAPT_TH.names[i],org:translate(p.org),faculty:translate(p.faculty)}))
  };
}
function localizeShell(){
  document.documentElement.lang=language;
  for(const selector of ['.site-header','.skip','footer'])localize(document.querySelector(selector));
  document.querySelector('meta[name="description"]').content=translate('ADAPT-Nan connects participatory research, experiential learning and local knowledge to advance agroecology in Nan Province, Thailand.');
  document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
}
