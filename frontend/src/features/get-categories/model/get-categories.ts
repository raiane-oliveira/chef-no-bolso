import { useQuery } from '@tanstack/react-query'

const API_URL = process.env.VITE_API_URL || 'http://localhost:3333'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response  = await fetch(`${API_URL}/categories`)
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      return response.json()
    },
  })
}
