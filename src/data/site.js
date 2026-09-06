export const site = {
  name: 'Pelton',
  tagline: 'Free and open-source desktop email.',
  url: 'https://pelton.app',
  vendor: 'Stellar Foundry GmbH',
}

export const links = {
  org: 'https://github.com/peltonapp',
  client: 'https://github.com/TRC-Loop/Pelton',
  website: 'https://github.com/TRC-Loop/pelton.app',
  themes: 'https://github.com/TRC-Loop/pelton-themes',
  themesSite: 'https://themes.pelton.app',
  releases: 'https://github.com/TRC-Loop/Pelton/releases',
  releasesLatest: 'https://github.com/TRC-Loop/Pelton/releases/latest',
  issues: 'https://github.com/TRC-Loop/Pelton/issues',
  api: 'https://api.github.com/repos/TRC-Loop/Pelton/releases/latest',
  repoApi: 'https://api.github.com/repos/TRC-Loop/Pelton',
  discord: '/discord',
  docs: 'https://docs.pelton.app',
  email: 'contact@pelton.app',
  copr: 'https://copr.fedorainfracloud.org/coprs/arnek/Pelton/',
  coprEnable: 'arnek/Pelton',
  aur: 'https://aur.archlinux.org/packages/pelton-bin',
  license: 'https://github.com/TRC-Loop/Pelton/blob/main/LICENSE',
  conduct: 'https://github.com/TRC-Loop/Pelton/blob/main/CODE_OF_CONDUCT.md',
  security: 'https://github.com/TRC-Loop/Pelton/blob/main/SECURITY.md',
}

export const release = {
  version: '2026.4',
  date: '4 September 2026',
  url: 'https://github.com/TRC-Loop/Pelton/releases/tag/v2026.4',
}

// Real screenshots: themes, onboarding, settings. The hero gets the shorter
// list (the app itself, no setup flow); the download page gets all of it.
export const heroScreenshots = [
  '/img/pelton-theme-default',
  '/img/pelton-theme-slate',
  '/img/pelton-theme-teal',
  '/img/pelton-theme-forest',
  '/img/pelton-theme-violet',
  '/img/onboarding-inbox1',
  '/img/onboarding-inbox2',
  '/img/onboarding-inbox3',
  '/img/onboarding-settings',
]

export const screenshots = [
  ...heroScreenshots,
  '/img/onboarding-welcome',
  '/img/onboarding-language',
  '/img/onboarding-why',
  '/img/onboarding-privacy',
  '/img/onboarding-theme',
  '/img/onboarding-accent',
  '/img/onboarding-density',
  '/img/onboarding-size',
  '/img/onboarding-list',
  '/img/onboarding-finishing',
  '/img/onboarding-import',
  '/img/onboarding-addmailbox',
  '/img/onboarding-done',
]

