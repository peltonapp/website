const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v)
const ease = (t) => 1 - Math.pow(1 - t, 3)

let vh = window.innerHeight
let items = []
let pins = []
let ticking = false

function collect() {
  items = []
  pins = []

  document.querySelectorAll('[data-rise]').forEach((el) => {
    const delay = parseFloat(el.dataset.rise) || 0
    el.style.willChange = 'transform, opacity'
    items.push({ el, kind: 'rise', delay })
  })

  document.querySelectorAll('.lines').forEach((el) => {
    const spans = el.querySelectorAll('span > span')
    spans.forEach((s) => {
      s.style.willChange = 'transform'
    })
    items.push({ el, kind: 'lines', spans })
  })

  const panel = document.querySelector('.hero-panel')
  if (panel) items.push({ el: panel, kind: 'panel' })

  const art = document.querySelector('.hero-art')
  if (art) items.push({ el: art, kind: 'art' })

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax) || 40
    items.push({ el, kind: 'parallax', amount })
  })

  document.querySelectorAll('.pin').forEach((el) => {
    pins.push({
      el,
      frames: el.querySelectorAll('.pin-frame'),
      caps: el.querySelectorAll('.pin-cap'),
      last: -1,
    })
  })
}

function frame() {
  ticking = false

  for (const it of items) {
    const r = it.el.getBoundingClientRect()

    if (it.kind === 'rise') {
      const p = ease(clamp((vh - r.top - it.delay * 40) / (vh * 0.42)))
      it.el.style.setProperty('--rise-o', p.toFixed(3))
      it.el.style.setProperty('--rise-y', `${(1 - p) * 22}px`)
      continue
    }

    if (it.kind === 'lines') {
      const p = clamp((vh - r.top) / (vh * 0.5))
      it.spans.forEach((s, i) => {
        const sp = ease(clamp((p - i * 0.07) / 0.55))
        s.style.setProperty('--line-y', `${(1 - sp) * 105}%`)
      })
      continue
    }

    if (it.kind === 'panel') {
      const p = clamp(-r.top / vh)
      it.el.style.setProperty('--panel-s', (1 - p * 0.055).toFixed(4))
      continue
    }

    if (it.kind === 'art') {
      const p = clamp((vh - r.top) / (vh + r.height))
      it.el.style.setProperty('--art-y', `${(p - 0.5) * -90}px`)
      it.el.style.setProperty('--art-s', (1.04 - p * 0.05).toFixed(4))
      continue
    }

    if (it.kind === 'parallax') {
      const p = clamp((vh - r.top) / (vh + r.height))
      it.el.style.setProperty('--shot-y', `${(0.5 - p) * it.amount}px`)
    }
  }

  for (const pin of pins) {
    const r = pin.el.getBoundingClientRect()
    const total = r.height - vh
    if (total <= 0) continue
    const p = clamp(-r.top / total)
    const n = pin.frames.length
    const idx = Math.min(n - 1, Math.floor(p * n * 0.999))
    if (idx === pin.last) continue
    pin.last = idx
    pin.frames.forEach((f, i) => f.setAttribute('data-active', String(i === idx)))
    pin.caps.forEach((c, i) => c.setAttribute('data-active', String(i === idx)))
  }
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(frame)
  }
}

function onResize() {
  vh = window.innerHeight
  onScroll()
}

export function initScroll() {
  if (reduce.matches) {
    document.documentElement.classList.add('js-off')
    document.querySelectorAll('.pin-frame, .pin-cap').forEach((el, i) => {
      el.setAttribute('data-active', String(i === 0))
    })
    return
  }

  collect()
  frame()

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })

  if ('ResizeObserver' in window) {
    new ResizeObserver(onScroll).observe(document.body)
  }
}
