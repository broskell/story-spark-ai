import React from "react";
import { topicsData } from "../../stories/stories.utils";

const TrendingTopicComponent = () => {
  return (
    <section className="bg-white dark:bg-[#111827]/40 border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full box-border shadow-sm">
      <h3 className="mb-4 text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 select-none">
        Trending Topics
      </h3>
      <div className="flex flex-wrap gap-2 w-full box-border">
        {topicsData.map((topic, index) => (
          <a
            key={index}
            href="#"
            className="story-chip px-3 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-200"
          >
            {topic.title}
          </a>
        ))}
      </div>
    </section>
  );
};

export default TrendingTopicComponent;