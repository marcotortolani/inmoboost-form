// 'use client'
// import { useState } from 'react'

// export default function useLocalStorage(key, initialValue) {
//   // if (typeof window === 'undefined') return [initialValue, () => {}]
//   const [storedValue, setStoredValue] = useState(() => {
//     const item = localStorage.getItem(key)

//     if (item === null) {
//       localStorage.setItem(key, JSON.stringify(initialValue))
//       return initialValue
//     }
//     return JSON.parse(item)
//   })

//   const setValue = (value) => {
//     setStoredValue(value)
//     if (typeof window === 'undefined') return
//     localStorage.setItem(key, JSON.stringify(value))
//   }

//   return [storedValue, setValue]
// }

'use client'
import { useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  if (typeof window !== 'undefined') {
  }
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key)
      if (item === null) {
        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }
      return JSON.parse(item)
    }
  })

  const setValue = (value) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
