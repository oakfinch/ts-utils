import { getGlobal } from '../env/get-global'

export const getScript = (src: string) => {
  const { document: doc } = getGlobal()
  const script = doc.createElement('script')
  const done = () => {
    script.onload = null
    script.onerror = null
    script.onabort = null
    script.remove()
  }

  return new Promise<void>((resolve, reject) => {
    script.onload = () => {
      done()
      resolve()
    }
    script.onerror = ev => {
      done()
      reject(ev)
    }
    script.onabort = script.onerror
    script.async = true
    script.src = src
    doc.head.appendChild(script)
  })
}

export default getScript
