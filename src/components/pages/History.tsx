import type { HistoryType } from "@/store/Type";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const History = () => {
  const { user } = useUser();

  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    console.log(history);
  }, [history]);

  useEffect(() => {
    setHistory((user?.unsafeMetadata.history as HistoryType[]) || []);
  }, [user?.unsafeMetadata]);

  return (
    <section>
      <ul className="space-y-6">
        {history.map((item, idx) => (
          <li key={`${item.title}-${idx}`}>
            <Card className="grid grid-cols-1 md:grid-cols-3">
              <CardHeader>
                <img src={item.image} alt="image" className="h-20 w-auto" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="md:flex md:flex-col md:items-center md:justify-center">
                <p>
                  <span className="font-semibold">Published on: </span>
                  {new Date(item.publishedAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Visited on: </span>
                  {new Date(item.visitedDate).toLocaleString()}
                </p>
              </CardContent>
              <CardFooter className="md:flex md:flex-col md:items-center md:justify-center">
                <a
                  href={item.url}
                  target="_blank"
                  className="bg-indigo-500 px-3 py-1 rounded-md"
                >
                  More Detail
                </a>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};
