export interface DataInfo {
  type: 'file' | 'text' | 'url' | 'html' | 'unknown';
  name: string;
  size: number;
  content?: DataTransferInfo;
  mimeType?: string;
  lastModified?: number;
  webkitRelativePath?: string;
}

export interface DataTransferInfo {
  dropEffect: string;
  effectAllowed: string;
  types: string;
}

export interface FilePreview {
  type: 'image' | 'text' | 'binary';
  content: string;
}
