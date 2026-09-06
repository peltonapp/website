const API = 'https://api.github.com/repos/TRC-Loop/Pelton/releases/latest'
const LATEST = 'https://github.com/TRC-Loop/Pelton/releases/latest'

const PATTERNS = {
  'mac-arm': [/(darwin|mac).*(arm64|applesilicon|aarch64).*\.dmg$/i, /arm64.*\.dmg$/i, /\.dmg$/i],
  'mac-intel': [/(darwin|mac).*(intel|amd64|x64|x86_64).*\.dmg$/i, /\.dmg$/i],
  win: [/\.exe$/i, /\.msi$/i, /windows.*\.zip$/i],
  deb: [/\.deb$/i],
  rpm: [/\.rpm$/i],
  bin: [/linux.*(amd64|x86_64)(\.tar\.gz)?$/i],
}

const NAMES = {
  'mac-arm': 'for macOS',
  'mac-intel': 'for macOS',
  win: 'for Windows',
  deb: 'for Linux',
}

/**
 * @typedef {{name: string, size: number, digest?: string, browser_download_url: string}} Asset
 * @typedef {{tag_name: string, published_at: string, assets: Asset[]}} Release
 */

/** @type {Promise<Release|null>|null} */
let cached = null

export function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function detect() {
  const ua = navigator.userAgent
  if (isMobileDevice()) return null
  if (/Win/i.test(ua)) return 'win'
  if (/Linux|X11|CrOS/i.test(ua)) return 'deb'
  if (/Mac/i.test(ua)) return 'mac-arm'
  return null
}

function refineMac(key) {
  if (key !== 'mac-arm') return Promise.resolve(key)

  const uad = navigator.userAgentData
  if (uad && uad.getHighEntropyValues) {
    return uad
      .getHighEntropyValues(['architecture'])
      .then((v) => (v && /x86/i.test(v.architecture) ? 'mac-intel' : 'mac-arm'))
      .catch(() => key)
  }

  try {
    const gl = document.createElement('canvas').getContext('webgl')
    const ext = gl && gl.getExtension('WEBGL_debug_renderer_info')
    const r = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : ''
    if (/intel/i.test(r)) return Promise.resolve('mac-intel')
  } catch {
    /* renderer unavailable, keep the Apple Silicon default */
  }

  return Promise.resolve(key)
}

function pick(assets, key) {
  for (const re of PATTERNS[key] || []) {
    const hit = assets.find((a) => re.test(a.name))
    if (hit) return hit
  }
  return null
}

/** @returns {Promise<Release|null>} */
export function fetchRelease() {
  if (cached) return cached
  cached = fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .catch(() => null)
  return cached
}

function startDownload(url) {
  const frame = document.createElement('iframe')
  frame.hidden = true
  frame.src = url
  document.body.appendChild(frame)
  window.setTimeout(() => {
    window.location.assign(`/thanks?u=${encodeURIComponent(url)}`)
  }, 900)
}

function closeOnBackdrop(modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close()
  })
}

/**
 * Wires the disclaimer dialog, if one is on the page, and returns a function
 * that opens it for a given url. Every real download is asked to accept the
 * terms first; nothing is downloaded until it does.
 * @returns {((url: string) => void)|null}
 */
function disclaimerGate() {
  const modal = /** @type {HTMLDialogElement|null} */ (document.getElementById('dl-disclaimer'))
  const accept = /** @type {HTMLInputElement|null} */ (
    document.getElementById('dl-disclaimer-accept')
  )
  const confirm = /** @type {HTMLButtonElement|null} */ (
    document.getElementById('dl-disclaimer-confirm')
  )
  const cancel = document.getElementById('dl-disclaimer-cancel')
  if (!modal || !accept || !confirm || !cancel) return null

  closeOnBackdrop(modal)

  let pending = ''

  accept.addEventListener('change', () => {
    confirm.disabled = !accept.checked
  })

  cancel.addEventListener('click', () => modal.close())

  confirm.addEventListener('click', () => {
    if (!accept.checked || !pending) return
    const url = pending
    pending = ''
    modal.close()
    startDownload(url)
  })

  return (url) => {
    pending = url
    accept.checked = false
    confirm.disabled = true
    modal.showModal()
  }
}

