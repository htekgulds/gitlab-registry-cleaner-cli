#!/usr/bin/env node
import dotenvFlow from 'dotenv-flow'
import main from '../src/index.js'
import { debug } from '../src/util.js'

// Get options from .env file while developing for ease of use
debug(() => dotenvFlow.config())

// const config = Config.set()
// debug(() => console.log('Config', config))

// Warn if Gitlab settings not present and exit
// if (!Config.isValid()) {
//   help()
//   process.exit(1)
// }

// Gitlab.setup(config)
main()
