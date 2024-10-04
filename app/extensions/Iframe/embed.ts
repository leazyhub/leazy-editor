interface ServiceType {
  label: string
  value: string
  icon: string
}
export const VideoServices: ServiceType[] = [
  { label: 'Youtube', value: 'youtube', icon: 'i-simple-icons-youtube' },
  {
    label: 'BiliBili',
    value: 'bilibili',
    icon: 'i-simple-icons-bilibili',
  },
  {
    label: 'QQVideo',
    value: 'qqvideo',
    icon: 'i-simple-icons-bilibili',
  },
]

export const MapServices: ServiceType[] = [
  { label: 'Google Maps', value: 'google_map', icon: 'i-simple-icons-googlemaps' },
  { label: 'Baidu', value: 'baidu_map', icon: 'i-simple-icons-baidu' },
]

export const DesignServices: ServiceType[] = [
  { label: 'Modao', value: 'modao', icon: 'i-simple-icons-aircall' },
  { label: 'Lanhu', value: 'lanhu', icon: 'i-simple-icons-aircall' },
  { label: 'Figma', value: 'figma', icon: 'i-simple-icons-figma' },
  { label: 'Canva', value: 'canva', icon: 'i-simple-icons-canva' },
  { label: 'ProcessOn', value: 'processon', icon: 'i-simple-icons-aircall' },
]

export const DevelopServices: ServiceType[] = [{ label: 'CodePen', value: 'codepen', icon: 'i-simple-icons-codepen' }]

export const DataServices: ServiceType[] = [{ label: 'Jinshuju', value: 'jinshuju', icon: 'i-simple-icons-aircall' }]

export const OtherServices = []

export const AllEmbedServices = [
  ...VideoServices,
  ...MapServices,
  ...DesignServices,
  ...DevelopServices,
  ...DataServices,
  ...OtherServices,
]

export const getEmbedService = value => {
  for (let item of AllEmbedServices) {
    if (item.value === value) {
      return item
    }
  }

  return {}
}

/**
 * Embed service link
 * @id source id
 * @exmplae example link
 * @src source src, used in iframe
 */
