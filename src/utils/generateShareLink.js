export const generateShareLink = (bucketId, clientEmail) => {
    const base = "https://photoapp.com/access";
    return `${base}?id=${bucketId}&email=${encodeURIComponent(clientEmail)}`;
};
