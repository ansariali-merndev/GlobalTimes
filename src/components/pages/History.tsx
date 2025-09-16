import type { HistoryType } from "@/store/Type";
import { useUser } from "@clerk/clerk-react";

export const History = () => {
  const { user } = useUser();

  const historyData = (user?.unsafeMetadata.history as HistoryType[]) || [];

  console.log(historyData);

  return <div>History</div>;
};
