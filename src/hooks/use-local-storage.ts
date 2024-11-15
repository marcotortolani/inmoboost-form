//'use client'
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

// 'use client'
// import { useState } from 'react'

// export default function useLocalStorage(key, initialValue) {
//   if (typeof window === 'undefined') return

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [storedValue, setStoredValue] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const item = localStorage.getItem(key)
//       if (item === null) {
//         localStorage.setItem(key, JSON.stringify(initialValue))
//         return initialValue
//       }
//       return JSON.parse(item)
//     }
//   })

//   const setValue = (value) => {
//     setStoredValue(value)
//     localStorage.setItem(key, JSON.stringify(value))
//   }

//   return [storedValue, setValue]
// }

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [firstLoadDone, setFirstLoadDone] = useState(false)
  const previousStoredValue = useRef<T | null>(null)

  // Cargar valor inicial de localStorage en el primer render
  useEffect(() => {
    const fromLocal = () => {
      if (typeof window === 'undefined') {
        return initialValue
      }
      try {
        const item = window.localStorage.getItem(key)
        const parsedItem = item ? (JSON.parse(item) as T) : initialValue
        previousStoredValue.current = parsedItem // Almacenar el valor inicial
        return parsedItem
      } catch (error) {
        console.error(error)
        return initialValue
      }
    }

    setStoredValue(fromLocal)
    setFirstLoadDone(true)
  }, [initialValue, key])

  // Guardar en localStorage solo si storedValue cambió realmente
  useEffect(() => {
    if (!firstLoadDone) return

    try {
      if (
        typeof window !== 'undefined' &&
        previousStoredValue.current !== storedValue
      ) {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
        previousStoredValue.current = storedValue // Actualizar el valor previo
      }
    } catch (error) {
      console.log(error)
    }
  }, [storedValue, firstLoadDone, key])

  return [storedValue, setStoredValue]
}
