export function visibleOverviewBlocks(blocks = []) {
  return blocks.filter(block => {
    if (block.type === 'text') return block.heading?.trim() || block.paragraphs?.some(text => text.trim()) || block.bullets?.some(text => text.trim());
    if (block.type === 'image') return Boolean(block.src);
    if (block.type === 'video') return /^(https:\/\/|\/(?!\/))/.test(block.videoUrl ?? '');
    if (block.type === 'links') return block.links?.some(link => link.enabled !== false && link.label?.trim() && /^(https:\/\/|\/(?!\/))/.test(link.url ?? ''));
    return false;
  });
}
export function videoEmbed(url) {
  try {
    const parsed = new URL(url);
    if (['youtube.com','www.youtube.com','youtu.be','www.youtu.be'].includes(parsed.hostname)) {
      const id = parsed.hostname.endsWith('youtu.be') ? parsed.pathname.slice(1) : parsed.searchParams.get('v') || parsed.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1];
      if (/^[A-Za-z0-9_-]{11}$/.test(id ?? '')) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(parsed.hostname)) {
      const id=parsed.pathname.match(/(?:\/video)?\/(\d+)$/)?.[1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {}
  return '';
}
