export default async function shortenUrl(longUrl: string, shortCode?: string): Promise<string> {
  try {
    const payload: { url: string; key?: string } = { url: longUrl };
    
    // Add short code (key) only if provided
    if (shortCode && shortCode.trim()) {
      payload.key = shortCode.trim();
    }

    const response = await fetch('https://t.mahs.me/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const data = await response.json();
    const shortUrl = `https://t.mahs.me/u/${data.code}`;
    return shortUrl;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
};