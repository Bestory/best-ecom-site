const ShortenText = (description, n) => {
  if (description && n && description.length > n) {
    const shortenedText = description.substring(0, n).conca("...");
    return shortenedText;
  }
  return description;
};

export default ShortenText;
