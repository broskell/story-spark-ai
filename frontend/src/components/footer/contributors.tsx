import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  GitPullRequest,
  Users,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export default function ContributorsComponent() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/ronisarkarexe/story-spark-ai/contributors"
        );

        const data: Contributor[] = await res.json();

        const sorted = data
          .filter((c) => c.contributions > 0)
          .sort((a, b) => b.contributions - a.contributions);

        setContributors(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const top = contributors[0];

  const totalContributions = contributors.reduce(
    (acc, c) => acc + c.contributions,
    0
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-blue-300 text-sm backdrop-blur-xl">
            <Sparkles size={14} />
            Open Source Contributors
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-black tracking-tight">
            Meet the
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Builders
            </span>
          </h1>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
            Every commit shapes the future of StorySpark AI.
          </p>
        </motion.div>

        {/* TOP CONTRIBUTOR */}
        {top && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-full max-w-md group">

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-indigo-500/10 blur-2xl opacity-70 group-hover:opacity-100 transition" />

              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 text-center overflow-hidden">

                <Trophy className="mx-auto text-yellow-400 mb-4" />

                <img
                  src={top.avatar_url}
                  className="h-28 w-28 mx-auto rounded-full border-4 border-yellow-400/30 transition-transform group-hover:scale-105"
                />

                <h2 className="mt-4 text-2xl font-bold">{top.login}</h2>

                <p className="text-slate-400 text-sm">Top Contributor</p>

                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/20">
                  <Zap size={14} />
                  {top.contributions} contributions
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: Users,
              label: "Contributors",
              value: contributors.length,
            },
            {
              icon: GitPullRequest,
              label: "Total Contributions",
              value: totalContributions,
            },
            {
              icon: Globe,
              label: "Global Reach",
              value: "Worldwide",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />

              <s.icon className="text-blue-400 mb-3" />

              <p className="text-slate-400 text-sm">{s.label}</p>
              <h3 className="text-3xl font-bold mt-2">{s.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* CONTRIBUTORS GRID */}
        <div className="mt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-white/5 animate-pulse border border-white/10"
                />
              ))
            : contributors.map((c, i) => (
                <motion.a
                  key={c.login}
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.06, y: -10 }}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-6 text-center"
                >
                  {/* hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-b from-white/10 via-transparent to-transparent" />

                  {/* rank */}
                  <div className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">
                    #{i + 1}
                  </div>

                  {/* avatar */}
                  <img
                    src={c.avatar_url}
                    className="h-24 w-24 mx-auto rounded-full border border-white/10 group-hover:border-blue-400 transition-transform group-hover:scale-105"
                  />

                  <h3 className="mt-4 font-semibold">{c.login}</h3>

                  <p className="text-xs text-slate-400">
                    Open Source Contributor
                  </p>

                  {/* contribution bar */}
                  <div className="mt-4 h-1 w-full bg-white/10 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-400/70 group-hover:bg-blue-300 transition-all"
                      style={{
                        width: `${Math.min(c.contributions, 100)}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    {c.contributions} contributions
                  </p>

                  <div className="mt-5 text-slate-400 group-hover:text-white transition flex items-center justify-center gap-1">
                    <GitPullRequest size={14} />
                    View Profile
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </div>
  );
}