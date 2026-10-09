const {chromium}=require('playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const projects=JSON.parse(fs.readFileSync(root+'/src/content/projects.json'));
const categories=JSON.parse(fs.readFileSync(root+'/src/content/categories.json'));
const experiences=JSON.parse(fs.readFileSync(root+'/src/content/experience.json'));
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const base=process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4321';
 const routes=['/','/education/','/experience/','/projects/','/dashboards/',...categories.map(c=>`/projects/category/${c.id}/`),...projects.map(p=>`/projects/${p.id}/`)];
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:900});
  for(const route of routes){
   const r=await page.goto(base+route);assert.equal(r.status(),200,route);await page.locator('main h1').waitFor();
   assert.equal(await page.locator('main h1').count(),1,route);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${width} ${route}`);
   assert.equal(await page.locator('#project-categories a').count(),3);
   assert.equal(await page.locator('#main-navigation a[aria-current=page]').count(),1,route);
  }
  console.log(`PASS ${routes.length} routes and no overflow at ${width}px`);
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/projects/');await page.locator('main h1').waitFor();
 assert.equal(await page.locator('.project-card').count(),projects.length);
 await page.locator('.projects-nav').hover();await page.waitForFunction(()=>!document.querySelector('#project-categories').hidden);
 assert.deepEqual(await page.locator('#project-categories a').allTextContents(),categories.map(c=>c.label));
 await page.locator('#project-categories a').nth(1).click();await page.waitForURL('**/category/data-science/');assert.equal(await page.locator('.project-card').count(),projects.filter(p=>p.category==='data-science').length);
 await page.mouse.move(0,0);await page.locator('.projects-toggle').focus();await page.keyboard.press('ArrowDown');assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),categories[0].label);
 await page.keyboard.press('ArrowDown');assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),categories[1].label);
 await page.keyboard.press('Escape');assert.equal(await page.locator('.projects-toggle').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('.projects-toggle').evaluate(e=>e===document.activeElement),true);
 for(const category of categories){await page.goto(base+`/projects/category/${category.id}/`);await page.locator('main h1').waitFor();assert.equal(await page.locator('.project-card').count(),projects.filter(p=>p.category===category.id).length);}
 console.log('PASS desktop dropdown hover, keyboard, Escape, category navigation and unique filtering');
 await page.goto(base+'/experience/');await page.locator('main h1').waitFor();const originalUrl=page.url();
 for(const experience of experiences){await page.locator(`[data-experience="${experience.id}"]`).click();assert.equal(await page.locator('#experience-panel h2').innerText(),experience.company);assert.equal(page.url(),originalUrl);assert.equal(await page.locator('[role=tab][aria-selected=true]').count(),1);}
 await page.locator('[role=tab]').first().focus();await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#experience-panel h2').innerText(),experiences[1].company);
 console.log('PASS four internship selections and keyboard selection without navigation');
 // A shorter desktop viewport lets intermediate anchors reach the reading line despite compact final resources.
 await page.setViewportSize({width:1440,height:450});await page.goto(base+'/projects/ecommerce-growth/');await page.locator('main h1').waitFor();await page.evaluate(()=>window.scrollTo(0,0));
 await page.waitForFunction(()=>document.querySelector('[data-section-link][aria-current=location]')?.dataset.sectionLink==='overview');
 const sectionIds=await page.locator('.case-section').evaluateAll(els=>els.map(e=>e.id));assert.deepEqual(await page.locator('[data-section-link]').evaluateAll(els=>els.map(e=>e.dataset.sectionLink)),sectionIds);
 for(const id of sectionIds){await page.locator(`#${id}`).evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));await page.waitForFunction(id=>document.querySelector('[data-section-link][aria-current=location]')?.dataset.sectionLink===id,id);}
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-section-link="methodology"]').click();await page.waitForFunction(()=>document.querySelector('[data-section-link][aria-current=location]')?.dataset.sectionLink==='methodology');assert.equal(await page.locator('.case-section').count(),sectionIds.length);
 console.log('PASS continuous content, dynamic TOC, scroll highlighting and click-to-scroll');
 await page.goto(base+'/dashboards/');await page.locator('main h1').waitFor();assert.equal(await page.locator('[data-dashboard="advertising-abtest"]').count(),1);assert.equal(await page.locator('a[download]').count(),1);assert.equal(await page.locator('[data-dashboard="ecommerce-tableau"] .project-placeholder').count(),1);
 await page.goto(base+'/projects/advertising-ab-testing/');await page.locator('main h1').waitFor();assert.equal(await page.locator('[data-dashboard="advertising-abtest"]').count(),1);assert.equal(await page.locator('[data-dashboard="ecommerce-tableau"]').count(),0);
 console.log('PASS shared dashboard references and screenshot-only fallback');
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/');await page.locator('main h1').waitFor();
 const order=await page.evaluate(()=>['.hero-copy','.hero-actions','.hero-social','.hero-photo'].map(s=>document.querySelector(s).getBoundingClientRect().top));assert.ok(order.every((v,i)=>!i||v>order[i-1]));assert.equal(await page.locator('.hero-actions a').count(),0);
 for(const e of await page.locator('.hero-social a').all())assert.ok((await e.boundingBox()).height>=44);
 await page.locator('.menu-toggle').click();await page.locator('.projects-toggle').click();assert.equal(await page.locator('.projects-toggle').getAttribute('aria-expanded'),'true');await page.locator('#project-categories a').last().click();await page.waitForURL('**/category/product-ai/');
 await page.goto(base+'/experience/');await page.locator('main h1').waitFor();await page.locator('#experience-select').selectOption('nielseniq');assert.equal(await page.locator('#experience-panel h2').innerText(),'NielsenIQ (GfK)');
 console.log('PASS mobile contact-before-photo order, tap sizes, dropdown and internship select');
 await page.goto(base+'/projects/starshow/');assert.equal(await page.locator('img[src$="/images/projects/starshow.png"]').count(),1);
 for(const route of ['/projects/creator-shortlisting/','/projects/conversational-ai-agent/','/projects/starshow/','/dashboards/','/']){await page.goto(base+route);assert.equal(await page.locator('main a[href*="youtu.be"], main a[href*="public.tableau.com"], main a[href*="linkedin.com"], main a[href*="zz10965-alt.github.io"]').count(),0);}
 const paths=new Set();
 for(const route of routes){await page.goto(base+route);await page.locator('main h1').waitFor();for(const path of await page.locator('main a[href], main img[src]').evaluateAll(els=>els.map(e=>e.getAttribute('href')||e.getAttribute('src')))){if(path?.startsWith('/')&&!path.startsWith('//'))paths.add(path.split('#')[0]);}}
 for(const path of paths){const response=await page.request.get(new URL(path,base).href);assert.equal(response.status(),200,path);}
 for(const project of projects)for(const resource of project.resources){if(resource.url.startsWith('/'))continue;const url=new URL(resource.url);if(url.pathname.includes('/Data_Project/blob/main/')){const relative=decodeURIComponent(url.pathname.split('/blob/main/')[1]);assert.ok(relative.endsWith('.ipynb'),'notebook URL '+relative);}}
 assert.deepEqual(errors,[]);console.log(`PASS ${paths.size} local resource destinations, supplied notebook paths, no browser page errors`);
 const screenshotDir=process.env.PORTFOLIO_SCREENSHOT_DIR || path.join(root,'node_modules','.cache','review-screenshots');
 fs.mkdirSync(screenshotDir,{recursive:true});
 const shots=[['/','home'],['/education/','education'],['/experience/','experience'],['/projects/','projects'],['/projects/ecommerce-growth/','project-detail'],['/dashboards/','dashboards']];
 for(const [width,device] of [[1440,'desktop'],[390,'mobile']]){await page.setViewportSize({width,height:1000});for(const [route,name] of shots){await page.goto(base+route);await page.locator('main h1').waitFor();await page.screenshot({path:path.join(screenshotDir,`${name}-${device}.png`),fullPage:true});}}
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/projects/');await page.locator('.projects-nav').hover();await page.screenshot({path:path.join(screenshotDir,'projects-dropdown-desktop.png')});
 console.log('PASS captured 13 review screenshots');await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
