"use client";

import { useState, useRef } from "react";
import { Upload, Trash2, Loader2, Image as ImageIcon, CheckCircle2, Plus, Cloud } from "lucide-react";

interface CloudinaryPhotoUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
  disabled?: boolean;
}

export default function CloudinaryPhotoUploader({
  images,
  onChange,
  folder = "piyush-travels/vehicles",
  disabled = false,
}: CloudinaryPhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || disabled || isUploading) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setErrorMessage(`"${file.name}" is not an image file.`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(`"${file.name}" exceeds the 10MB size limit.`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);
    setErrorMessage("");
    setUploadProgress({ current: 1, total: validFiles.length });

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const uploadedUrls: string[] = [];

      for (let i = 0; i < validFiles.length; i++) {
        setUploadProgress({ current: i + 1, total: validFiles.length });
        const fileData = new FormData();
        fileData.append("file", validFiles[i]);
        fileData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fileData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(data.message || `Failed to upload "${validFiles[i].name}" to Cloudinary`);
        }
      }

      onChange([...images, ...uploadedUrls]);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload photo to Cloudinary");
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled || isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Media & Photos
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <Cloud size={12} />
              Cloudinary Secure Storage
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Upload genuine vehicle photos. Photos are securely stored and served from Cloudinary CDN.
          </p>
        </div>

        {images.length > 0 && (
          <button
            type="button"
            disabled={isUploading || disabled}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 rounded-xl text-xs font-medium transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Plus size={14} />
            )}
            <span>{isUploading ? "Uploading..." : "Add More Photos"}</span>
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={disabled || isUploading}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="text-xs underline ml-2 text-red-300 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* When no images uploaded yet */}
      {images.length === 0 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!isUploading && !disabled) fileInputRef.current?.click();
          }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[220px] ${
            isDragging
              ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]"
              : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-950/90"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Loader2 size={28} className="animate-spin" />
              </div>
              <p className="text-sm font-medium text-white">
                Uploading to Cloudinary...
                {uploadProgress && ` (${uploadProgress.current}/${uploadProgress.total})`}
              </p>
              <p className="text-xs text-zinc-400">Optimizing and storing image securely</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shadow-inner group-hover:scale-105 transition-transform">
                <Upload size={26} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Click to choose photos or drag and drop here
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Supports JPG, PNG, WEBP (Up to 10MB each)
                </p>
              </div>
              <span className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 transition-colors shadow-sm">
                Choose Photo Files
              </span>
            </div>
          )}
        </div>
      )}

      {/* Uploaded Images Gallery Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Vehicle photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Primary Cover Badge */}
                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase shadow">
                    Cover Photo
                  </span>
                )}

                {/* Cloudinary Verified Badge */}
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-emerald-400 text-[10px] font-medium flex items-center gap-1 border border-white/10">
                  <CheckCircle2 size={10} />
                  Cloudinary
                </span>

                {/* Delete Photo Button */}
                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  title="Remove this photo"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-md"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Upload More Card */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                if (!isUploading && !disabled) fileInputRef.current?.click();
              }}
              className={`aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
                  : "border-zinc-800 hover:border-indigo-500/50 bg-zinc-950/40 hover:bg-zinc-950/80"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <Loader2 size={22} className="animate-spin text-indigo-400" />
                  <span className="text-[11px] text-zinc-300 font-medium">
                    Saving to Cloudinary...
                    {uploadProgress && ` (${uploadProgress.current}/${uploadProgress.total})`}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white">
                    <Plus size={18} />
                  </div>
                  <span className="text-xs text-zinc-300 font-medium">Upload More</span>
                  <span className="text-[10px] text-zinc-500">or drop here</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">
            Tip: The first image will be used as the primary cover photo for cards and listings.
          </p>
        </div>
      )}
    </div>
  );
}
