# Gitlab Registry Cleaner CLI (grc)

Hello there!

This is my first real (kinda) open source project. It is a container registry cleaner cli tool for Gitlab. There are currently 2 commands: `stats` and `cleanup`

`stats` for registry statistics and `cleanup` for actually cleaning up the container registry.

## Installing

Requires Node.js for now (binary will be released soon).

`npm install --global gitlab-registry-cleaner-cli`

## Usage

You can use the tool with the `grc` command.

### Commands

- `stats`: Get image statistics. Uses `group-tags-regex` option for calculating a group-by-summary
- `cleanup`: Cleanup images according to options

### Options

You can provide options to the commands in various ways.

- As command line arguments (eg. --gitlab-base-url)
- As env variables (eg. GITLAB_BASE_URL)
- From a JSON file either using the default config path or providing a path with `--config-path` option

Here is a list of options with their env variable forms and default values:

- `gitlab-base-url`: Base URL of the Gitlab instance. Env variable: `GRC_GITLAB_BASE_URL`. No default value. This option is required for the tool to function.
- `gitlab-token`: Gitlab access token authorized for deleting images. Env variable: `GRC_GITLAB_TOKEN`. No default value. This option is required for the tool to function.
- `keen-n`: Do not delete `n` number of latest image tags. Env variable: `GRC_KEEP_N`. Default value is `5`.
- `older-than`: Delete image tags older than given time (eg. 5d, 1h). Env variable: `GRC_OLDER_THAN`. Default value is `7d`.
- `group-tags-regex`: Group image tags by given regex when showing image stats or a list of groups to delete. Env variable: `GRC_GROUP_TAGS_REGEX`. Default value is `/^[a-zA-Z0-9.]+(-[0-9]+)?-(.\*)$/`.
- `delete-tags-regex`: Delete image tags matching the given regex. No list will be prompted if this option is provided. Env variable: `GRC_DELETE_TAGS_REGEX`. Default value is `.\*-test`.
- `config-path`: Config file path for getting the option values from. Env variable: `GRC_CONFIG_PATH`. Default value is `$HOME/.grc`.
- `dry-run`: Do not actually delete the image tags. Env variable: `GRC_DRY_RUN`. Default value is `false`.

Example config file content:

```json
{
  "gitlabBaseUrl": "https://git.mycompany.com", // or url (required)
  "gitlabToken": "abcdef", // or token (required)
  "keepN": 3,
  "olderThan": "3d",
  "groupTagsRegex": "/[a-zA-Z0-9.]+-(.*)/",
  "deleteTagsRegex": ".*-dev",
  "dryRun": true
}
```

Options are taken in the following order:

1. Command line arguments
2. Env variables
3. Config file
4. Default values

## Credits

Credits are due for the following awesome libraries:

- [yargs](https://yargs.js.org/) - for easy cli creation (commands, options, help, etc.)
- [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) - for beautiful, step-by-step style cli prompts
- also [chalk](https://www.npmjs.com/package/chalk) and [boxen](https://www.npmjs.com/package/boxen) - for further styling

Also there are other alternatives as far as I can see like the ones below. But I haven't seen any that can delete images in bulk so I created yet another one :sweat_smile:

- https://github.com/10up/Gitlab-Registry-Cleaner
- https://github.com/sciapp/gitlab-registry-cleanup
- https://github.com/n0madic/gitlab-registry-images-cleaner
- https://github.com/ivanetchart/gitlab-registry-cleaner

This is like a hobby project for me but I'm open to suggestions and contributions for making it more useful.