export const EmbedServiceLink = {
  youtube: {
    example: 'https://www.youtube.com/watch?v=I4sMhHbHYXM',
    src: 'https://www.youtube.com/embed/I4sMhHbHYXM',
    srcPrefix: 'https://www.youtube.com/embed',
    linkRule: ['www.youtube.com\\/watch\\?v=\\w+'],
  },
  youku: {
    example: 'https://v.youku.com/v_show/id_XNDM0NDM4MTcy.html?spm=a2h0c.8166622.PhoneSokuUgc_4.dtitle',
    src: 'https://player.youku.com/embed/XNDM0NDM4MTcy',
    srcPrefix: 'https://player.youku.com/embed',
    linkRule: ['v.youku.com\\/v_show\\/id_\\w+\\=*'],
    idRule: 'id_\\w+\\=*',
  },
  bilibili: {
    example: 'https://www.bilibili.com/video/BV1EJ411u7DN',
    src: 'https://player.bilibili.com/player.html?bvid=BV1EJ411u7DN',
    srcPrefix: 'https://player.bilibili.com/player.html?bvid',
    linkRule: ['www.bilibili.com\\/video\\/\\w+'],
  },
  qqvideo: {
    example: 'https://v.qq.com/x/cover/mzc0020006aw1mn/u0033nvzb5v.html',
    src: 'https://v.qq.com/txp/iframe/player.html?vid=u0033nvzb5v',
    srcPrefix: 'https://v.qq.com/txp/iframe/player.html?vid',
    linkRule: ['v.qq.com\\/x\\/cover\\/\\w+\\/\\w+'],
  },
  amap: {
    example: 'https://ditu.amap.com/',
    src: 'https://www.amap.com/place/B000A45467',
    srcPrefix: '',
    linkRule: ['\\.amap\\.com'],
  },
  google_map: {
    example: 'https://www.google.fr/maps/place/1+Pl.+de+la+Concorde,+75001+Paris/@48.8658016,2.3215526,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66e2d43c9b371:0x95e62d21bb185ad8!8m2!3d48.8658016!4d2.3241275!16s%2Fg%2F11b8zdrlpc?entry=ttu',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.069988382091!2d2.321552615674724!3d48.86580157928807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2d43c9b371%3A0x95e62d21bb185ad8!2s1%20Pl.%20de%20la%20Concorde%2C%207501%20Paris!5e0!3m2!1sfr!2sfr!4v1617377087009!5m2!1sfr!2sfr',
    srcPrefix: 'https://www.google.com/maps/embed?pb=',
    linkRule: [
      'google\\.[a-z]+\\/maps\\/place\\/[^/]+\\/[^/]+\\/(?:@[^/]+)?', // Places
      'google\\.[a-z]+\\/maps\\/dir\\/[^/]+\\/[^/]+', // Directions
      'google\\.[a-z]+\\/maps\\/search\\/[^/]+', // Search
      'google\\.[a-z]+\\/maps\\/view', // Street view
      'google\\.[a-z]+\\/maps\\/@' // Coordinates
    ],
  },
  baidu_map: {
    example: 'https://j.map.baidu.com/15/fo',
    src: 'https://j.map.baidu.com/15/fo',
    srcPrefix: '',
    linkRule: ['map\\.baidu\\.com'],
  },
  modao: {
    example: 'https://free.modao.cc/app/2cd26580a6717a147454df7470e7ec464093cba3/embed/v2#screen=sk71k6d1dfxulzx',
    src: 'https://free.modao.cc/app/6UkpAxcGE3nPz52GLqhnOZgC7MATBSy/embed/v2',
    srcPrefix: '',
    linkRule: ['https:\\/\\/\\w+.modao.cc\\/app\\/\\w+\\/embed\\/v2'],
    tips: 'Modao > More > Share > Embed > COPY',
  },
  lanhu: {
    example: 'https://lanhuapp.com/link/#/invite?sid=evP7L',
    src: 'https://lanhuapp.com/url/evP7L',
    srcPrefix: '',
    linkRule: ['https:\\/\\/lanhuapp.com\\/url\\/\\w+'],
    tips: 'Lanhu > Project > Share > Copy Link',
  },
  figma: {
    example: 'https://www.figma.com/file/aS9uSgPXoNpaPkzbjNcK8v/Demo?node-id=0%3A1',
    src: 'https://www.figma.com/file/aS9uSgPXoNpaPkzbjNcK8v/Demo?node-id=0%3A1',
    srcPrefix: 'https://www.figma.com/embed?embed_host=share&url',
    linkRule: ['https:\\/\\/www.figma.com\\/file\\/\\w+'],
  },
  canva: {
    example: 'https://www.canva.cn/design/DAD61-t29UI/view',
    src: 'https://www.canva.cn/design/DAD61-t29UI/view',
    srcPrefix: '',
    linkRule: ['https:\\/\\/www.canva.cn\\/design\\/.+\\/view'],
  },
  processon: {
    example: 'https://www.processon.com/embed/5ea99d8607912948b0e6fe78',
    src: 'https://www.processon.com/embed/5ea99d8607912948b0e6fe78',
    srcPrefix: '',
    linkRule: ['https:\\/\\/www.processon.com\\/embed\\/\\w+'],
  },
  codepen: {
    example: 'https://codepen.io/mekery/embed/YzyrKOJ',
    src: 'https://codepen.io/mekery/embed/YzyrKOJ',
    srcPrefix: '',
    linkRule: ['https:\\/\\/codepen.io\\/.+\\/embed\\/\\w+'],
  },
  jinshuju: {
    example: 'https://jinshuju.net/f/q9YvVf',
    src: 'https://jinshuju.net/f/q9YvVf',
    srcPrefix: '',
    linkRule: ['https:\\/\\/jinshuju.net\\/f\\/\\w+'],
  },
  iframe: {
    example: 'https://v.youku.com/v_show/id_XNDM0NDM4MTcy.html',
    src: 'https://player.youku.com/embed/XNDM0NDM4MTcy',
    srcPrefix: '',
    linkRule: ['.+'],
  },
}

function getYoutubeSrc(originalLink, result) {
  let link = EmbedServiceLink.youtube
  let url = result.matchedUrl
  result.validLink = true

  let splits = url.split('=')
  let len = splits.length
  if (len > 0) {
    let id = splits[len - 1]
    result.src = `${link.srcPrefix}/${id}`
    result.validId = true
  }

  return result
}

function getYoukuSrc(originalLink, result) {
  let link = EmbedServiceLink.youku
  let url = result.matchedUrl

  let idRule = link.idRule
  let regex = new RegExp(idRule)
  let match = url.match(regex)
  if (match && match.length > 0) {
    let id = match[0].substr(3)

    result.validId = true
    result.src = `${link.srcPrefix}/${id}`
  } else {
    result.validId = false
  }

  return result
}

function getBilibiliSrc(originalLink, result) {
  let link = EmbedServiceLink.bilibili
  let url = result.matchedUrl

  let splits = url.split('/')
  let len = splits.length
  if (len > 0) {
    let id = splits[len - 1]
    result.src = `${link.srcPrefix}=${id}`
    result.validId = true
  }

  return result
}

