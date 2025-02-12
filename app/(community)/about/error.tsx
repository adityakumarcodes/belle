'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error }: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h4 className='bg-red-400 text-white p-2'>Something went wrong!</h4>
    </div>
  )
}