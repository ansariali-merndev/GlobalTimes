const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const fetchNews = async (query: string) => {
  const res = await fetch(
    `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${apiKey}`
  );
  return await res.json();
};

export const QueryArray: string[] = [
  "General",
  "World",
  "Nation",
  "Business",
  "Technology",
  "Entertainment",
  "Sports",
  "Science",
  "Health",
];
