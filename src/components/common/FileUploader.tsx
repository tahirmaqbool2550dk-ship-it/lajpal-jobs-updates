import React, { useRef, useState } from 'react';
import { UploadCloud, File, Image as ImageIcon, Trash2, AlertCircle } from 'lucide-react';

interface UploadedFileInfo {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

interface FileUploaderProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  initialFiles?: string[];
  onChange: (files: string[]) => void;
  helperText?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label = 'Upload Image or PDF',
  accept = 'image/jpeg,image/png,image/webp,application/pdf',
  multiple = true,
  maxSizeMB = 4,
  initialFiles = [],
  onChange,
  helperText = 'Supported formats: JPG, PNG, PDF (Max 4MB)',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>(initialFiles);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const maxBytes = maxSizeMB * 1024 * 1024;
    const newFiles: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (file.size > maxBytes) {
        setError(`"${file.name}" exceeds the maximum allowed size of ${maxSizeMB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          newFiles.push(resultStr);

          // Once all selected files in batch are processed
          if (newFiles.length === selectedFiles.length || (!multiple && newFiles.length === 1)) {
            const updated = multiple ? [...files, ...newFiles] : newFiles;
            setFiles(updated);
            onChange(updated);
          }
        }
      };
      reader.onerror = () => {
        setError('Error reading file. Please try another file.');
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange(updated);
  };

  const isPdf = (dataUrl: string) =>
    dataUrl.startsWith('data:application/pdf') || dataUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      {/* Upload Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50/50 dark:bg-slate-900/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all text-center"
      >
        <UploadCloud className="w-9 h-9 text-slate-400 group-hover:text-emerald-600 transition-colors mb-2" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
          Click to upload or drag &amp; drop
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helperText}</span>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Files List / Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {files.map((fileUrl, idx) => {
            const pdf = isPdf(fileUrl);
            return (
              <div
                key={idx}
                className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 shadow-xs"
              >
                {pdf ? (
                  <div className="h-24 flex flex-col items-center justify-center bg-rose-50 dark:bg-rose-950/40 rounded p-2 text-rose-700 dark:text-rose-300">
                    <File className="w-8 h-8 mb-1" />
                    <span className="text-[11px] font-bold">PDF Document</span>
                  </div>
                ) : (
                  <div className="h-24 w-full bg-slate-100 dark:bg-slate-900 rounded overflow-hidden flex items-center justify-center">
                    <img
                      src={fileUrl}
                      alt={`Upload preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(idx);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white transition-colors opacity-90 group-hover:opacity-100"
                  title="Remove file"
                  aria-label="Remove file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
