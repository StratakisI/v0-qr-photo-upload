import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Settings } from "lucide-react"

export function GitHubPagesNote() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Github className="h-5 w-5" />
          GitHub Pages Deployment
          <Badge variant="secondary">Static Site</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p className="mb-3">This app is designed to work with GitHub Pages as a static site. To deploy:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Push your code to a GitHub repository</li>
            <li>Enable GitHub Pages in repository settings</li>
            <li>Set up Cloudinary for photo uploads</li>
            <li>Update the Cloudinary configuration in the upload component</li>
          </ol>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start gap-2 mb-2">
            <Settings className="h-4 w-4 text-primary mt-0.5" />
            <span className="font-medium text-sm">Cloudinary Setup Required:</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 ml-6">
            <li>• Create a free Cloudinary account</li>
            <li>• Set up an unsigned upload preset</li>
            <li>• Replace 'your_cloud_name' and 'your_upload_preset' in the upload component</li>
            <li>• Configure CORS settings for your domain</li>
          </ul>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ExternalLink className="h-3 w-3" />
          <span>Perfect for QR code sharing at events</span>
        </div>
      </CardContent>
    </Card>
  )
}
