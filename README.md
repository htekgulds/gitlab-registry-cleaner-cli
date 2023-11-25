# Gitlab Registry Cleaner CLI (grc)

Hello there!

This is my first real (kinda) open source project. It is a container registry cleaner cli tool for Gitlab. There are currently 2 commands: stats and cleanup

stats for registry statistics and cleanup for actually cleaning up the container registry.

Credits are due for the following awesome libraries:

* [yargs](https://yargs.js.org/) - for easy cli creation (commands, options, help, etc.)
* [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) - for beautiful, step-by-step style cli prompts
* also [chalk](https://www.npmjs.com/package/chalk) and [boxen](https://www.npmjs.com/package/boxen) - for further styling

This is like a hobby project for me but I'm open to suggestions and contributions for making it more useful.

# Installing

`npm install --global gitlab-registry-cleaner-cli`

# Usage

Before usign the `grc` tool, you need to define some variables for your Gitlab environment.

First time you run `grc`, it will show you what to do. Then you can use either `grc stats` or `grc cleanup` commands and it will guide you step by step
