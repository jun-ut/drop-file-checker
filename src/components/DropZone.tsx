import { useRef, type ChangeEvent, type DragEvent } from 'react';
import './DropZone.css';

interface DropZoneProps {
  isDragOver: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DropZone = ({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: DropZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={handleFileInputClick}
    >
      <div className="drop-content">
        <div className="drop-icon">📁</div>
        <p className="drop-text">
          ファイルやテキストをここにドラッグ＆ドロップ または クリック
          <br />
        </p>
        <div className="divider">または</div>
        <button
          className="file-input-button"
          onClick={(e) => {
            e.stopPropagation();
            handleFileInputClick();
          }}
        >
          ファイルを選択
        </button>
        <input ref={fileInputRef} type="file" onChange={onFileSelect} style={{ display: 'none' }} />
      </div>
    </div>
  );
};
