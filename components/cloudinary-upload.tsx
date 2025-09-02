"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, AlertCircle } from "lucide-react"

interface CloudinaryUploadProps {
  onUpload: (url: string, publicId: string) => void
  disabled?: boolean
}

export function CloudinaryUpload({ onUpload, disabled }: CloudinaryUploadProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load Cloudinary Upload Widget script
    if (typeof window !== "undefined" && !window.cloudinary) {
      const script = document.createElement("script")
      script.src = "https://upload-widget.cloudinary.com/global/all.js"
      script.onload = () => setIsLoaded(true)
      script.onerror = () => setError("Failed to load Cloudinary widget")
      document.head.appendChild(script)
    } else if (window.cloudinary) {
      setIsLoaded(true)
    }
  }, [])

  const openUploadWidget = () => {
    if (!isLoaded || !window.cloudinary) {
      setError("Cloudinary widget not loaded")
      return
    }

    // You'll need to replace 'your_cloud_name' with your actual Cloudinary cloud name
    // and set up an unsigned upload preset in your Cloudinary dashboard
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhaoitlbq", // Replace with your cloud name
        uploadPreset: "openWedding", // Replace with your upload preset
        sources: ["local", "camera"],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
        maxFileSize: 10000000, // 10MB
        folder: "event-photos",
        tags: ["event", "user-upload"],
        context: {
          caption: "Event photo upload",
        },
        eager: [{ width: 800, height: 600, crop: "limit", quality: "auto" }],
      },
      (error: any, result: any) => {
        if (error) {
          setError("Upload failed: " + error.message)
          return
        }

        if (result.event === "success") {
          onUpload(result.info.secure_url, result.info.public_id)
        }
      },
    )

    widget.open()
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive text-sm">
        <AlertCircle className="h-4 w-4" />
        {error}
      </div>
    )
  }

  return (
    <Button onClick={openUploadWidget} disabled={disabled || !isLoaded} className="flex items-center gap-2">
      <Upload className="h-4 w-4" />
      {!isLoaded ? "Loading..." : "Upload to Cloudinary"}
    </Button>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    cloudinary: any
  }
}
