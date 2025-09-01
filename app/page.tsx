"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Heart, Share2, Download, Users, Sparkles } from "lucide-react"

interface Photo {
  id: string
  url: string
  title: string
  uploadedBy: string
  uploadedAt: Date
  likes: number
}

export default function EventPhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "/v0-qr-photo-upload/happy-people-at-party-with-colorful-lights.png",
      title: "Opening Ceremony",
      uploadedBy: "Sarah M.",
      uploadedAt: new Date("2024-01-15T10:30:00"),
      likes: 24,
    },
    {
      id: "2",
      url: "/v0-qr-photo-upload/group-selfie-at-outdoor-event-with-sunset.png",
      title: "Sunset Vibes",
      uploadedBy: "Mike R.",
      uploadedAt: new Date("2024-01-15T18:45:00"),
      likes: 18,
    },
    {
      id: "3",
      url: "/v0-qr-photo-upload/food-table-at-celebration-with-decorations.png",
      title: "Delicious Spread",
      uploadedBy: "Emma L.",
      uploadedAt: new Date("2024-01-15T12:15:00"),
      likes: 31,
    },
  ])

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Simulate upload to Cloudinary
    setTimeout(() => {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url: URL.createObjectURL(file),
        title: file.name.split(".")[0],
        uploadedBy: "You",
        uploadedAt: new Date(),
        likes: 0,
      }
      setPhotos((prev) => [newPhoto, ...prev])
      setIsUploading(false)
    }, 2000)
  }

  const handleLike = (photoId: string) => {
    setPhotos((prev) => prev.map((photo) => (photo.id === photoId ? { ...photo, likes: photo.likes + 1 } : photo)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="absolute inset-0 bg-[url('/v0-qr-photo-upload/celebration-confetti-pattern.png')] opacity-5"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Event Memories
            </h1>
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share your amazing moments and discover memories from fellow attendees
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Camera className="mr-2 h-5 w-5" />
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{photos.length} photos shared</span>
            </div>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>
      </div>

      {/* Upload Zone */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 hover:border-primary/50 transition-colors duration-300">
          <CardContent className="p-8 text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Upload</h3>
            <p className="text-muted-foreground mb-4">Drag and drop your photos here or click to browse</p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="border-primary/50 hover:bg-primary/10"
            >
              Choose Files
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Photo Gallery */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Photo Gallery</h2>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {photos.length} Photos
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-card/50 backdrop-blur-sm"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm mb-1">{photo.title}</h3>
                  <p className="text-xs text-white/80">by {photo.uploadedBy}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(photo.id)
                      }}
                      className="text-muted-foreground hover:text-primary p-1 h-auto"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {photo.likes}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-primary p-1 h-auto"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url || "/placeholder.svg"}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedPhoto.title}</h3>
                  <p className="text-muted-foreground">
                    Uploaded by {selectedPhoto.uploadedBy} • {selectedPhoto.uploadedAt.toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPhoto(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike(selectedPhoto.id)}
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {selectedPhoto.likes} Likes
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
