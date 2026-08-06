// constants/navigation.js
export const NAV_ITEMS = [
  { path: '/', label: '{Home}' },
  { path: '/projects', label: '{Projects}' },
  { path: '/tech', label: '{Tech}' },
  { path: '/contacts', label: '{Contacts}' },
  { path: '/error', label: '{Test Error}' },
  { path: '/about', label: '{About}' },
]

export const socialLinks = [
  {
    icon: 'icon-github',
    label: 'GitHub',
    url: 'https://github.com/volodimirfushtei',
  },
  {
    icon: 'icon-linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile',
  },
  {
    icon: 'icon-slack-brand',
    label: 'Slack',
    url: 'https://random-x1r5268.slack.com/team/U07UCAKB1RV',
  },
  {
    icon: 'icon-discord-brand',
    label: 'Discord',
    url: 'https://discord.gg/',
  },
]
export const imagesNavHeader = [
  { src: '/images/', link: '/' },
  { src: 'header-image-2.jpg', link: '/projects' }, 
  { src: 'header-image-3.jpg', link: '/tech' }, 
  { src: 'header-image-4.jpg', link: '/contacts' }, 
]