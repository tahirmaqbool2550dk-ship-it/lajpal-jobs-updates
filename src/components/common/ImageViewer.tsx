import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCw,
} from 'lucide-react';

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title = 'Advertisement Viewer',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
    setRotation(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
    setRotation(0);
  };

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.3, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.3, 0.5));
  const handleResetZoom = () => {
    setScale(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white animate-in fade-in duration-200 select-none no-print"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/70 border-b border-white/10 z-10 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm tracking-wide text-slate-200">
            {title}
          </span>
          {images.length > 1 && (
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
            title="Rotate"
            aria-label="Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <a
            href={currentImage}
            download={`lajpal-advertisement-${currentIndex + 1}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-white"
            title="Download / Open Original"
            aria-label="Download"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-rose-600 hover:bg-rose-700 transition text-white ml-2"
            title="Close Viewer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Active Image with transforms */}
        <div
          className="max-w-full max-h-full transition-transform duration-150 ease-out cursor-grab active:cursor-grabbing flex items-center justify-center"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
          }}
          onDoubleClick={handleResetZoom}
        >
          <img
            src={currentImage}
            alt={title}
            className="max-h-[82vh] max-w-[90vw] object-contain rounded shadow-2xl"
          />
        </div>
      </div>

      {/* Thumbnail Gallery Strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 p-3 bg-black/80 border-t border-white/10 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setScale(1);
                setRotation(0);
              }}
              className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                idx === currentIndex
                  ? 'border-emerald-500 scale-105 shadow-md'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
