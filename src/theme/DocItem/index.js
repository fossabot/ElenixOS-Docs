import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';

export default function DocItem(props) {
  // 防御性检查：避免 props.content 或 props.content.metadata 为 undefined 导致应用崩溃
  if (!props || !props.content || !props.content.metadata) {
    // 在开发时输出警告，便于定位具体文档
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('DocItem: missing content.metadata for props', props);
    }
    return (
      <div style={{padding: '1rem', border: '1px solid #ffcc00', borderRadius: 6}}>
        文档加载失败：缺少 metadata（id）。请检查对应文档的 frontMatter 是否存在且格式正确。
      </div>
    );
  }

  return <OriginalDocItem {...props} />;
}
