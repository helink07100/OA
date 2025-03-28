// 格式化文件大小显示文字
export default function(size) {
  return size > 1024
    ? size / 1024 > 1024
      ? size / (1024 * 1024) > 1024
        ? (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
        : (size / (1024 * 1024)).toFixed(2) + 'MB'
      : (size / 1024).toFixed(2) + 'KB'
    : size.toFixed(2) + 'B'
}
