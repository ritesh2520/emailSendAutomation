function extractFileId(url) {
  if (!url) return null;

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);

    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

module.exports = extractFileId;
