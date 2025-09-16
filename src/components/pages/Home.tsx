import { fetchNews, QueryArray } from "@/lib/api";
import { addData } from "@/store/slices/NewsSlice";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Hero } from "../block/Hero";
import type { articles } from "@/lib/responseType";
import { Shimmer } from "../block/Shimmer";

export const Home = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [cacheNumber, setCacheNumber] = useState(0);

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["InfiniteNews"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchNews(QueryArray[pageParam]),
    getNextPageParam: (_, pages) =>
      pages.length < QueryArray.length ? pages.length : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (!isPending && !isError && data?.pages[0]?.articles?.length > 0) {
      dispatch(addData(data?.pages[data.pages.length - 1].articles));
    }
  }, [data, dispatch, isError, isPending]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        const { clientHeight, scrollHeight, scrollTop } =
          document.documentElement;
        if (clientHeight + scrollTop > scrollHeight - 70) {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
          if (!hasNextPage) {
            const cacheData = queryClient.getQueryData<{
              pageParams: number[];
              pages: { articles: articles[] }[];
            }>(["InfiniteNews"]);
            if (cacheData) {
              const currArticle = cacheData.pages[cacheNumber].articles;
              dispatch(addData(currArticle));
              setCacheNumber((prev) => (prev + 1) % cacheData.pages.length);
            }
          }
        }

        timeout = null;
      }, 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    cacheNumber,
    dispatch,
    queryClient,
  ]);

  return (
    <section>
      <div>Global Times</div>
      <Hero />
      {(isPending || isFetchingNextPage) && <Shimmer />}
    </section>
  );
};
