export const shortenUrl = async (longUrl:string) => {
    try {
        const response = await fetch('https://t.mahs.me/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: longUrl }),
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