import { useState } from 'react';
import { Download, Loader2, RotateCcw, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ImagePreview({ originalUrl, resultUrl, isProcessing, styleName, onReset }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold font-heading text-foreground">Result</h3>
          {styleName && (
            <p className="text-xs text-primary">{styleName} style applied</p>
          )}
        </div>
        {resultUrl && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-xs"
            >
              <RotateCcw className="w-3 h-3 mr-1.5" />
              Try Another
            </Button>
          </div>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden border border-border bg-card min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-16"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-primary/10 border-b-primary/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Transforming your image...</p>
                <p className="text-xs text-muted-foreground mt-1">This may take a few seconds</p>
              </div>
            </motion.div>
          ) : resultUrl ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-zoom-in group">
                    <img
                      src={resultUrl}
                      alt="Transformed"
                      className="w-full max-h-[400px] object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-2 bg-card border-border">
                  <img
                    src={resultUrl}
                    alt="Transformed full"
                    className="w-full rounded-lg"
                  />
                </DialogContent>
              </Dialog>

              <div className="p-3 border-t border-border flex justify-end">
                <Button
                  size="sm"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = resultUrl;
                    a.download = `laser-engraving-${styleName || 'result'}.png`;
                    a.target = '_blank';
                    a.click();
                  }}
                  className="text-xs font-medium"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-16 text-muted-foreground"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-xl">🔭</span>
              </div>
              <p className="text-xs">Select a style to preview your engraving</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}