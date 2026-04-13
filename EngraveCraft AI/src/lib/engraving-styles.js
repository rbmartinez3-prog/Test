export const STYLE_CATEGORIES = [
  {
    id: 'line-art',
    title: 'Line Art',
    description: 'Sketch and line-based styles',
    icon: '??',
    styles: [
      { value: 'pencil-sketch', label: 'Pencil Sketch', icon: '??' },
      { value: 'crosshatch', label: 'Crosshatch', icon: '??' },
      { value: 'charcoal', label: 'Charcoal', icon: '??' },
      { value: 'line-art', label: 'Line Art', icon: '??' },
      { value: 'outline', label: 'Outline', icon: '??' },
      { value: 'minimalist', label: 'Minimalist', icon: '??' },
    ],
  },
  {
    id: 'flat-logo',
    title: 'Flat / Logo',
    description: 'Bold, flat graphic styles',
    icon: '??',
    styles: [
      { value: 'silhouette', label: 'Silhouette', icon: '??' },
      { value: 'flat', label: 'Flat', icon: '??' },
      { value: 'cartoon', label: 'Cartoon', icon: '??' },
      { value: 'geometric', label: 'Geometric', icon: '??' },
      { value: 'stencil', label: 'Stencil', icon: '??' },
      { value: 'isometric', label: 'Isometric', icon: '??' },
    ],
  },
  {
    id: 'engraving',
    title: 'Engraving',
    description: 'Traditional engraving techniques',
    icon: '??',
    styles: [
      { value: 'engraving', label: 'Engraving', icon: '??' },
      { value: 'classic-engraving', label: 'Classic Engraving', icon: '???' },
      { value: 'linocut', label: 'Linocut', icon: '???' },
      { value: 'stipple', label: 'Stipple', icon: '?' },
    ],
  },
  {
    id: 'svg',
    title: 'SVG Layers',
    description: 'To convert an image to a multi-colored SVG with separated layers',
    icon: '??',
    styles: [
      { value: 'svg-layers', label: 'SVG Layers', icon: '???' },
      { value: 'svg-2layer', label: '2 Layers', icon: '2??' },
      { value: 'svg-3layer', label: '3 Layers', icon: '3??' },
      { value: 'svg-4layer', label: '4 Layers', icon: '4??' },
    ],
  },
];

export const STYLE_PROMPTS = {
  'pencil-sketch': 'Convert this image into a detailed pencil sketch style drawing, with fine pencil strokes and shading. Black and white only, suitable for laser engraving on wood or metal. High contrast, clean lines.',
  'crosshatch': 'Convert this image into a crosshatch drawing style with intersecting parallel lines creating tone and shadow. Black and white only, suitable for laser engraving. Dense crosshatching in dark areas, sparse in light areas.',
  'charcoal': 'Convert this image into a charcoal drawing style with rich, dark tones and soft blending. Black and white only, high contrast, suitable for laser engraving. Bold strokes with dramatic light and shadow.',
  'line-art': 'Convert this image into clean line art with continuous contour lines. Black and white only, no shading, just outlines and defining lines. Suitable for laser engraving with crisp, clear lines.',
  'outline': 'Convert this image into a simple outline drawing showing only the outer edges and major features. Black and white, minimal detail, clean bold outlines. Perfect for laser engraving.',
  'minimalist': 'Convert this image into an ultra-minimalist line drawing with the absolute minimum number of lines needed to convey the subject. Black and white, very sparse, elegant. Suitable for laser engraving.',
  'silhouette': 'Convert this image into a solid black silhouette on white background. No internal details, just the outer shape filled in solid black. Perfect for laser engraving.',
  'flat': 'Convert this image into a flat graphic design style with solid areas of black and white, no gradients. Clean, bold shapes. Suitable for laser engraving.',
  'cartoon': 'Convert this image into a cartoon-style illustration with bold outlines and simplified features. Black and white, high contrast, suitable for laser engraving. Fun and expressive.',
  'geometric': 'Convert this image into a geometric/low-poly style made of triangles and polygons. Black and white, angular shapes, suitable for laser engraving. Modern and abstract.',
  'stencil': 'Convert this image into a stencil art style with connected shapes that could be cut out. Black and white, bold graphic style like Banksy street art. Suitable for laser engraving.',
  'isometric': 'Convert this image into an isometric illustration style with a 30-degree angle perspective. Black and white, clean lines, geometric. Suitable for laser engraving.',
  'engraving': 'Convert this image into a wood engraving style with fine parallel lines creating tone. Black and white, similar to old book illustrations. High detail with line-based shading suitable for laser engraving.',
  'classic-engraving': 'Convert this image into a classic copper-plate engraving style with fine, precise parallel lines and cross-hatching like old banknote illustrations. Black and white, extremely detailed, suitable for laser engraving.',
  'linocut': 'Convert this image into a linocut/woodcut print style with bold, carved-looking lines and strong contrast. Black and white, with the characteristic rough-edged look of block printing. Suitable for laser engraving.',
  'stipple': 'Convert this image into a stipple art style made entirely of dots. Denser dots for dark areas, sparse dots for light areas. Black and white pointillism style. Suitable for laser engraving.',
  'svg-layers': 'Recreate this image as a clean flat vector-style illustration with distinct, fully separated color regions — as if it were designed in a vector program like Inkscape or Adobe Illustrator for use with a Cricut or Silhouette cutting machine. Use 3-5 solid, clearly separated flat colors. Each color must be a completely distinct, non-overlapping region with clean crisp edges. No gradients, no blending, no anti-aliasing artifacts. Solid fills only. Each color area should be separable as its own path layer. Think layered paper craft or vinyl decal design.',
  'svg-2layer': 'Recreate this image as a clean 2-color flat vector-style illustration — black and white only — designed for use with a Cricut or cutting machine. Each color is a completely separate, non-overlapping flat region with crisp edges. No gradients, no shading. The design should look like it was created as two distinct cut layers: one black layer and one white layer. Suitable for vinyl cutting or 2-color laser engraving.',
  'svg-3layer': 'Recreate this image as a clean 3-color flat vector-style illustration — using black, mid-gray, and white — designed for use with a Cricut or cutting machine. Each color is a completely separate, non-overlapping flat region with crisp edges. No gradients, no blending. The design should look like 3 distinct cut layers, each a different tone, that can be stacked to recreate the image. Suitable for 3-color vinyl cutting or 3-pass laser engraving.',
  'svg-4layer': 'Recreate this image as a clean 4-color flat vector-style illustration - using black, dark gray, light gray, and white - designed for use with a Cricut or cutting machine. Each color is a completely separate, non-overlapping flat region with crisp hard edges. No gradients, no blending. The design should look like 4 distinct cut layers that can be stacked to recreate the image in different materials or colors. Suitable for 4-color vinyl cutting or 4-pass laser engraving.',
};

export function getStyleLabel(value) {
  for (const cat of STYLE_CATEGORIES) {
    const style = cat.styles.find(s => s.value === value);
    if (style) return style.label;
  }
  return value;
}