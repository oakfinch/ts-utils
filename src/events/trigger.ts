export const trigger = <T>(name: string, detail?: T) => {
  if (typeof window === 'undefined') {
    return
  }
  window?.document?.dispatchEvent(new CustomEvent(name, { detail }))
}

export default trigger
