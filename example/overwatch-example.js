const { intro, outro, text, select, spinner, note } = require('@clack/prompts')
const overwatch = require('overwatch-api')

async function main () {
  intro('Overwatch CLI')

  const platform = await select({
    message: 'Which platform are you using?',
    options: [
      { value: 'pc', label: 'PC' },
      { value: 'psn', label: 'PSN' },
      { value: 'xbox', label: 'Xbox' }
    ]
  })

  const region = await select({
    message: 'Which region are you from?',
    options: [
      { value: 'eu', label: 'EU' },
      { value: 'us', label: 'US' },
      { value: 'global', label: 'Global' },
      { value: 'cn', label: 'China' }
    ]
  })

  const tag = await text({
    message: 'What is your Battle.net tag?',
    placeholder: 'Username#1234'
  })

  const s = spinner()
  s.start()

  overwatch.getProfile(platform, region, (tag).replace('#', '-'), (err, profile) => {
    s.stop()
    if (err) {
      console.error(err)
    }

    note(`Wins: ${profile.games.competitive.won}
Losses: ${profile.games.competitive.lost}
Draws: ${profile.games.competitive.draw}
Played: ${profile.games.competitive.played}
Win rate: ${profile.games.competitive.win_rate}`)

    outro('You\'re all set!')
  })
}

// To try this file, uncomment this line and run 'node example/overwatch-example.js'
// For inputs you can try 'PC', 'EU' and 'Fishie#21494'
//
// main()

module.exports = {
  main
}
