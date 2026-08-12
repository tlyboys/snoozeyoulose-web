import {
  Download,
  Apple,
  MonitorDown,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { downloads, latestReleaseUrl, type Platform } from '@/lib/download'
import type { Dictionary } from '@/app/[lang]/dictionaries'

const platformOrder: Platform[] = ['mac', 'windows', 'linux']

const platformIcons: Record<Platform, LucideIcon> = {
  mac: Apple,
  windows: MonitorDown,
  linux: Terminal,
}

export function DownloadSection({ dict }: { dict: Dictionary['download'] }) {
  return (
    <section
      id="download"
      className="scroll-mt-16 border-t border-border/60 bg-muted/30 py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            {dict.subtitle}
          </p>
          <Badge variant="outline" className="mt-4" asChild>
            <a
              href={latestReleaseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.versionLabel} ↗
            </a>
          </Badge>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {platformOrder.map((platform) => {
            const entries = downloads.filter((d) => d.platform === platform)
            const Icon = platformIcons[platform]
            return (
              <Card key={platform} className="h-full">
                <CardHeader>
                  <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="text-lg">
                    {dict.platform[platform]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {entries.map((entry) => (
                    <Button
                      key={entry.arch}
                      variant="outline"
                      className="h-10 w-full justify-between"
                      asChild
                    >
                      <a href={entry.url} download>
                        <span className="flex items-center gap-2">
                          <Download className="size-4" />
                          {dict.arch[entry.arch]}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase">
                          {entry.ext}
                        </span>
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
