export function initWalls() {
  const walls = document.querySelectorAll('[data-wall]')
  if (!walls.length) return

  walls.forEach((wall) => {
    wall.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy]')
      if (!btn) return
      const hex = btn.dataset.copy
      const done = () => {
        btn.dataset.copied = 'true'
        window.setTimeout(() => {
          btn.dataset.copied = 'false'
        }, 1200)
      }

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(hex).then(done).catch(done)
        return
      }

      done()
    })
  })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const cols = [...document.querySelectorAll('.wall-col')]
  let raf = 0

  const update = () => {
    raf = 0
    const vh = window.innerHeight
    for (const col of cols) {
      const r = col.getBoundingClientRect()
      const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1)
      const i = Number(col.style.getPropertyValue('--i')) || 0
      const lag = 1 + (i % 3) * 0.35
      col.style.setProperty('--wall-y', `${(0.5 - p) * 12 * lag}px`)
    }
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
}
