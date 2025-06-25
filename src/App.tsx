import { useState, type ChangeEvent, type DragEvent } from 'react';
import './App.css';
import { DataDisplay } from './components/DataDisplay';
import { DataPreview } from './components/DataPreview';
import { DropZone } from './components/DropZone';
import { Notice } from './components/Notice';
import type { DataInfo, FilePreview } from './types';
import { generateFilePreview, processDataTransfer } from './utils/dataProcessor';

function App() {
  const [dataInfo, setDataInfo] = useState<DataInfo | null>(null);
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDataProcess = (dataTransfer: DataTransfer) => {
    const { dataInfo, previewContent } = processDataTransfer(dataTransfer);

    if (dataInfo) {
      setDataInfo(dataInfo);

      if (dataInfo.type === 'file' && dataTransfer.files.length > 0) {
        generateFilePreview(dataTransfer.files[0], setFilePreview);
      } else {
        setFilePreview({
          type: 'text',
          content: previewContent,
        });
      }
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const dataInfo: DataInfo = {
        type: 'file',
        name: file.name,
        size: file.size,
        mimeType: file.type || 'unknown',
        lastModified: file.lastModified,
        webkitRelativePath: file.webkitRelativePath || undefined,
      };
      setDataInfo(dataInfo);
      generateFilePreview(file, setFilePreview);
    }
  };

  const handleReset = () => {
    setDataInfo(null);
    setFilePreview(null);
  };

  // ドラッグ&ドロップ関数
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleDataProcess(e.dataTransfer);
  };

  // ページ全体でのドラッグオーバー処理
  const handleGlobalDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleGlobalDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // 子要素から出る場合は無視
    if (e.relatedTarget && (e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
      return;
    }
    setIsDragOver(false);
  };

  const handleGlobalDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleDataProcess(e.dataTransfer);
  };

  return (
    <div
      className={`app ${isDragOver ? 'global-drag-over' : ''}`}
      onDragOver={handleGlobalDragOver}
      onDragLeave={handleGlobalDragLeave}
      onDrop={handleGlobalDrop}
    >
      <div className="container">
        <h1 className="title">ドロップファイルチェッカー</h1>

        {!dataInfo ? (
          <div className="initial-screen">
            <Notice />
            <DropZone
              isDragOver={isDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileSelect={handleFileSelect}
            />
          </div>
        ) : (
          <div className="file-display-container">
            <div className="file-content">
              <DataDisplay data={dataInfo} onReset={handleReset} />
              <DataPreview preview={filePreview} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
