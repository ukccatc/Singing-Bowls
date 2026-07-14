function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderParagraph(paragraph: string): string {
  const trimmed = paragraph.trim();

  const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, url] = imageMatch;
    const safeAlt = escapeHtml(alt);
    const safeUrl = escapeHtml(url);
    return `<figure class="my-8"><img src="${safeUrl}" alt="${safeAlt}" class="w-full rounded-2xl shadow-lg object-cover max-h-[480px]" loading="lazy" />${safeAlt ? `<figcaption class="text-sm text-gray-500 text-center mt-2">${safeAlt}</figcaption>` : ''}</figure>`;
  }

  if (trimmed.startsWith('#')) {
    const match = trimmed.match(/^#+/);
    const level = match ? match[0].length : 1;
    const text = escapeHtml(trimmed.replace(/^#+\s*/, ''));
    const sizeClass =
      level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl';
    return `<h${level} class="${sizeClass} font-bold text-gray-900 mb-4 mt-8">${text}</h${level}>`;
  }

  if (trimmed.startsWith('- ')) {
    const items = trimmed
      .split('\n')
      .filter((item) => item.startsWith('- '))
      .map(
        (item) =>
          `<li class="mb-2">${escapeHtml(item.replace(/^- /, ''))}</li>`
      )
      .join('');
    return `<ul class="list-disc list-inside mb-4 space-y-2">${items}</ul>`;
  }

  if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
    const text = escapeHtml(trimmed.replace(/\*\*/g, ''));
    return `<p class="font-bold text-lg text-gray-900 mb-4">${text}</p>`;
  }

  return `<p class="text-gray-700 leading-relaxed mb-6">${escapeHtml(trimmed)}</p>`;
}

export function renderArticleContentHtml(markdown: string): string {
  return markdown
    .split('\n\n')
    .filter((block) => block.trim().length > 0)
    .map(renderParagraph)
    .join('');
}
