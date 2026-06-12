// components/ui/FileUpload.tsx — CRM Dibracam
import React, { useRef, useState } from 'react';
import { UploadSimple, Camera, X, File as FileIcon } from '@phosphor-icons/react';
import '../../styles/components/file-upload.css';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  variant?: 'avatar' | 'dropzone';
  preview?: string;
  error?: string;
  disabled?: boolean;
  label?: string;
}

export function FileUpload({
  onUpload,
  accept = 'image/*,.pdf,.doc,.docx',
  maxSize = 5 * 1024 * 1024,
  maxFiles = 6,
  variant = 'dropzone',
  preview,
  error,
  disabled = false,
  label,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (fileList: FileList) => {
    const valid = Array.from(fileList).slice(0, maxFiles).filter(f => f.size <= maxSize);
    setFiles(prev => [...prev, ...valid].slice(0, maxFiles));
    onUpload(valid);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (variant === 'avatar') {
    return (
      <div className="file-upload-avatar-wrapper">
        {label && <label className="input-label">{label}</label>}
        <div
          className={`file-upload-avatar ${disabled ? 'file-upload-disabled' : ''}`}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Avatar" className="file-upload-avatar-img" />
          ) : (
            <Camera size={24} weight="light" />
          )}
          <div className="file-upload-avatar-overlay">
            <Camera size={20} />
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={e => e.target.files && handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        {error && <span className="input-error-msg">{error}</span>}
      </div>
    );
  }

  return (
    <div className="file-upload-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div
        className={`file-upload-dropzone ${dragOver ? 'file-upload-dragover' : ''} ${disabled ? 'file-upload-disabled' : ''} ${error ? 'file-upload-error' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <UploadSimple size={24} className="file-upload-icon" />
        <p className="file-upload-text">
          <strong>Clique para enviar</strong> ou arraste e solte
        </p>
        <p className="file-upload-hint">
          SVG, PNG, JPG, GIF (máx. {(maxSize / 1024 / 1024).toFixed(0)}MB)
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={e => e.target.files && handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />
      {error && <span className="input-error-msg">{error}</span>}

      {files.length > 0 && (
        <ul className="file-upload-list">
          {files.map((f, i) => (
            <li key={i} className="file-upload-item">
              <FileIcon size={16} />
              <span className="file-upload-name">{f.name}</span>
              <button className="file-upload-remove" onClick={() => removeFile(i)}>
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
