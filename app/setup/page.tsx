import { GitHubPagesNote } from "@/components/github-pages-note"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Smartphone, Zap } from "lucide-react"

export default function SetupPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Setup Guide</h1>
        <p className="text-muted-foreground">Get your event photo gallery ready for deployment</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GitHubPagesNote />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once deployed, generate a QR code pointing to your GitHub Pages URL for easy event access.
            </p>
            <div className="bg-muted/50 p-3 rounded text-xs font-mono">https://yourusername.github.io/event-photos</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Mobile Optimized
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
                <span>Responsive design for all devices</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
                <span>Touch-friendly interface</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
                <span>Camera integration for uploads</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
                <span>Drag & drop photo uploads</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
                <span>Photo gallery with lightbox</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
                <span>Like and share functionality</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
                <span>Celebratory design theme</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
