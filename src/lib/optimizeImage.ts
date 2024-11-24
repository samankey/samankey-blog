export const optimizeImage = (content: string): string => {
  return content.replace(/<img([^>]+)>/g, (match, attributes) => {
    const src = attributes.match(/src="([^"]+)"/)[1];
    return `<img src="${src}" width="800" height="600" data-optimized="true" data-quality="80" data-sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />`;
  });
};
