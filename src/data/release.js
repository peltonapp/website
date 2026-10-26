// The Pelton release the site advertises, read from GitHub when the site is
// built so a new release shows up on the next build without editing anything.
// Build only: nothing in a browser imports this, so visitors never make the
// request themselves.
//
// The fallback is used when GitHub cannot be reached or rate limits the build.
// Keep it on a real release; it is what the site says until the next build.

const fallback = {
  version: '2026.4.6',
  date: '26 October 2026',
  url: 'https://github.com/peltonapp/Pelton/releases/tag/v2026.4.6',
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

async function latestRelease() {
  const headers = { Accept: 'application/vnd.github+json' }
  // optional: a token in the build environment lifts the shared rate limit.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  try {
    const res = await fetch('https://api.github.com/repos/peltonapp/Pelton/releases/latest', {
      headers,
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`GitHub answered ${res.status}`)
    const rel = await res.json()
    const version = String(rel.tag_name || '').replace(/^v/, '')
    if (!/^\d+\.\d+(\.\d+)?$/.test(version)) throw new Error(`unexpected tag ${rel.tag_name}`)
    return {
      version,
      date: dateFormat.format(new Date(rel.published_at)),
      url: rel.html_url,
    }
  } catch (err) {
    console.warn(`[release] using the built-in ${fallback.version}: ${err.message}`)
    return fallback
  }
}

export const release = await latestRelease()
