import type { FilePreview } from '../types';
import './DataPreview.css';

interface DataPreviewProps {
  preview: FilePreview | null;
}

export const DataPreview = ({ preview }: DataPreviewProps) => {
  return (
    <div className="data-preview-section">
      <h3>プレビュー</h3>
      <div className="preview-container">
        {preview && (
          <>
            {preview.type === 'image' && (
              <div className="image-preview">
                <img src={preview.content} alt="プレビュー" />
              </div>
            )}
            {preview.type === 'text' && (
              <div className="text-preview">
                <pre>{preview.content}</pre>
              </div>
            )}
            {preview.type === 'binary' && (
              <div className="binary-preview">
                <div className="binary-icon">🔒</div>
                <p>{preview.content}</p>
                <small>このファイルはバイナリデータのため、プレビューできません。</small>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
