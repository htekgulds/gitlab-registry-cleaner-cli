import { GROUP_TAGS_REGEX, KEEP_N, OLDER_THAN } from '../defaults'

export default {
  'gitlab-base-url': {
    alias: 'url',
    describe:
      'Gitlab uygulamasının adresi (ör. https://git.mycompany.com)' /* 'Base url for gitlab instance. (eg. https:/git.company.com)' */
  },
  'gitlab-token': {
    alias: 'token',
    describe: 'İmajları silmeye yetkili Gitlab access token' /* 'Gitlab Access token authorized to delete given tags' */
  },
  'keep-n': {
    describe: 'Son yüklenen n kadar imajı silmeden bırak' /* 'Keep n number of latest tags while deleting' */,
    default: KEEP_N
  },
  'older-than': {
    describe: 'Verilen zamandan önce yüklenmiş imajları sil' /* 'Delete tags older than given amount of time' */,
    default: OLDER_THAN
  },
  'group-tags-regex': {
    describe: "İmaj sürümlerini verilen regex'e göre grupla (interaktif modda liste çıkarmak için kullanılır)",
    default: GROUP_TAGS_REGEX
  },
  'delete-tags-suffix': {
    describe: "İmajları verilen reegx'e göre sil (interaktif olmayan modda kullanılır)"
  },
  'dry-run': { describe: 'İmajları gerçekten silme', default: false, boolean: true },
  verbose: {
    alias: 'v',
    describe: 'Log ayrıntı seviyesini belirle (eg. -v -> warn, -vv -> debug gibi)',
    count: true
  }
}
