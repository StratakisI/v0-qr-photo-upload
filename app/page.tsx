"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudinaryUpload } from "@/components/cloudinary-upload"
import { Camera, Upload, Heart, Share2, Download, Users, Sparkles } from "lucide-react"

interface Photo {
  id: string
  url: string
  publicId?: string
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

  useEffect(() => {
    const loadPhotos = async () => {
      // Load from localStorage first
      const savedPhotos = localStorage.getItem("event-photos")
      if (savedPhotos) {
        try {
          const parsedPhotos = JSON.parse(savedPhotos).map((photo: any) => ({
            ...photo,
            uploadedAt: new Date(photo.uploadedAt),
          }))
          setPhotos((prev) => [...parsedPhotos, ...prev.filter((p) => p.id === "1" || p.id === "2" || p.id === "3")])
        } catch (error) {
          console.error("Failed to load saved photos:", error)
        }
      }

      // Fetch photos from Cloudinary
      try {
        const response = await fetch(`https://res.cloudinary.com/dhaoitlbq/image/list/event.json`)
        if (response.ok) {
          const data = await response.json()
          const cloudinaryPhotos: Photo[] = data.resources.map((resource: any) => ({
            id: resource.public_id,
            url: resource.secure_url,
            publicId: resource.public_id,
            title: resource.context?.caption || `Photo ${resource.public_id.split("/").pop()}`,
            uploadedBy: "Event Guest",
            uploadedAt: new Date(resource.created_at),
            likes: 0,
          }))

          setPhotos((prev) => {
            const existingIds = new Set(prev.map((p) => p.id))
            const newPhotos = cloudinaryPhotos.filter((p) => !existingIds.has(p.id))
            return [...newPhotos, ...prev]
          })
        }
      } catch (error) {
        console.error("Failed to fetch photos from Cloudinary:", error)
      }
    }

    loadPhotos()
  }, [])

  useEffect(() => {
    const userPhotos = photos.filter((photo) => !["1", "2", "3"].includes(photo.id))
    if (userPhotos.length > 0) {
      localStorage.setItem("event-photos", JSON.stringify(userPhotos))
    }
  }, [photos])

  const handleCloudinaryUpload = (url: string, publicId: string) => {
    const newPhoto: Photo = {
      id: publicId,
      url: url,
      publicId: publicId,
      title: `Photo ${Date.now()}`,
      uploadedBy: "You",
      uploadedAt: new Date(),
      likes: 0,
    }
    setPhotos((prev) => [newPhoto, ...prev])
    setIsUploading(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    const tempPhoto: Photo = {
      id: `temp-${Date.now()}`,
      url: URL.createObjectURL(file),
      title: file.name.split(".")[0],
      uploadedBy: "You (uploading...)",
      uploadedAt: new Date(),
      likes: 0,
    }
    setPhotos((prev) => [tempPhoto, ...prev])

    // Note: This is still a fallback - users should use the Cloudinary upload button
    setTimeout(() => {
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
            <CloudinaryUpload onUpload={handleCloudinaryUpload} disabled={isUploading} />

            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{photos.length} photos shared</span>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-sm"
            >
              <Camera className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Or upload from device"}
            </Button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>
      </div>

      {/* Upload Zone */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 hover:border-primary/50 transition-colors duration-300">
          <CardContent className="p-8 text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Upload to Cloudinary</h3>
            <p className="text-muted-foreground mb-4">Upload your photos directly to the cloud for permanent storage</p>
            <CloudinaryUpload onUpload={handleCloudinaryUpload} disabled={isUploading} />
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
                {photo.publicId && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    ☁️ Saved
                  </div>
                )}
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
