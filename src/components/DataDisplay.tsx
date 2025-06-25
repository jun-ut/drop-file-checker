import type { DataInfo } from '../types';
import { formatDate, formatFileSize } from '../utils/formatters';
import './DataDisplay.css';

interface DataDisplayProps {
  data: DataInfo;
  onReset: () => void;
}

interface DataItemProps {
  label: string;
  value?: string;
}

const DataItem = ({ label, value }: DataItemProps) => {
  return (
    <div className="info-item">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </div>
  );
};

export const DataDisplay = ({ data, onReset }: DataDisplayProps) => {
  return (
    <div className="data-display">
      <div className="data-display-header">
        <h2>データ情報</h2>
        <button className="reset-button" onClick={onReset}>
          ✕ リセット
        </button>
      </div>

      <div className="data-info-grid">
        <DataItem label="ファイル名" value={data.name} />
        <DataItem label="タイプ" value={data.type} />
        <DataItem label="サイズ" value={formatFileSize(data.size)} />
        <DataItem label="MIMEタイプ" value={data.mimeType || '不明'} />
        {data.lastModified && (
          <DataItem label="最終更新日時" value={formatDate(data.lastModified)} />
        )}
        {data.webkitRelativePath && <DataItem label="相対パス" value={data.webkitRelativePath} />}
        {data.content && (
          <>
            <DataItem label="dropEffect" value={data.content.dropEffect} />
            <DataItem label="effectAllowed" value={data.content.effectAllowed} />
            <DataItem label="types" value={data.content.types} />
          </>
        )}
      </div>
    </div>
  );
};
