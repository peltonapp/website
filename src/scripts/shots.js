// Drives an auto-advancing, cross-fading screenshot stack. Only the first
// slide ships a real <picture> in the server-rendered HTML; the rest are
// empty placeholders carrying data-base/data-w/data-h, and get their
// <picture> built and inserted here, one slide ahead of when it is shown.
// Rendering all of them up front meant the page requested (avif+webp+png)
// for every slide immediately, most of them never even seen, which is what
// made the page slow to load.
function buildPicture(base, width, height) {
  const picture = document.createElement('picture')
  const avif = document.createElement('source')
  avif.srcset = `${base}.avif`
  avif.type = 'image/avif'
  const webp = document.createElement('source')
  webp.srcset = `${base}.webp`
  webp.type = 'image/webp'
  const img = document.createElement('img')
  img.src = `${base}.png`
  img.width = width
  img.height = height
  img.alt = ''
  img.decoding = 'async'
  picture.append(avif, webp, img)
  return picture
}

function ensureLoaded(slide) {
  if (!slide || slide.dataset.loaded) return
  const { base, w, h } = slide.dataset
  if (!base) return
  slide.dataset.loaded = '1'
  slide.append(buildPicture(base, Number(w) || 1400, Number(h) || 936))
}

/**
 * @param {string} rootSelector selector for the element containing the slides
 * @param {string} slideSelector selector for each slide within root
 * @param {object} [opts]
 * @param {string} [opts.dotsSelector] selector for the dots container, if any
 * @param {number} [opts.intervalMs]
 */
export function initShotCarousel(rootSelector, slideSelector, opts = {}) {
  const slides = document.querySelectorAll(`${rootSelector} ${slideSelector}`)
  if (!slides.length) return

  const dots = opts.dotsSelector
    ? document.querySelectorAll(`${opts.dotsSelector} button`)
    : null

  ensureLoaded(slides[0])
  ensureLoaded(slides[1])

  let active = 0
  let timer = 0
  const intervalMs = opts.intervalMs || 2000
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const show = (i) => {
    slides[active].dataset.active = 'false'
    if (dots) dots[active].dataset.active = 'false'
    active = i
    slides[active].dataset.active = 'true'
    if (dots) dots[active].dataset.active = 'true'
    ensureLoaded(slides[(active + 1) % slides.length])
  }

  const startAuto = () => {
    window.clearInterval(timer)
    timer = window.setInterval(() => show((active + 1) % slides.length), intervalMs)
  }

  if (dots) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        show(i)
        if (!reduce) startAuto()
      })
    })
  }

  if (slides.length > 1 && !reduce) startAuto()
}
