export function fmtDuration(secs) {
  if (!secs || secs <= 0) return '—'
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  if (h > 0) return `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
  return `${m}:${s.toString().padStart(2,'0')}`
}

export function fmtClockTime(baseMinutes, offsetSecs) {
  if (baseMinutes == null) return null
  const totalMins = baseMinutes + Math.floor(offsetSecs / 60)
  const h24 = Math.floor(totalMins / 60) % 24
  const m   = totalMins % 60
  const h12 = h24 > 12 ? h24 - 12 : h24 === 0 ? 12 : h24
  return `${h12}:${m.toString().padStart(2, '0')}`
}

const isSec = (type) => type === 'header' || type === 'section'

export function buildStartTimes(order) {
  const sectionInfo = {}
  let curSecId = null
  for (const item of order) {
    if (isSec(item.type)) {
      curSecId = item.id
      sectionInfo[item.id] = { beforeService: !!item.beforeService, totalDuration: 0 }
    } else if (curSecId) {
      sectionInfo[curSecId].totalDuration += item.duration || 0
    }
  }
  const map = {}
  curSecId = null
  let beforeOffset = 0
  let afterOffset  = 0
  for (const item of order) {
    if (isSec(item.type)) {
      curSecId = item.id
      if (sectionInfo[item.id]?.beforeService) {
        beforeOffset = -(sectionInfo[item.id].totalDuration)
      }
    } else {
      if (curSecId && sectionInfo[curSecId]?.beforeService) {
        map[item.id] = beforeOffset
        beforeOffset += item.duration || 0
      } else {
        map[item.id] = afterOffset
        afterOffset  += item.duration || 0
      }
    }
  }
  return map
}

export function buildSectionTotals(order) {
  const map = {}
  let currentHeaderId = null
  let running = 0
  for (const item of order) {
    if (isSec(item.type)) {
      if (currentHeaderId) map[currentHeaderId] = running
      currentHeaderId = item.id
      running = 0
    } else {
      running += item.duration || 0
    }
  }
  if (currentHeaderId) map[currentHeaderId] = running
  return map
}
