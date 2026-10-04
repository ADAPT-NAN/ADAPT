/* Nan Learning Centers — local data snapshot; see SOURCES.md. */
window.NanLearning = (() => {
  const {centers: {centers, themes}, boundaries} = window.NAN_LEARNING;
  const state = {query: '', district: '', subdistrict: '', theme: '', course: '', active: null};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = (en, th) => document.documentElement.lang === 'th' ? th : en;
  const name = item => text(item.en || item.th, item.th);
  const themeName = key => text(themes[key][1], themes[key][0]);
  const safeURL = url => /^https?:\/\//i.test(url || '') ? esc(url) : '';
  const project = ([lng, lat]) => [55 + (lng - 100.3) * 360 * Math.cos(19 * Math.PI / 180), 735 - (lat - 18.1) * 360];
  const path = geometry => (geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates).map(poly => poly.map(ring => ring.map((point,i) => `${i ? 'L' : 'M'}${project(point).map(v => v.toFixed(2)).join(',')}`).join(' ') + 'Z').join(' ')).join(' ');
  const provincePoints = boundaries.amp.features.flatMap(f => (f.geometry.type === 'Polygon' ? f.geometry.coordinates : f.geometry.coordinates.flat()).flat()).map(project);
  const xs = provincePoints.map(p => p[0]), ys = provincePoints.map(p => p[1]);
  const fullView = [Math.min(...xs)-28, Math.min(...ys)-28, Math.max(...xs)-Math.min(...xs)+56, Math.max(...ys)-Math.min(...ys)+56];
  const matches = c => (!state.district || c.amp === state.district) && (!state.subdistrict || c.tam === state.subdistrict) && (!state.theme || c.theme === state.theme) && (!state.course || c.course === state.course) && [c.th,c.en,c.d_th,c.d_en,c.amp,c.amp_en,c.tam,c.tam_en,c.course_name].join(' ').toLowerCase().includes(state.query.trim().toLowerCase());
  const where = c => text([c.tam_en || c.tam,c.amp_en || c.amp].filter(Boolean).join(', '), [c.tam && `ต.${c.tam}`,c.amp && `อ.${c.amp}`].filter(Boolean).join(' '));
  function html() {
    return `<div class="lc" data-no-translate>
      <div class="lc-heading"><div><span class="eyebrow">${text('KNOWLEDGE ROOTED IN PLACE','ความรู้ที่หยั่งรากในท้องถิ่น')}</span><h2>${text('Explore Nan’s learning centers','สำรวจศูนย์การเรียนรู้เมืองน่าน')}</h2><p>${text('Discover the people and places sharing a more sustainable way of life. Select a subdistrict or a center to explore.','ค้นพบผู้คนและแหล่งเรียนรู้เพื่อวิถีชีวิตที่ยั่งยืน เลือกตำบลหรือศูนย์การเรียนรู้เพื่อดูรายละเอียด')}</p></div><div class="lc-stats">${[[30,'Centers','ศูนย์'],[15,'Districts','อำเภอ'],[99,'Subdistricts','ตำบล']].map(([n,en,th])=>`<span><strong>${n}</strong>${text(en,th)}</span>`).join('')}</div></div>
      <div class="lc-filters"><label>${text('Search centers','ค้นหาศูนย์')}<input id="lc-search" type="search" placeholder="${text('Name, place or keyword…','ชื่อ สถานที่ หรือคำค้น…')}" value="${esc(state.query)}"></label><label>${text('District','อำเภอ')}<select id="lc-district"><option value="">${text('All districts','ทุกอำเภอ')}</option>${boundaries.amp.features.map(f=>`<option value="${esc(f.properties.th)}" ${state.district===f.properties.th?'selected':''}>${esc(name(f.properties))}</option>`).join('')}</select></label><label>${text('Subdistrict','ตำบล')}<select id="lc-subdistrict"></select></label><label>${text('Courses','หลักสูตร')}<select id="lc-course"><option value="">${text('All centers','ทุกศูนย์')}</option><option value="yes" ${state.course==='yes'?'selected':''}>${text('Has a course','มีหลักสูตร')}</option><option value="planned" ${state.course==='planned'?'selected':''}>${text('Course planned','กำลังทำหลักสูตร')}</option></select></label><button class="text-link lc-reset" type="button">${text('Reset','ล้างตัวกรอง')} ↺</button></div>
      <div class="lc-themes" aria-label="${text('Learning themes','หัวข้อการเรียนรู้')}">${[['',text('All themes','ทุกหัวข้อ')],...Object.keys(themes).map(k=>[k,themeName(k)])].map(([k,n])=>`<button type="button" data-theme="${k}" aria-pressed="${state.theme===k}">${k?`<i style="background:${themes[k][2]}"></i>`:''}${esc(n)}</button>`).join('')}</div>
      <div class="lc-layout"><div class="lc-map-panel"><div class="lc-map-top"><span>${text('NAN PROVINCE','จังหวัดน่าน')}<small>${text('Select a subdistrict to explore','เลือกตำบลเพื่อสำรวจ')}</small></span><span class="lc-north" aria-hidden="true">↑<br>N</span></div><div class="lc-map-wrap"><svg id="lc-map" viewBox="0 0 590 790" role="group" aria-label="${text('Interactive Nan subdistrict map','แผนที่ตำบลในจังหวัดน่านแบบโต้ตอบ')}"></svg></div><div class="lc-map-tools"><button type="button" data-zoom="in" aria-label="${text('Zoom in','ขยายแผนที่')}">+</button><button type="button" data-zoom="out" aria-label="${text('Zoom out','ย่อแผนที่')}">−</button><button type="button" data-zoom="fit">${text('Whole province','ทั้งจังหวัด')}</button></div><div class="lc-legend"><span><i class="lc-boundary-key"></i>${text('Subdistrict boundary','ขอบเขตตำบล')}</span><span><i class="lc-dot-key"></i>${text('Learning center','ศูนย์การเรียนรู้')}</span></div><p class="lc-map-note">${text('Simplified boundaries · Select an area to zoom in.','ขอบเขตโดยสังเขป · เลือกพื้นที่เพื่อขยายแผนที่')}</p></div><aside class="lc-sidebar" aria-label="${text('Learning center results','ผลการค้นหาศูนย์การเรียนรู้')}"><div id="lc-count" role="status" aria-live="polite"></div><div id="lc-detail"></div><div id="lc-results"></div></aside></div>
      <p class="lc-source">${text('Source:','แหล่งข้อมูล:')} <a href="https://dpongchai.github.io/nan-learning-centers/" target="_blank" rel="noopener">Nan Learning Centers ↗</a> · ${text('Data snapshot: 4 October 2026. Details may change; contact the center before visiting.','ข้อมูล ณ วันที่ 4 ตุลาคม 2569 รายละเอียดอาจเปลี่ยนแปลง กรุณาติดต่อศูนย์ก่อนเดินทาง')}</p></div>`;
  }
  function mount() {
    const root = document.querySelector('.lc'); if (!root) return;
    const $ = selector => root.querySelector(selector);
    const svg = $('#lc-map');
    let view = [...fullView];
    function setView(next) { view=next; svg.setAttribute('viewBox',view.join(' ')); svg.style.setProperty('--map-scale', Math.min(1,view[2]/fullView[2])); }
    function fitFeature(feature) {
      if (!feature) { setView([...fullView]); return; }
      const rings=feature.geometry.type==='Polygon'?feature.geometry.coordinates:feature.geometry.coordinates.flat();
      const points=rings.flat().map(project), xs=points.map(p=>p[0]), ys=points.map(p=>p[1]);
      const x=Math.min(...xs)-25,y=Math.min(...ys)-25,w=Math.max(...xs)-x+25,h=Math.max(...ys)-y+25;
      setView([x,y,w,h]);
    }
    function subdistricts() {
      $('#lc-subdistrict').innerHTML=`<option value="">${text('All subdistricts','ทุกตำบล')}</option>`+boundaries.tam.features.filter(f=>!state.district||f.properties.amp===state.district).map(f=>`<option value="${esc(f.properties.amp+'|'+f.properties.th)}" ${state.district===f.properties.amp&&state.subdistrict===f.properties.th?'selected':''}>${esc(name(f.properties))}${state.district?'':' · '+esc(name(boundaries.amp.features.find(a=>a.properties.th===f.properties.amp).properties))}</option>`).join('');
    }
    function detail(c) {
      if(!c) { $('#lc-detail').innerHTML='';return; }
      const fields=[['course_name','Course','หลักสูตร'],['phone','Phone','โทร'],['social','LINE / Facebook','LINE / Facebook'],['hours','Hours','เวลาเปิด'],['booking','Booking','การจอง'],['fee','Fee','ค่าใช้จ่าย']].filter(([key])=>c[key]);
      const mapURL=safeURL(c.map_url)||(c.lat!=null&&c.lng!=null?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.lat+','+c.lng)}`:'');
      $('#lc-detail').innerHTML=`<article class="lc-detail" tabindex="-1"><button type="button" class="lc-close" aria-label="${text('Close center details','ปิดรายละเอียด')}">×</button><span class="eyebrow">${esc(themeName(c.theme))}</span><h3>${esc(name(c))}</h3><p class="lc-location">${esc(where(c))}</p>${c.course==='yes'||c.course==='planned'?`<span class="badge">${c.course==='yes'?text('Has a course','มีหลักสูตร'):text('Course planned','กำลังทำหลักสูตร')}</span>`:''}<p>${esc(text(c.d_en||c.d_th,c.d_th)||text('No description available yet.','ยังไม่มีคำอธิบาย'))}</p>${safeURL(c.photo)?`<img class="lc-photo" src="${safeURL(c.photo)}" alt="${esc(name(c))}" loading="lazy">`:''}${fields.length?`<dl>${fields.map(([key,en,th])=>`<dt>${text(en,th)}</dt><dd>${safeURL(c[key])?`<a href="${safeURL(c[key])}" target="_blank" rel="noopener">${esc(c[key])}</a>`:esc(c[key])}</dd>`).join('')}</dl>`:''}${c.visit_note?`<p>${esc(c.visit_note)}</p>`:''}<div class="actions">${mapURL?`<a class="button" href="${mapURL}" target="_blank" rel="noopener">${text('Open in Google Maps','เปิดใน Google Maps')} ↗</a>`:''}${safeURL(c.more_url)?`<a class="text-link" href="${safeURL(c.more_url)}" target="_blank" rel="noopener">${text('More information','ข้อมูลเพิ่มเติม')} ↗</a>`:''}</div></article>`;
      $('.lc-close').onclick=()=>{state.active=null;update();};
    }
    function selectCenter(id) { state.active=id;update();$('.lc-detail').focus({preventScroll:true});$('.lc-detail').scrollIntoView({block:'nearest',behavior:'instant'}); }
    function update() {
      const visible=centers.filter(matches);
      if(!visible.some(c=>c.id===state.active))state.active=null;
      $('#lc-count').textContent=text(`${visible.length} of ${centers.length} learning centers`,`${visible.length} จาก ${centers.length} ศูนย์การเรียนรู้`);
      $('#lc-results').innerHTML=visible.length?visible.map(c=>`<button type="button" class="lc-result" data-center="${esc(c.id)}" aria-pressed="${state.active===c.id}"><i style="background:${themes[c.theme][2]}"></i><span><strong>${esc(name(c))}</strong><small>${esc(where(c))}</small><small>${esc(themeName(c.theme))}${c.course==='yes'?' · '+text('Has a course','มีหลักสูตร'):''}</small></span><span aria-hidden="true">↗</span></button>`).join(''):`<p class="lc-empty">${text('No centers match this selection. Try another subdistrict or reset the filters.','ไม่พบศูนย์ในพื้นที่หรือตัวกรองที่เลือก ลองเลือกตำบลอื่นหรือล้างตัวกรอง')}</p>`;
      svg.innerHTML=`<g class="lc-areas">${boundaries.tam.features.map((f,i)=>{const p=f.properties;const count=visible.filter(c=>c.amp===p.amp&&c.tam===p.th).length;const selected=state.district===p.amp&&state.subdistrict===p.th;return `<path d="${path(f.geometry)}" fill-rule="evenodd" class="lc-area${count?' has-centers':''}${selected?' selected':''}" data-area="${i}" tabindex="0" role="button" aria-pressed="${selected}" aria-label="${esc(name(p))}: ${count} ${text('centers','ศูนย์')}"><title>${esc(name(p))} · ${count} ${text('centers','ศูนย์')}</title></path>`;}).join('')}</g><g class="lc-district-outlines" aria-hidden="true">${boundaries.amp.features.map(f=>`<path d="${path(f.geometry)}"/>`).join('')}</g><g class="lc-district-labels" aria-hidden="true">${boundaries.amp.features.map(f=>{const [x,y]=project([f.properties.lab[1],f.properties.lab[0]]);return `<text x="${x}" y="${y}">${esc(name(f.properties))}</text>`;}).join('')}</g><g>${visible.filter(c=>c.lat!=null&&c.lng!=null).map(c=>{const [x,y]=project([c.lng,c.lat]);return `<g class="lc-marker${state.active===c.id?' active':''}" data-center="${esc(c.id)}" tabindex="0" role="button" aria-label="${esc(name(c))}" aria-pressed="${state.active===c.id}" transform="translate(${x},${y})"><title>${esc(name(c))}</title><circle r="${state.active===c.id?10:7}" fill="${themes[c.theme][2]}"/><circle r="2" fill="white"/></g>`;}).join('')}</g>`;
      detail(visible.find(c=>c.id===state.active));
      root.querySelectorAll('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===state.theme)));
    }
    root.addEventListener('click',e=>{
      const center=e.target.closest('[data-center]');if(center){selectCenter(center.dataset.center);return;}
      const area=e.target.closest('[data-area]');if(area){const f=boundaries.tam.features[Number(area.dataset.area)];state.district=f.properties.amp;state.subdistrict=f.properties.th;$('#lc-district').value=state.district;subdistricts();fitFeature(f);update();return;}
      const theme=e.target.closest('[data-theme]');if(theme){state.theme=theme.dataset.theme;update();}
      const zoom=e.target.closest('[data-zoom]');if(zoom){if(zoom.dataset.zoom==='fit'){setView([...fullView]);return;}const factor=zoom.dataset.zoom==='in'?.75:1.333333;if(view[2]*factor<35||view[2]*factor>1300)return;setView([view[0]+view[2]*(1-factor)/2,view[1]+view[3]*(1-factor)/2,view[2]*factor,view[3]*factor]);}
    });
    svg.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-area],[data-center]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
    $('#lc-search').oninput=e=>{state.query=e.target.value;update();};
    $('#lc-district').onchange=e=>{state.district=e.target.value;state.subdistrict='';subdistricts();fitFeature(boundaries.amp.features.find(f=>f.properties.th===state.district));update();};
    $('#lc-subdistrict').onchange=e=>{const [amp,tam]=e.target.value.split('|');state.subdistrict=tam||'';if(amp)state.district=amp;$('#lc-district').value=state.district;subdistricts();fitFeature(state.subdistrict?boundaries.tam.features.find(f=>f.properties.th===state.subdistrict&&f.properties.amp===state.district):boundaries.amp.features.find(f=>f.properties.th===state.district));update();};
    $('#lc-course').onchange=e=>{state.course=e.target.value;update();};
    $('.lc-reset').onclick=()=>{Object.assign(state,{query:'',district:'',subdistrict:'',theme:'',course:'',active:null});$('#lc-search').value='';$('#lc-district').value='';$('#lc-course').value='';subdistricts();setView([...fullView]);update();};
    subdistricts();fitFeature(state.subdistrict?boundaries.tam.features.find(f=>f.properties.th===state.subdistrict&&f.properties.amp===state.district):boundaries.amp.features.find(f=>f.properties.th===state.district));update();
  }
  return {html,mount};
})();
