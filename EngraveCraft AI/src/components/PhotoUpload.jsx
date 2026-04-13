import { useState, useRef } from 'react';
import { Upload, Image, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhotoUpload({ onImageUploaded, uploadedUrl, onClear }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const padToSquare = (file) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const size = Math.max(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        const offsetX = Math.floor((size - img.width) / 2);
        const offsetY = Math.floor((size - img.height) / 2);
        ctx.drawImage(img, offsetX, offsetY);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      };
      img.src = url;
    });
  };

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsUploading(true);
    const paddedBlob = await padToSquare(file);
    const paddedFile = new File([paddedBlob], file.name.replace(/\.[^.]+$/, '.png'), { type: 'image/png' });
    const { file_url } = await base44.integrations.Core.UploadFile({ file: paddedFile });
    onImageUploaded(file_url);
    setIsUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  if (uploadedUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <div className="relative rounded-xl overflow-hidden border border-border bg-card">
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-full max-h-[400px] object-contain bg-black/20"
          />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border
                       hover:bg-destructive hover:text-destructive-foreground transition-all duration-200
                       opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Original Photo</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${isDragging
          ? 'border-primary bg-primary/5 scale-[1.02]'
          : 'border-border hover:border-primary/50 hover:bg-card/50'
        }
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {isUploading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
            {isDragging ? (
              <Image className="w-7 h-7 text-primary" />
            ) : (
              <Upload className="w-7 h-7 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isDragging ? 'Drop your photo here' : 'Upload a photo'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag & drop or click to browse · PNG, JPG, WEBP
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}