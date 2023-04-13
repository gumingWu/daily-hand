export default defineAppConfig({
  alpine: {
    title: 'DailyHand',
    description: 'The minimalist blog theme',
    header: {
      position: 'right', // possible value are : | 'left' | 'center' | 'right'
      logo: {
        path: '/logo.svg', // path of the logo
        pathDark: '/logo-dark.svg', // path of the logo in dark mode, leave this empty if you want to use the same logo
        alt: 'dailyhand' // alt of the logo
      }
    },
    footer: {
      navigation: true, // possible value are : true | false
      alignment: 'center', // possible value are : 'none' | 'left' | 'center' | 'right'
      message: 'Follow me on' // string that will be displayed in the footer (leave empty or delete to disable)
    },
    socials: {
      github: 'gumingWu',
    },
  }
})