function gate(el, ask) {
  el.addEventListener('click', (e) => {
    const url = el.getAttribute('href')
    if (!url || url.startsWith('/') || !/github\.com|fedorainfracloud/.test(url)) return
    e.preventDefault()
    if (ask) ask(url)
    else startDownload(url)
  })
}

export function initCliModal() {
  const openBtn = document.getElementById('dl-cli-open')
  const modal = /** @type {HTMLDialogElement|null} */ (document.getElementById('dl-cli'))
  const closeBtn = document.getElementById('dl-cli-close')
  if (!openBtn || !modal || !closeBtn) return
  closeOnBackdrop(modal)
  openBtn.addEventListener('click', () => modal.showModal())
  closeBtn.addEventListener('click', () => modal.close())

  modal.querySelectorAll('[data-cli-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.previousElementSibling?.querySelector('code')
      const text = code?.textContent || ''
      if (!text) return
      navigator.clipboard?.writeText(text).then(() => {
        const label = btn.textContent
        btn.textContent = 'Copied'
        window.setTimeout(() => {
          btn.textContent = label
        }, 1200)
      })
    })
  })
}

export function initChips() {
  const chips = document.querySelectorAll('[data-chip]')
  if (!chips.length) return

  const ask = disclaimerGate()

  chips.forEach((chip) => {
    if (chip.dataset.ready) return
    chip.dataset.ready = '1'

    const more = chip.querySelector('[data-chip-more]')
    const menu = chip.querySelector('[data-chip-menu]')

    const main = chip.dataset.mode === 'download' ? chip.querySelector('[data-chip-main]') : null
    if (main) gate(main, ask)

    // Picking a build from the dropdown does not download it: it points the
    // main button at that build and closes the menu, so the button always
    // shows what a press of it will actually get, and a second, deliberate
    // press is what starts the download.
    menu?.querySelectorAll('[data-build]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (!main) return
        e.preventDefault()
        main.href = el.getAttribute('href') || main.href
        const label = main.querySelector('[data-chip-label]')
        if (label && el.dataset.label) label.textContent = `Download for ${el.dataset.label}`
        chip.dataset.open = 'false'
        menu.hidden = true
        more?.setAttribute('aria-expanded', 'false')
      })
    })

    more?.addEventListener('click', () => {
      const open = chip.dataset.open === 'true'
      chip.dataset.open = open ? 'false' : 'true'
      menu.hidden = open
      more.setAttribute('aria-expanded', open ? 'false' : 'true')
    })

    document.addEventListener('click', (e) => {
      if (!chip.contains(e.target) && chip.dataset.open === 'true') {
        chip.dataset.open = 'false'
        menu.hidden = true
        more?.setAttribute('aria-expanded', 'false')
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chip.dataset.open === 'true') {
        chip.dataset.open = 'false'
        menu.hidden = true
        more?.setAttribute('aria-expanded', 'false')
      }
    })
  })

  if (isMobileDevice()) {
    const wrap = document.getElementById('dl-chip-wrap')
    const notice = document.getElementById('dl-mobile-notice')
    if (wrap) wrap.hidden = true
    if (notice) notice.hidden = false
  }

  const guess = detect()

  refineMac(guess).then((key) => {
    if (key && NAMES[key]) {
      document.querySelectorAll('[data-chip-label]').forEach((el) => {
        el.textContent = `Download ${NAMES[key]}`
      })
    }

    fetchRelease().then((rel) => {
      if (!rel) return
      const assets = rel.assets || []

      document.querySelectorAll('[data-build]').forEach((el) => {
        const hit = pick(assets, el.dataset.build)
        if (hit) el.href = hit.browser_download_url
      })

      document.querySelectorAll('[data-size]').forEach((el) => {
        const hit = pick(assets, el.dataset.size)
        if (hit && hit.size) el.textContent = `${(hit.size / 1048576).toFixed(0)} MB`
      })

      if (key) {
        const hit = pick(assets, key)
        document.querySelectorAll('[data-chip-main]').forEach((el) => {
          el.href = hit ? hit.browser_download_url : LATEST
        })
      }

      document.querySelectorAll('[data-version]').forEach((el) => {
        el.textContent = rel.tag_name || ''
      })
    })
  })
}
