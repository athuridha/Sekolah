import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="flex items-center gap-1 text-sm leading-loose text-muted-foreground">
          Made with <Heart className="h-4 w-4 text-red-500" fill="currentColor" /> by Amara Thuridha
        </p>
      </div>
    </footer>
  )
}

