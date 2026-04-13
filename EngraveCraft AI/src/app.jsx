import { useRef, useState } from "react";
import {
  loadImage,
  drawToCanvas,
  applyGrayscale,
  adjustContrast,
  applyThreshold,
  downloadCanvas
} from "./utils/imageProcessor";

export default function App() {
  const canvasRef = useRef(null);

  const [contrast, setContrast] = useState(25);
  const [threshold, setThreshold] = useState(140);

  let ctxRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = await loadImage(file);
    const canvas = canvasRef.current;

    ctxRef.current = drawToCanvas(img, canvas);
  };

  const processImage = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!ctx) return;

    // Reset by redrawing original image is not stored here intentionally
    // (simple version; can upgrade later)

    applyGrayscale(ctx, canvas);
    adjustContrast(ctx, canvas, contrast);
    applyThreshold(ctx, canvas, threshold);
  };

  const downloadImage = () => {
    downloadCanvas(canvasRef.current);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Laser Image Processor</h2>

      <input type="file" accept="image/*" onChange={handleUpload} />

      <div style={{ marginTop: 10 }}>
        <label>Contrast: {contrast}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Threshold: {threshold}</label>
        <input
          type="range"
          min="0"
          max="255"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </div>

      <button onClick={processImage} style={{ marginTop: 10 }}>
        Process for Laser
      </button>

      <button onClick={downloadImage} style={{ marginLeft: 10 }}>
        Download PNG
      </button>

      <div style={{ marginTop: 20 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
