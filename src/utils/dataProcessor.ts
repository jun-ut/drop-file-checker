import type { DataInfo, FilePreview } from '../types'

export const generateFilePreview = (
  file: File,
  setFilePreview: (preview: FilePreview) => void
) => {
  const reader = new FileReader()
  
  if (file.type.startsWith('image/')) {
    reader.onload = (e) => {
      setFilePreview({
        type: 'image',
        content: e.target?.result as string
      })
    }
    reader.readAsDataURL(file)
  } else if (file.type.startsWith('text/') || 
             file.type === 'application/json' ||
             file.type === 'application/javascript' ||
             file.type === 'application/xml' ||
             file.name.endsWith('.md') ||
             file.name.endsWith('.txt') ||
             file.name.endsWith('.csv')) {
    reader.onload = (e) => {
      setFilePreview({
        type: 'text',
        content: e.target?.result as string
      })
    }
    reader.readAsText(file)
  } else {
    setFilePreview({
      type: 'binary',
      content: `バイナリファイル (${file.type || '不明なタイプ'})`
    })
  }
}

export const processFile = (file: File): DataInfo => {
  return {
    type: 'file',
    name: file.name,
    size: file.size,
    mimeType: file.type || 'unknown',
    lastModified: file.lastModified,
    webkitRelativePath: file.webkitRelativePath || undefined
  }
}

export const processDataTransfer = (dataTransfer: DataTransfer): {
  dataInfo: DataInfo | null
  previewContent: string
} => {

  // まずファイルをチェック
  if (dataTransfer.files.length > 0) {
    return {
      dataInfo: processFile(dataTransfer.files[0]),
      previewContent: ''
    }
  }

  // ファイルがない場合はテキストデータなどをチェック
  const types = Array.from(dataTransfer.types)
  console.log('Available data types:', types)

  let dataInfo: DataInfo | null = null
  let previewContent = ''

  const content = {
    dropEffect: dataTransfer.dropEffect,
    effectAllowed: dataTransfer.effectAllowed,
    types: types.join(', ')
  };

  if (types.includes('text/html')) {
    const htmlData = dataTransfer.getData('text/html')
    dataInfo = {
      type: 'html',
      name: 'ドロップされたHTML',
      size: new Blob([htmlData]).size,
      content,
      mimeType: 'text/html'
    }
    previewContent = htmlData
  } else if (types.includes('text/uri-list')) {
    const urlData = dataTransfer.getData('text/uri-list')
    dataInfo = {
      type: 'url',
      name: 'ドロップされたURL',
      size: new Blob([urlData]).size,
      content,
      mimeType: 'text/uri-list'
    }
    previewContent = urlData
  } else if (types.includes('text/plain')) {
    const textData = dataTransfer.getData('text/plain')
    dataInfo = {
      type: 'text',
      name: 'ドロップされたテキスト',
      size: new Blob([textData]).size,
      content,
      mimeType: 'text/plain'
    }
    previewContent = textData
  } else {
    // その他のデータタイプ
    const availableData = types.map(type => {
      try {
        return `${type}: ${dataTransfer.getData(type)}`
      } catch {
        return `${type}: (取得できませんでした)`
      }
    }).join('\n')
    
    dataInfo = {
      type: 'unknown',
      name: 'ドロップされたデータ',
      size: new Blob([availableData]).size,
      content,
      mimeType: types[0] || 'unknown'
    }
    previewContent = availableData
  }

  return { dataInfo, previewContent }
}
