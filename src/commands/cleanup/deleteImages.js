import chalk from 'chalk'
import Gitlab from '../../gitlab/config'
import { logger } from '../../util'

export default async function deleteImages (details, selectedTag, { deleteTagsRegex, keepN, olderThan }) {
  logger.info('İmajlar verilen argumanlara göre siliniyor:', { selectedTag, deleteTagsRegex, keepN, olderThan })

  const results = details.filtered.map(repo => {
    logger.debug(chalk.blue(repo.name), 'temizleniyor')
    const tag = !deleteTagsRegex && repo.tags.find(tag => tag.group === selectedTag)

    // Do nothing if deleteTagsRegex is not defined and group not found or tag count is less than 5
    if (!deleteTagsRegex && (!tag || tag.list.length <= 5)) {
      logger.warn('Temizlenecek imaj sürümü yok ya da yeterli değil')
      return Promise.resolve()
    }

    return Gitlab.client
      .delete(`/projects/${repo.project_id}/registry/repositories/${repo.id}/tags`, {
        params: {
          name_regex_delete: deleteTagsRegex || `.*-${tag.group}`,
          keep_n: keepN,
          older_than: olderThan
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
