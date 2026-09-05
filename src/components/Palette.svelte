<script>
  import { onMount } from 'svelte'

  const KEY_SLOTS = 4

  const FLAG_KEYS = ['F', 'L', 'A', 'G']
  const COLOR_NAMES = ['Red', 'Orange', 'Yellow', 'Green', 'Teal', 'Blue', 'Purple', 'Pink']

  // Matches the real palette's top-level results for "flag": one row answers
  // directly, the rest are quick-selected with Cmd+1 through Cmd+7.
  const TOP = [
    { id: 't0', group: 'action', label: 'Flag / Unflag', icon: 'flag', quick: 0 },
    { id: 't1', group: 'action', label: 'Flag color', icon: 'wand', quick: 1 },
    { id: 't2', group: 'navigate', label: 'Flagged', icon: 'folder', quick: 2 },
    { id: 't3', group: 'setting', label: 'Reading & display', icon: 'settings', quick: 3 },
    { id: 't4', group: 'setting', label: 'Message list', icon: 'settings', quick: 4 },
    { id: 't5', group: 'setting', label: 'Sync & power', icon: 'settings', quick: 5 },
    { id: 't6', group: 'setting', label: 'Backup & integrations', icon: 'settings', quick: 6 },
    { id: 't7', group: 'setting', label: 'Notifications', icon: 'settings', quick: 7 },
  ]

  // The step the palette descends into after Flag color is chosen.
  const STEP = [
    { id: 's0', group: 'action', label: 'No color', icon: 'wand', quick: 0 },
    ...COLOR_NAMES.map((name, i) => ({
      id: `s${i + 1}`,
      group: 'action',
      label: name,
      swatch: `var(--flag-${i + 1})`,
      quick: i + 1,
    })),
  ]

  const GROUP_RANK = ['action', 'mail', 'navigate', 'setting']
  const GROUP_LABEL = {
    action: 'Actions',
    mail: 'Mail',
    navigate: 'Go to',
    setting: 'Settings',
  }

  const PATHS = {
    flag: 'M5 5m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z|M5 21v-16',
    folder: 'M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2',
    settings:
      'M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z|M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0',
    wand: 'M6 21l15 -15l-3 -3l-15 15z|M15 6l3 3|M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2|M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2',
  }

  let typed = ''
  let step = false
  let active = 0
  let confirmed = false
  let pressed = null
  let keys = []
  let pinEl
  let mod = '⌘'

  $: list = step ? STEP : TOP

  function quickLabel(q) {
    if (q === 0) return '↵'
    return mod === '⌘' ? `⌘${q}` : `Ctrl+${q}`
  }

  // Matches label text while the query is still partial, so the list grows
  // the way real typing narrows it; only once "flag" is complete does it show
  // the settings panes too, the way the real palette's fuzzy search would
  // surface them by content rather than by label.
  $: topMatches = typed === 'flag' ? TOP : TOP.filter((r) => r.label.toLowerCase().includes(typed))

  $: groups = !typed
    ? []
    : step
      ? [{ group: 'action', items: STEP }]
      : GROUP_RANK.map((g) => ({ group: g, items: topMatches.filter((r) => r.group === g) })).filter(
          (g) => g.items.length
        )

  $: ordered = groups.flatMap((g) => g.items)

  // The whole sequence is a pure function of scroll progress p in [0,1]: type
  // "flag", press Cmd+1 for Flag color, pick a color, press Cmd+7 for Purple.
  function apply(p) {
    if (p < 0.34) {
      const chars = Math.round((p / 0.34) * FLAG_KEYS.length)
      typed = FLAG_KEYS.slice(0, chars).join('').toLowerCase()
      step = false
      active = 0
      confirmed = false
      pressed = null
      keys = FLAG_KEYS.slice(0, chars).map((k, i) => ({ id: `f${i}`, label: k }))
      return
    }

    typed = 'flag'

    if (p < 0.56) {
      step = false
      active = 0
      confirmed = false
      pressed = null
      keys = []
      return
    }

    if (p < 0.6) {
      step = false
      active = 1
      pressed = 1
      keys = [
        { id: 'mod1', label: mod },
        { id: 'k1', label: '1' },
      ]
      return
    }

    step = true
    typed = 'Pick a color'

    if (p < 0.84) {
      active = 0
      confirmed = false
      pressed = null
      keys = []
      return
    }

    if (p < 0.88) {
      active = 7
      pressed = 7
      keys = [
        { id: 'mod2', label: mod },
        { id: 'k7', label: '7' },
      ]
      return
    }

    active = 7
    confirmed = true
    pressed = null
    keys = []
  }

  onMount(() => {
    if (/Windows|Linux|X11|CrOS|Android/i.test(navigator.userAgent)) {
      mod = 'Ctrl'
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) {
      apply(0.34)
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const r = pinEl.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0
      apply(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  })
</script>

<div class="cmdk-pin" bind:this={pinEl}>
  <div class="cmdk-stage">
    <div class="cmdk-row">
      <div class="palette-host">
        <div class="palette">
          <div class="field">
            {#if step}
              <span class="chip">Flag color</span>
            {/if}
            <span class="input" class:empty={step}>
              {step ? typed : typed || 'Type a command, or / to search mail'}{#if !step && typed}<b class="caret"></b>{/if}
            </span>
            <kbd class="mod">{mod}K</kbd>
          </div>

          {#if ordered.length}
            <div class="results">
              {#each groups as run (run.group)}
                {#if groups.length > 1}
                  <div class="cmd-group">{GROUP_LABEL[run.group]}</div>
                {/if}
                {#each run.items as entry (entry.id)}
                  <div class="row" data-active={ordered.indexOf(entry) === active}>
                    <span class="icon">
                      {#if entry.swatch}
                        <span class="swatch" style={`background:${entry.swatch}`}></span>
                      {:else}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          {#each PATHS[entry.icon].split('|') as d}
                            <path {d} />
                          {/each}
                        </svg>
                      {/if}
                    </span>
                    <span class="cmd-label">{entry.label}</span>
                    {#if entry.swatch && confirmed && ordered.indexOf(entry) === active}
                      <span class="row-done">Set</span>
                    {/if}
                    <kbd class="quick" data-pressed={pressed === entry.quick}>
                      {quickLabel(entry.quick)}
                    </kbd>
                  </div>
                {/each}
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <div class="cmdk-keys" aria-hidden="true">
        {#each Array(KEY_SLOTS) as _, i (i)}
          <kbd class:show={i < keys.length}>{keys[i]?.label ?? ''}</kbd>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .cmdk-pin {
    position: relative;
    height: 380svh;
  }

  .cmdk-stage {
    position: sticky;
    top: 0;
    height: 100svh;
    display: grid;
    align-content: center;
  }

  .cmdk-row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: clamp(1rem, 2vw, 1.75rem);
  }

  .palette-host {
    flex: 0 1 720px;
    min-width: 0;
  }

  .palette {
    position: relative;
    width: 100%;
  }

  .field {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-5);
    border-radius: var(--radius-card);
    background: var(--surface-overlay);
    box-shadow: var(--shadow-overlay);
  }

  .chip {
    flex-shrink: 0;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-control);
    background: var(--surface-raised);
    font-size: var(--fz-meta);
    color: var(--text-secondary);
  }

  .input {
    flex: 1;
    min-width: 0;
    font-family: var(--font-ui);
    font-size: var(--fz-title);
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
  }

  .input.empty {
    color: var(--text-tertiary);
  }

  .caret {
    display: inline-block;
    width: 1.5px;
    height: 1.05em;
    margin-left: 1px;
    vertical-align: -0.15em;
    background: var(--accent);
    animation: blink 1.1s steps(1) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .mod {
    flex-shrink: 0;
    padding: 2px var(--space-2);
    border-radius: var(--radius-control);
    background: var(--surface-raised);
    font-family: var(--font-ui);
    font-size: var(--fz-meta);
    color: var(--text-tertiary);
  }

  .results {
    position: absolute;
    z-index: 1;
    top: calc(100% + var(--space-2));
    left: 0;
    right: 0;
    max-height: 340px;
    overflow: hidden;
    padding: var(--space-2);
    border-radius: var(--radius-card);
    background: var(--surface-overlay);
    box-shadow: var(--shadow-overlay);
  }

  .cmd-group {
    padding: var(--space-2) var(--space-2) var(--space-1);
    font-size: var(--fz-meta);
    font-weight: var(--fw-medium);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2);
    border-radius: var(--radius-control);
    color: var(--text-primary);
  }

  .row[data-active='true'] {
    background: var(--surface-hover);
  }

  .icon {
    display: inline-flex;
    flex-shrink: 0;
    color: var(--text-secondary);
  }

  .swatch {
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }

  .cmd-label {
    flex: 1;
    min-width: 0;
    font-size: var(--fz-body);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .row-done {
    flex-shrink: 0;
    font-size: var(--fz-meta);
    font-weight: var(--fw-medium);
    color: var(--success);
  }

  .quick {
    flex-shrink: 0;
    width: 34px;
    height: 22px;
    padding: 0;
    border-radius: var(--radius-control);
    background: var(--surface-raised);
    font-family: var(--font-ui);
    font-size: var(--fz-meta);
    color: var(--text-tertiary);
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.15s var(--ease-out),
      color 0.15s var(--ease-out);
  }

  .quick[data-pressed='true'] {
    background: var(--accent);
    color: var(--accent-fg);
  }

  .cmdk-keys {
    display: none;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: var(--space-2);
    width: 72px;
    min-height: 32px;
  }

  .cmdk-keys kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding-inline: 6px;
    border-radius: 7px;
    background: var(--surface-raised);
    box-shadow: var(--shadow-overlay);
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-secondary);
    opacity: 0;
    transition: opacity 0.2s var(--ease-out);
  }

  .cmdk-keys kbd.show {
    opacity: 1;
  }

  @media (min-width: 900px) {
    .cmdk-keys {
      display: flex;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .caret {
      animation: none;
    }
  }
</style>
