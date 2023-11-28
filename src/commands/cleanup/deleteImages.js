import chalk from 'chalk'
import Gitlab from '../../gitlab/config'
import { logger } from '../../util'

export default async function deleteImages (details, selectedTag) {
  const results = details.filtered.map(repo => {
    logger.debug(chalk.blue(repo.name), 'temizleniyor')
    const tag = repo.tags.find(tag => tag.group === selectedTag)

    // Do nothing if group not found or tag count is less than 5
    if (!tag || tag.list.length <= 5) {
      logger.warn('Temizlenecek imaj sürümü yok ya da yeterli değil')
      return Promise.resolve()
    }

    return Gitlab.client
      .delete(`/projects/${repo.project_id}/registry/repositories/${repo.id}/tags`, {
        params: {
          name_regex_delete: `.*-${tag.group}`,
          keep_n: 5,
          older_than: '7d'
        }
      })
      .then(() => logger.debug(`Temizlik başarılı: ${chalk.blue(repo.name)} - ${chalk.yellow(tag.group)}`))
      .catch(err =>
        console.error(
          `Temizlik sırasında hata: ${repo.name} - ${tag.group} - ${
            err.response?.data?.error || err.response?.data?.message || err.message || err.response?.message
          }`
        )
      )
  })

  await Promise.all(results)
}
