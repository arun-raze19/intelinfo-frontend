// Dynamically load external scripts
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.type = 'module'
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}

export function startBooyahBackground(canvasId = 'main-canvas') {
  // Create a shadow root script that runs the provided animation using module imports
  const code = `
    import canvasManager from 'https://cdn.jsdelivr.net/gh/gh-o-st/utilities@stable/canvasmanager.js';
    import Color from 'https://cdn.jsdelivr.net/gh/gh-o-st/utilities@stable/color.js';

    const CONFIG = { ROW_HEIGHT: 12, MIN_RECT_WIDTH: 20, MAX_RECT_WIDTH: 350, MIN_DURATION_SECONDS: 0.4, MAX_DURATION_SECONDS: 15, HYPERSPEED_DURATION_THRESHOLD: 0.8, BACKGROUND_COLOR: null, HYPERSPEED_BLUR_COLOR: null, PALETTE: [] };
    const THEMES = [
      { name: 'Royal', generator: () => { CONFIG.BACKGROUND_COLOR = new Color(20, 15, 40); CONFIG.HYPERSPEED_BLUR_COLOR = new Color(255, 220, 150, 0.15); CONFIG.PALETTE = [ Color.fromString('hsv(45, 80%, 95%)'), Color.fromString('hsl(270, 50%, 40%)'), Color.fromString('hsl(340, 45%, 35%)'), Color.fromString('hsl(275, 50%, 70%)') ]; } },
      { name: 'Cyberpunk', generator: () => { CONFIG.BACKGROUND_COLOR = new Color(10, 5, 25); CONFIG.HYPERSPEED_BLUR_COLOR = new Color(255, 105, 180, 0.15); CONFIG.PALETTE = [ Color.fromString('hsl(320, 100%, 60%)'), Color.fromString('hsl(180, 100%, 50%)'), Color.fromString('hsl(55, 100%, 55%)') ]; } },
      { name: 'Cosmic Rainbow', generator: () => { CONFIG.BACKGROUND_COLOR = new Color(0,0,0); CONFIG.HYPERSPEED_BLUR_COLOR = new Color(255,255,255,0.1); CONFIG.PALETTE = []; for (let i=0;i<360;i+=40){ CONFIG.PALETTE.push(new Color().setHsl(i,100,60)); } } },
      { name: 'Tron', generator: () => { const baseColor = new Color(0,0,0).setOklch(0.65,0.15,245); CONFIG.BACKGROUND_COLOR = new Color(5,8,12); CONFIG.HYPERSPEED_BLUR_COLOR = new Color(50,255,255,0.15); CONFIG.PALETTE = [ baseColor, baseColor.clone().darken(15).desaturate(5), baseColor.clone().shift(160).saturate(10), baseColor.clone().shift(-40).lighten(15).desaturate(20), baseColor.clone().darken(35) ]; } },
    ];
    let currentThemeIndex = 0;
    const EASING_FUNCTIONS = { linear: t=>t, easeInQuad:t=>t*t, easeOutQuad:t=>t*(2-t), easeInOutQuad:t=>t<0.5?2*t*t:-1+(4-2*t)*t, easeInCubic:t=>t*t*t, easeOutCubic:t=>(--t)*t*t+1, easeInOutCubic:t=>t<0.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1, easeInQuart:t=>t*t*t*t, easeOutQuart:t=>1-(--t)*t*t*t };
    let canvas, ctx; let rows = []; let lastTime = 0;
    const random = (min,max)=>Math.random()*(max-min)+min; const choose = (arr)=>arr[Math.floor(Math.random()*arr.length)];
    const populateRow = (row)=>{ row.rects=[]; row.totalWidth=0; let currentX=0; const requiredWidth = canvas.width*1.5 + CONFIG.MAX_RECT_WIDTH*2; while(row.totalWidth<requiredWidth){ const width=random(CONFIG.MIN_RECT_WIDTH, CONFIG.MAX_RECT_WIDTH); row.rects.push({ x: currentX, width, color: choose(CONFIG.PALETTE) }); currentX+=width; row.totalWidth+=width; } };
    const createRow = (y,currentTime)=>{ const duration = random(CONFIG.MIN_DURATION_SECONDS, CONFIG.MAX_DURATION_SECONDS)*1000; const easingFunctions = Object.values(EASING_FUNCTIONS); const row = { y, direction: Math.random()>0.5?1:-1, isHyperspeed: duration < CONFIG.HYPERSPEED_DURATION_THRESHOLD*1000, e_startTime: currentTime, e_duration: duration, e_fn: choose(easingFunctions), e_progress: 0, offsetX: 0 }; populateRow(row); return row; };
    const init = (currentTime=0)=>{ rows=[]; const numRows = Math.ceil(canvas.height/CONFIG.ROW_HEIGHT); for(let i=0;i<numRows;i++){ rows.push(createRow(i*CONFIG.ROW_HEIGHT, currentTime)); } };
    const applyTheme = (index)=>{ THEMES[index].generator(); init(performance.now()); };
    const update = (currentTime)=>{ if(!lastTime) lastTime=currentTime; rows.forEach((row,i)=>{ const elapsed=currentTime-row.e_startTime; row.e_progress=Math.min(elapsed/row.e_duration,1.0); const eased=row.e_fn(row.e_progress); const travel=canvas.width+row.totalWidth; row.offsetX=eased*travel; if(row.e_progress>=1.0){ rows[i]=createRow(row.y,currentTime); } }); lastTime=currentTime; };
    const draw = ()=>{ ctx.fillStyle = CONFIG.BACKGROUND_COLOR.getColor('rgba'); ctx.fillRect(0,0,canvas.width,canvas.height); for(const row of rows){ if(row.isHyperspeed){ ctx.fillStyle = CONFIG.HYPERSPEED_BLUR_COLOR.getColor('rgba'); ctx.fillRect(0,row.y,canvas.width,CONFIG.ROW_HEIGHT); } const startX = row.direction===1 ? -row.totalWidth + row.offsetX : canvas.width - row.offsetX; for(const rect of row.rects){ const currentX = startX + rect.x; if(currentX>canvas.width || currentX+rect.width<0) continue; ctx.fillStyle = rect.color.getColor('rgba'); ctx.fillRect(currentX, row.y, rect.width, CONFIG.ROW_HEIGHT); } } };
    const animate = (currentTime)=>{ requestAnimationFrame(animate); update(currentTime); draw(); };
    const setup = ()=>{ const mgr = canvasManager().attach('${canvasId}'); mgr.initWithContext('full','full','2d'); canvas = mgr; ctx = mgr.ctx; applyTheme(0); let resizeTimer; window.addEventListener('resize', ()=>{ mgr.resize('full','full'); clearTimeout(resizeTimer); resizeTimer=setTimeout(()=>{ init(performance.now()); },200); }); animate(performance.now()); };
    if (document.readyState === 'loading') { window.addEventListener('DOMContentLoaded', setup); } else { setup(); }
  `

  const blob = new Blob([code], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  const moduleScript = document.createElement('script')
  moduleScript.type = 'module'
  moduleScript.dataset.booyahModule = 'true'
  moduleScript.src = url
  document.head.appendChild(moduleScript)

  return () => {
    const el = document.querySelector(`script[type="module"][data-booyah-module="true"]`)
    if (el) {
      URL.revokeObjectURL(el.src)
      el.remove()
    }
  }
}