function getQQVideoSrc(originalLink, result) {
  let link = EmbedServiceLink.qqvideo
  let url = result.matchedUrl

  let splits = url.split('/')
  let len = splits.length
  if (len > 0) {
    let id = splits[len - 1]
    result.src = `${link.srcPrefix}=${id}`
    result.validId = true
  }

  return result
}

function getAMapSrc(originalLink, result) {
  result.src = originalLink
  result.validId = true

  return result
}

function getBaiduMapSrc(originalLink, result) {
  result.src = originalLink
  result.validId = true

  return result
}

/*function getGoogleMapSrc(originalLink, result) {
  result.src = result.matchedUrl
  result.validId = true
  result.originalLink = result.src

  return result
}*/

function getGoogleMapSrc(originalLink, result) {
  let link = EmbedServiceLink.google_map;
  let url = result.matchedUrl;

  // Extract the path part that starts after '/maps/'
  let pathMatch = url.match(/\/maps\/(.*)$/);
  if (pathMatch && pathMatch[1]) {
    let path = pathMatch[1];
    result.src = `${link.srcPrefix}!1m0!2m0!3m1!4b1!4m${path}`;
    result.validId = true;
  } else {
    result.validId = false;
  }

  return result;
}

function getModaoSrc(originalLink, result) {
  result.src = result.matchedUrl
  result.validId = true
  result.originalLink = result.src

  return result
}

function getLanhuSrc(originalLink, result) {
  result.src = result.matchedUrl
  result.validId = true
  result.originalLink = result.src

  return result
}

function getFigmaSrc(originalLink, result) {
  let link = EmbedServiceLink.figma
  result.src = `${link.srcPrefix}=${encodeURIComponent(result.matchedUrl)}`
  result.validId = true
  result.originalLink = result.matchedUrl

  return result
}

function getCanvaSrc(originalLink, result) {
  result.src = `${result.matchedUrl}?embed`
  result.validId = true
  result.originalLink = originalLink

  return result
}

function getProcessonSrc(originalLink, result) {
  result.src = `${result.matchedUrl}`
  result.validId = true
  result.originalLink = originalLink

  return result
}

function getCodepenSrc(originalLink, result) {
  result.src = `${result.matchedUrl}`
  result.validId = true
  result.originalLink = result.src

  return result
}

function getJinshujuSrc(originalLink, result) {
  result.src = `${result.matchedUrl}?background=white&banner=show&embedded=true`
  result.validId = true
  result.originalLink = originalLink

  return result
}

function getCommonSrc(originalLink, result) {
  result.src = `${result.matchedUrl}`
  result.validId = true
  result.originalLink = originalLink

  return result
}

function getMatchedUrl(service, originalLink, result) {
  let link = EmbedServiceLink[service]
  let linkRule = link.linkRule

  for (let rule of linkRule) {
    let regex = new RegExp(rule)
    let match = originalLink.match(regex)
    if (match && match.length > 0) {
      result.validLink = true
      result.matchedUrl = originalLink

      return result
    }
  }

  return result
}

export function getExampleUrl(service: string) {
  let exampleUrl = ''
  let link = EmbedServiceLink[service]
  if (link) {
    exampleUrl = link.example
  }
  return exampleUrl
}

export const getServiceSrc = (service, originalLink) => {
  let result = {
    validLink: false,
    validId: false,
    matchedUrl: '',
    originalLink: originalLink,
    src: '',
  }

  // matched url
  result = getMatchedUrl(service, originalLink, result)
  if (!result.validLink) {
    return result
  }

  // src
  switch (service) {
    case 'youtube':
      return getYoutubeSrc(originalLink, result)
    case 'youku':
      return getYoukuSrc(originalLink, result)
    case 'bilibili':
      return getBilibiliSrc(originalLink, result)
    case 'qqvideo':
      return getQQVideoSrc(originalLink, result)
    case 'amap':
      return getAMapSrc(originalLink, result)
    case 'baidu_map':
      return getBaiduMapSrc(originalLink, result)
    case 'google_map':
      return getGoogleMapSrc(originalLink, result)
    case 'modao':
      return getModaoSrc(originalLink, result)
    case 'lanhu':
      return getLanhuSrc(originalLink, result)
    case 'figma':
      return getFigmaSrc(originalLink, result)
    case 'canva':
      return getCanvaSrc(originalLink, result)
    case 'processon':
      return getProcessonSrc(originalLink, result)
    case 'codepen':
      return getCodepenSrc(originalLink, result)
    case 'jinshuju':
      return getJinshujuSrc(originalLink, result)
    case 'iframe':
      return getCommonSrc(originalLink, result)
  }

  return result
}
