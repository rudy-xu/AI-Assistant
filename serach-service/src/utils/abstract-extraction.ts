// Extract data with duckduckgo
export function extractDuckDuckGoSummary(data: any, maxCount: number = 3): string {
  const summaries: string[] = [];

  // ✅ Step 1: 优先加入 AbstractText
  if (typeof data.AbstractText === 'string' && data.AbstractText.trim() !== '') {
    summaries.push(`摘要：${data.AbstractText}`);
  }

  // ✅ Step 2: 遍历 RelatedTopics，提取 Text
  if (Array.isArray(data.RelatedTopics)) {
    for (const topic of data.RelatedTopics) {
      if (summaries.length >= maxCount) break;

      // Case 1: 简单条目
      if (typeof topic.Text === 'string' && topic.Text.trim() !== '') {
        summaries.push(`• ${topic.Text}`);
        continue;
      }

      // Case 2: 嵌套条目（grouped Topics）
      if (Array.isArray(topic.Topics)) {
        for (const sub of topic.Topics) {
          if (typeof sub.Text === 'string' && sub.Text.trim() !== '') {
            summaries.push(`• ${sub.Text}`);
            if (summaries.length >= maxCount) break;
          }
        }
      }
    }
  }

  return summaries.length > 0 ? summaries.join('\n') : '未找到相关摘要信息';
}
