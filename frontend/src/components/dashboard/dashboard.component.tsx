import { useGetDashboardAnalysisQuery } from "../../redux/apis/analysis.api";
import TopicsChart from "../chart/dashboard/bar_chart";
import SubscriptionChart from "../chart/dashboard/doughnut_chart";
import PostsPerMonthChart from "../chart/dashboard/line_chart";
import UsersPieChart from "../chart/dashboard/pai_chart";
import LoadingAnimation from "../loading/loading.component";
import DashboardAnalysisHeader from "./dashboard_analysis_header";

const DashboardComponent = () => {
  const { data, isLoading } = useGetDashboardAnalysisQuery(undefined);

  if (isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="space-y-6">
      {data && <DashboardAnalysisHeader data={data} />}
      {data && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <UsersPieChart data={data.users} />
          <SubscriptionChart data={data.subscriptionTypes} />
          <PostsPerMonthChart perMonth={data.posts.perMonth} />
          <TopicsChart topics={data.posts.topics} />
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;
