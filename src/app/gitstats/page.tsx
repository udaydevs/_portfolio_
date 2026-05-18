"use client";

import { DashCard, PageShell, Pill } from "@/components/portfolio-page/page-shell";
import { ExternalLink, GitFork, Github, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
};

const username = "udaydevs";
const accentChartColors = {
  default: "737373",
  green: "16a34a",
  pink: "db2777",
  orange: "ea580c",
  blue: "2563eb",
} as const;

type ChartAccent = keyof typeof accentChartColors;

function isChartAccent(value: string | undefined): value is ChartAccent {
  return Boolean(value && value in accentChartColors);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function GitStatsPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartAccent, setChartAccent] = useState<ChartAccent>("default");

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        setLoading(true);
        setError(null);

        const [userResponse, repoResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
            { signal: controller.signal }
          ),
        ]);

        if (!userResponse.ok || !repoResponse.ok) {
          throw new Error("GitHub API request failed.");
        }

        const [userJson, repoJson] = await Promise.all([
          userResponse.json(),
          repoResponse.json(),
        ]);

        setUser(userJson);
        setRepos(repoJson);
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === "AbortError") {
          return;
        }

        setError("Could not load GitHub stats right now.");
      } finally {
        setLoading(false);
      }
    }

    loadStats();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const syncAccent = () => {
      const accent = root.dataset.accent;
      setChartAccent(isChartAccent(accent) ? accent : "default");
    };

    syncAccent();

    const observer = new MutationObserver(syncAccent);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-accent"],
    });

    return () => observer.disconnect();
  }, []);

  const totals = useMemo(() => {
    const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const forks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = repos.reduce<Record<string, number>>((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      }
      return acc;
    }, {});

    return {
      stars,
      forks,
      languages: Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8),
    };
  }, [repos]);

  const featuredRepos = repos.slice(0, 8);

  return (
    <PageShell
      title="GitHub Activity"
      description="A live snapshot of repositories, languages, and profile numbers from Uday's public GitHub profile."
    >
      {loading ? (
        <DashCard>
          <p className="font-mono text-sm text-muted-foreground">
            Loading GitHub stats...
          </p>
        </DashCard>
      ) : null}

      {error ? (
        <DashCard>
          <p className="font-mono text-sm text-muted-foreground">{error}</p>
        </DashCard>
      ) : null}

      {user && !loading ? (
        <div className="space-y-5">
          <DashCard>
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar_url}
                  alt={`${user.login} GitHub avatar`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 rounded-full border border-dashed border-border"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Github size={19} />
                    <h2 className="text-2xl">{user.name ?? user.login}</h2>
                  </div>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">
                    @{user.login}
                  </p>
                  {user.bio ? (
                    <p className="mt-3 max-w-2xl font-mono text-sm leading-6 text-muted-foreground">
                      {user.bio}
                    </p>
                  ) : null}
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 text-sm transition hover:border-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent)] hover:text-white"
              >
                Open GitHub
                <ExternalLink size={16} />
              </a>
            </div>
          </DashCard>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Repositories", user.public_repos],
              ["Followers", user.followers],
              ["Following", user.following],
              ["Public Gists", user.public_gists],
            ].map(([label, value]) => (
              <DashCard key={label.toString()}>
                <p className="font-mono text-xs text-muted-foreground">{label}</p>
                <p className="mt-3 text-4xl accent-text">{value}</p>
              </DashCard>
            ))}
          </div>


          <DashCard>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl">Contribution Heatmap</h2>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  Public GitHub contribution activity for the last year.
                </p>
              </div>
              <Pill>Live chart</Pill>
            </div>

            <div className="mt-5 overflow-x-auto rounded-md border border-dashed border-border p-3">
              <img
                src={`https://ghchart.rshah.org/${accentChartColors[chartAccent]}/${username}`}
                alt={`${username} GitHub contribution heatmap`}
                loading="lazy"
                decoding="async"
                className="min-h-32 min-w-[720px] max-w-none"
              />
            </div>
          </DashCard>

          <DashCard>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl">Recently Updated Repos</h2>
              <p className="font-mono text-xs text-muted-foreground">
                Latest {featuredRepos.length}
              </p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {featuredRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-dashed border-border p-4 transition hover:border-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent-soft)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg">{repo.name}</p>
                      <p className="mt-2 line-clamp-2 font-mono text-xs leading-5 text-muted-foreground">
                        {repo.description ?? "No description available."}
                      </p>
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                    {repo.language ? <span>{repo.language}</span> : null}
                    <span>Stars {repo.stargazers_count}</span>
                    <span>Forks {repo.forks_count}</span>
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>
                </a>
              ))}
            </div>
          </DashCard>
        </div>
      ) : null}
    </PageShell>
  );
}
