'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function GallerySearchForm({ initialQuery }: { initialQuery: string }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({ search: searchQuery, page: '1' })
    router.push(`/dashboard/galleries?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-[300px] items-center space-x-2">
      <Input
        type="search"
        placeholder="Search galleries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" size="icon">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search galleries</span>
      </Button>
    </form>
  )
}

