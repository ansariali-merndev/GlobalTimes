import type { HistoryType, StateType } from "@/store/Type";
import custom from "../../assets/custom.jpg";
import type { articles } from "@/lib/responseType";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const Hero = () => {
  const news: articles[] = useSelector((state: StateType) => state.news);
  const { user } = useUser();

  const handleHistory = async (item: articles) => {
    const { title, image, publishedAt } = item;
    if (!user) return;

    const newsData: HistoryType = {
      title,
      image,
      publishedAt,
      visitedDate: new Date().toLocaleString(),
    };

    const history: HistoryType[] =
      (user?.unsafeMetadata.history as HistoryType[]) || [];

    const updatedHistory = [...history, newsData];

    await user.update({
      unsafeMetadata: { history: updatedHistory },
    });
  };

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {news.map((item: articles, idx: number) => (
        <li key={`${item.id}-${idx}`}>
          <Card>
            <CardHeader>
              <CardTitle className="h-14">
                {item.title.slice(0, 160)}
                {item.title.length > 160 && "..."}
              </CardTitle>
              <CardDescription>
                <div className="flex items-center justify-center my-4 h-82">
                  <img
                    src={item.image}
                    alt="Images"
                    onError={(e) => (e.currentTarget.src = custom)}
                    className="max-h-80 rounded-md"
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <p className="font-bold text-gray-600">
                {item.description.slice(0, 400)}
                {item.description.length > 400 && "..."}
              </p>
              <p>{item.content.slice(0, 250)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <a
                onClick={() => handleHistory(item)}
                target="_blank"
                rel="noopener noreferrer"
                href={item.url}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                More Detail
              </a>
              <Badge variant={"destructive"}>
                <p>{new Date(item.publishedAt).toLocaleString()}</p>
              </Badge>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
