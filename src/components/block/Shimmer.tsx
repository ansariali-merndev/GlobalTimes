import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const Shimmer = () => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
      {new Array(4).fill(null).map((_, idx) => (
        <li key={idx}>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-14 w-full" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-82 my-4 w-full" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-74" />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Skeleton className="h-12 w-28" />
              <Skeleton className="h-12 w-28" />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
