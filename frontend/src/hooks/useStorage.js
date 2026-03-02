export default function useStorage(key) {
  const getValue = () => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return { getValue, setValue }
}