export const nav = [
  { href: '/#mail', label: 'Features' },
  { href: '/privacy-security', label: 'Privacy' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/community', label: 'Community' },
  { href: '/design', label: 'Design' },
]

export const cards = [
  {
    icon: 'server-2',
    title: 'Your mail lives on your disk',
    body: 'Messages are downloaded to a SQLite database on your computer and stay there, alongside your own provider.',
    span: 2,
  },
  {
    icon: 'search',
    title: 'Search works offline',
    body: 'A local Bleve full-text index, so results come back instantly with no connection.',
  },
  {
    icon: 'cloud-off',
    title: 'Keep what you need',
    body: 'Hold the last weeks or months, and pin single messages to keep forever.',
  },
  {
    icon: 'shield-lock',
    title: 'PGP and S/MIME',
    body: 'Sign, encrypt, decrypt and verify. Keys never leave the machine. Off until you turn it on.',
  },
  {
    icon: 'fish-hook',
    title: 'Mail has to prove who sent it',
    body: 'SPF, DKIM and DMARC results, with checks for spoofed names, off-domain Reply-To and lookalike domains.',
    span: 2,
  },
  {
    icon: 'flag',
    title: 'Eight flag colors',
    body: 'Local by default, or synced as IMAP keywords.',
    visual: 'flags',
  },
  {
    icon: 'command',
    title: 'Everything on Cmd+K',
    body: 'Folders, views, messages, settings and every menu action from one field.',
  },
  {
    icon: 'clock',
    title: 'Snooze and send later',
    body: 'Send a message away and have it return unread, or schedule one to leave at a set time.',
  },
  {
    icon: 'palette',
    title: 'Themes and density',
    body: 'Light, dark or one you write. Three densities, three corner styles, custom accent.',
  },
  {
    icon: 'device-desktop',
    title: 'Mac, Windows and Linux',
    body: 'Go and Wails rather than a bundled browser, so it starts fast and stays light on memory.',
    visual: 'os',
  },
]

export const extras = [
  { icon: 'keyboard', title: 'Vim mode', body: 'Modal editing in the compose window.' },
  { icon: 'adjustments', title: 'Custom shortcuts', body: 'Rebind any key.' },
  { icon: 'hand-finger', title: 'Swipe gestures', body: 'Trackpad swipes on messages.' },
  { icon: 'address-book', title: 'Autocomplete', body: 'Learned from mail you send and receive.' },
  { icon: 'layout-sidebar', title: 'Saved views', body: 'A search that opens like a folder, with a live count.' },
  { icon: 'browser', title: 'Reading tabs', body: 'Park a message without losing your place.' },
  { icon: 'file-export', title: 'Portable config', body: 'Accounts, preferences and layout in one file.' },
  { icon: 'bell', title: 'Native notifications', body: 'All new mail, or only senders you mark.' },
]

export const mailRows = [
  {
    k: 'Accounts',
    v: 'IMAP and SMTP. Several accounts at once, in one inbox or kept separate.',
  },
  {
    k: 'Storage',
    v: 'Mail is downloaded to a SQLite database on your computer and stays there.',
  },
  {
    k: 'Offline',
    v: 'Keep the last weeks or months, and pin individual messages to keep forever.',
  },
  {
    k: 'Search',
    v: 'A local Bleve full-text index, so it stays instant with no connection.',
  },
  {
    k: 'Sync',
    v: 'New mail arrives when the server says so, not on a timer.',
  },
  {
    k: 'Notifications',
    v: 'Notification Center, Windows toasts, Linux dbus. All new mail, or only senders you mark.',
  },
  {
    k: 'Attachments',
    v: 'PDFs, images and text open inside Pelton.',
  },
  {
    k: 'Contacts',
    v: 'CardDAV, plus addresses learned from mail you send and receive.',
  },
]

export const organiseRows = [
  { k: 'Flags', v: 'Eight colors. Local, or synced as IMAP keywords.' },
  { k: 'Views', v: 'A saved search that opens like a folder, with a live count.' },
  { k: 'Profiles', v: 'Separate settings, accounts, flags and sidebar per profile.' },
  { k: 'Tabs', v: 'Open a message in a tab and keep your place in the list.' },
  { k: 'Snooze', v: 'Send a message away. It comes back unread when you say.' },
  { k: 'Send later', v: 'Pick a time and the message leaves then.' },
  { k: 'Bulk actions', v: 'Move, flag, mark or delete a selection at once.' },
  { k: 'Command palette', v: 'Cmd+K over folders, views, messages, settings and menu actions.' },
]

export const securityRows = [
  { k: 'Encryption', v: 'PGP and S/MIME. Sign, encrypt, decrypt and verify. Off until you turn it on.' },
  { k: 'Sender checks', v: 'SPF, DKIM and DMARC results, plus spoofed names and lookalike domains.' },
  { k: 'Remote images', v: 'Blocked by default. A banner says how much of it looks like a tracking pixel.' },
  { k: 'Scanning', v: 'VirusTotal for links and attachments, off until you add a key.' },
  { k: 'Telemetry', v: 'None. No analytics, no crash reports, no update ping.' },
]

export const customiseRows = [
  { k: 'Themes', v: 'Light, dark, or one you write. Color picker with alpha and custom CSS.' },
  { k: 'Density', v: 'Compact, medium or luxe. Changes row height and padding, nothing else.' },
  { k: 'Corners', v: 'Square, default or round.' },
  { k: 'Shortcuts', v: 'Rebind any key.' },
  { k: 'Vim mode', v: 'Modal editing in the compose window.' },
  { k: 'Gestures', v: 'Trackpad swipes on messages.' },
  { k: 'Export', v: 'Accounts, preferences and layout in one file.' },
]

export const pinned = [
  {
    title: 'Profiles',
    body: 'Work and personal keep their own accounts, flags and sidebar.',
    img: {
      base: '/img/pelton-profile-switcher',
      width: 536,
      height: 438,
      alt: 'The profile switcher with Personal selected, and Work and Side project beneath it',
    },
  },
  {
    title: 'Sync',
    body: 'Progress counts messages, not folders. The window stays usable while it runs.',
    img: {
      base: '/img/pelton-sync-progress',
      width: 1200,
      height: 192,
      alt: 'A sync bar reading: Syncing INBOX for arne@example.com, 8,412 of 13,560',
    },
  },
  {
    title: 'Command palette',
    body: 'Cmd+K matches folders, views, messages, settings and every menu action.',
    img: {
      base: '/img/pelton-command-palette',
      width: 1336,
      height: 644,
      alt: 'The command palette searching for arch, grouped into actions, mail and settings',
    },
  },
]

export const mcpCards = [
  {
    icon: 'lock',
    title: 'Off by default',
    body: 'Nothing listens until you turn it on in Settings.',
  },
  {
    icon: 'shield-lock',
    title: 'Your machine only',
    body: 'Bound to 127.0.0.1. Binding to a routable address is blocked.',
  },
  {
    icon: 'eye',
    title: 'Read-only to start',
    body: 'Seven write actions, each granted separately, all starting off.',
  },
  {
    icon: 'send-2',
    title: 'Sending ends with you',
    body: 'An agent can queue a draft. Only you can send it.',
  },
  {
    icon: 'paperclip',
    title: 'No attachment contents',
    body: 'Names, types and sizes. The files stay on your disk.',
  },
  {
    icon: 'cloud-off',
    title: 'No AI service',
    body: 'No model, no API key, no cloud. Your agent runs where you already run it.',
  },
]

export const mcpRows = [
  { k: 'Default', v: 'Off. Nothing listens until you turn it on in Settings.' },
  { k: 'Address', v: 'Bound to 127.0.0.1. Binding to a routable address is blocked.' },
  { k: 'Permissions', v: 'Read-only when enabled. Seven write actions, granted one at a time.' },
  { k: 'Sending', v: 'send_message queues a draft for you to approve. It does not send.' },
  { k: 'Attachments', v: 'Names, types and sizes only. File contents stay on disk.' },
  { k: 'AI services', v: 'Pelton calls none. No model, no key, no cloud.' },
]

export const privacyCards = [
  {
    icon: 'broadcast-off',
    title: 'Pelton never phones home',
    body: 'It makes no request to any server we run. There is no account, no licence check and no update ping you did not ask for.',
    span: 2,
  },
  {
    icon: 'chart-bar-off',
    title: 'No telemetry',
    body: 'Nothing is counted, sampled or uploaded, and there are no automated crash reports.',
  },
  {
    icon: 'photo-off',
    title: 'Remote images blocked',
    body: 'A banner tells you when images were held back, and how much of it looks like a tracking pixel.',
  },
  {
    icon: 'key',
    title: 'Keys stay on the machine',
    body: 'PGP and S/MIME key material is stored and used locally. Nothing is escrowed anywhere.',
  },
  {
    icon: 'code',
    title: 'You can check all of this',
    body: 'The client is GPL-3.0. Read the network code, build it yourself, or run it behind a firewall and watch it stay quiet.',
  },
]

export const privacyRows = [
  { k: 'Servers', v: 'Pelton makes no request to any server we run. There are none.' },
  { k: 'Account', v: 'There is no Pelton account. Nothing to sign up for.' },
  { k: 'Telemetry', v: 'None. No usage counting, no automated crash reports.' },
  { k: 'Tracking pixels', v: 'Remote images are blocked until you allow them for a message.' },
  { k: 'Keys', v: 'PGP and S/MIME key material is stored and used on your machine only.' },
  { k: 'Your data', v: 'One SQLite file. Delete it and it is gone.' },
  { k: 'Verifying it', v: 'The client is GPL-3.0. Read the network code or build it yourself.' },
]

export const readTools = [
  { name: 'list_accounts', desc: 'The configured mail accounts.' },
  { name: 'list_folders', desc: 'The folders of one account.' },
  { name: 'list_messages', desc: 'Messages in a folder, newest first, as summaries.' },
  { name: 'get_message', desc: 'One message: headers, bodies, attachment metadata.' },
  { name: 'search_messages', desc: 'Full-text search with from, to and subject scopes.' },
]

export const writeTools = [
  { name: 'mark_read', desc: 'Mark a message read or unread.' },
  { name: 'move_message', desc: 'Move a message to another folder of the same account.' },
  { name: 'archive_message', desc: 'Move a message to the account archive.' },
  { name: 'flag_message', desc: 'Flag or unflag a message.' },
  { name: 'set_flag_color', desc: 'Set the color label on a message.' },
  { name: 'delete_message', desc: 'Move a message to the trash.' },
  { name: 'send_message', desc: 'Queue a message for you to approve.' },
]

export const faq = [
  {
    q: 'Which email providers work with Pelton?',
    a: 'Most of them. Pelton speaks IMAP and SMTP, which is what nearly every provider offers. For Gmail, an app password is the simplest route. OAuth2 also works, but Pelton ships no client id of its own, so it needs Google Cloud credentials you create.',
  },
  {
    q: 'Does it work without a connection?',
    a: 'Yes. Mail is downloaded to your computer. You choose how far back to keep, and you can pin individual messages to keep permanently. Search runs against that copy.',
  },
  {
    q: 'Where is my mail stored?',
    a: 'In a SQLite database file on your machine, and on your own email provider. Nothing is routed through a server we run.',
  },
  {
    q: 'Is there any telemetry?',
    a: 'No. Nothing is counted or uploaded, and there are no automated crash reports. Bugs reach us only when someone writes an issue.',
  },
  {
    q: 'Does Pelton support PGP and S/MIME?',
    a: 'Both, since 2026.4. Import keys with passphrase handling, sign and encrypt what you send, and decrypt and verify what arrives, with the signature status shown on the message. Both are off until you enable them, and key handling stays local.',
  },
  {
    q: 'Does the MCP server send my mail to an AI company?',
    a: 'No. Pelton contains no model, no API key and no call to any AI provider. The MCP server is a local endpoint an agent you run connects to, and it is off until you enable it. What that agent does with what it reads is between you and whoever makes it.',
  },
  {
    q: 'Can an agent send or delete mail?',
    a: 'Only if you grant it. A freshly enabled server is read-only. The seven write actions are switched on one at a time and all start off. Even with sending granted, send_message queues a draft for you to approve, and delete_message moves a message to the trash.',
  },
  {
    q: 'Why is the first launch blocked?',
    a: 'The builds are not code-signed. On macOS, right-click the app and choose Open, then confirm. On Windows, choose More info, then Run anyway. After that it opens normally.',
  },
  {
    q: 'What is it built with?',
    a: 'Go and Wails, with a Svelte interface in the system webview. No bundled browser, so it starts quickly and uses less memory than an Electron app.',
  },
]

export const changelog = [
  {
    version: '2026.4',
    date: '4 September 2026',
    banner: '/img/banner-2026-4',
    items: [
      'PGP and S/MIME support, both off until enabled',
      'Profiles, with their own settings, accounts, flags and sidebar layout',
      'Command palette on Cmd+K',
      'Phishing detection: SPF, DKIM, DMARC, spoofed names, lookalike domains',
      'Tracking pixel detection in the blocked-content banner',
      'VirusTotal scanning for links and attachments, off until you add a key',
      'MCP write actions, seven separate permissions, all starting off',
      'Reading tabs, bulk actions, CardDAV, IMAP folder management',
      'Message-level sync progress and per-account failure marking',
      'Improved search, charset detection, crash logs, 14 bug fixes',
    ],
  },
  {
    version: '2026.3',
    date: 'August 2026',
    banner: '/img/banner-2026-3',
    items: [
      'A local MCP server, read-only and off by default',
      'Native push notifications on all three platforms',
      'VIP senders, so only the people you mark can interrupt you',
      'Customizable menu bar',
      'Faster mail delivery',
    ],
  },
  {
    version: '2026.3.4',
    date: 'August 2026',
    patch: true,
    items: ['Fixes for MCP permissions, notification grouping and menu bar layout'],
  },
  {
    version: '2026.3.3',
    date: 'August 2026',
    patch: true,
    items: ['Sync and mailbox fixes'],
  },
  {
    version: '2026.3.2',
    date: 'August 2026',
    patch: true,
    items: ['Notification and startup fixes'],
  },
  {
    version: '2026.3.1',
    date: 'August 2026',
    patch: true,
    items: ['Fixes for the first 2026.3 release'],
  },
  {
    version: '1.0.9',
    date: 'July 2026',
    items: ['The last release before the calendar versioning switch'],
  },
]
