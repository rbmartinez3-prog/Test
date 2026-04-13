import { useState } from 'react';
import { Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import PhotoUpload from '../components/PhotoUpload';
import StyleCategory from '../components/StyleCategory';
import ImagePreview from '../components/ImagePreview';
import { STYLE_CATEGORIES, STYLE_PROMPTS, getStyleLabel } from '../lib/engraving-styles';
import { toast } from '@/components/ui/use-toast';

export default function Home() {
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleSelectStyle = async (styleValue) => {
    if (!uploadedUrl) {
      toast({ title: "Upload a photo first", description: "Please upload a photo before selecting a style." });
      return;
    }

    setSelectedStyle(styleValue);
    setResultUrl(null);
    setIsProcessing(true);

    const prompt = STYLE_PROMPTS[styleValue];
    const fullPrompt = `${prompt}\n\nIMPORTANT: The output must be a clean black and white image optimized for laser engraving. Maintain recognizability of the original subject.${
      specialInstructions ? `\n\nAdditional instructions: ${specialInstructions}` : ''
    }`;
    const result = await base44.integrations.Core.GenerateImage({
      prompt: fullPrompt,
      existing_image_urls: [uploadedUrl],
    });

    setResultUrl(result.url);
    setIsProcessing(false);
  };

  const handleClear = () => {
    setUploadedUrl(null);
    setSelectedStyle(null);
    setResultUrl(null);
  };

  const handleReset = () => {
    setSelectedStyle(null);
    setResultUrl(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold font-heading text-foreground tracking-tight">
                LaserForge
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Photo to Engrave
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 pb-2"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Transform Photos for{' '}
            <span className="text-primary">Laser Engraving</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Upload your photo, choose a style, and get a laser-ready image in seconds.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column — Upload + Styles */}
          <div className="space-y-6">
            <PhotoUpload
              onImageUploaded={setUploadedUrl}
              uploadedUrl={uploadedUrl}
              onClear={handleClear}
            />

            {uploadedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-5"
              >
                <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Special Instructions (optional)</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. make the background darker, emphasize the eyes, add more contrast..."
                  rows={2}
                  className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Choose Style
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {STYLE_CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    <StyleCategory
                      title={cat.title}
                      description={cat.description}
                      icon={cat.icon}
                      styles={cat.styles}
                      selectedStyle={selectedStyle}
                      onSelectStyle={handleSelectStyle}
                      disabled={isProcessing}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right column — Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {uploadedUrl && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ImagePreview
                  originalUrl={uploadedUrl}
                  resultUrl={resultUrl}
                  isProcessing={isProcessing}
                  styleName={selectedStyle ? getStyleLabel(selectedStyle) : null}
                  onReset={handleReset}
                />
              </motion.div>
            )}

            {!uploadedUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:flex flex-col items-center justify-center h-96 rounded-xl border border-dashed border-border text-muted-foreground"
              >
                <span className="text-4xl mb-3">?</span>
                <p className="text-sm font-medium">Upload a photo to get started</p>
                <p className="text-xs mt-1">Your laser-ready result will appear here</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-muted-foreground">
            LaserForge · AI-powered photo to laser engraving converter
          </p>
        </div>
      </footer>
    </div>
  );
}