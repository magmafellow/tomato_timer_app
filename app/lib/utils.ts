export function showTimeFromSeconds(allSeconds: number) {
  let minutes: string | number = Math.floor(allSeconds / 60)
  let seconds: string | number = allSeconds % 60
  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds

  return `${minutes}:${seconds}`
}

export function getTotalSecsFromTimeObj(obj: {
  seconds: number
  minutes: number
}): number {
  return obj.seconds + obj.minutes * 60
}

export function getSelectValues() {
  const minutes = Number(document.querySelector<any>('[id="mins"]')?.value)
  const seconds = Number(document.querySelector<any>('[id="secs"]')?.value)

  return { minutes, seconds }
}

export function getSelectValuesRelax() {
  const minutes = Number(
    document.querySelector<any>('[id="mins_relax"]')?.value
  )
  const seconds = Number(
    document.querySelector<any>('[id="secs_relax"]')?.value
  )

  return { minutes, seconds }
}

export function fireToast(id: string) {
  const toast = document.querySelector(`#${id}`)
  toast?.classList.add('show')
  setTimeout(function () {
    // toast.className = toast.className.replace('show', '')
    toast?.classList.remove('show')
  }, 3000)
}

export function makeStartSound() {
  const audio = new Audio('/start.mp3')
  audio.play()
}
