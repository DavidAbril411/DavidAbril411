/**
 * Pulls live numbers from the GitHub GraphQL API and caches them in
 * profile/data/stats.json. Everything downstream reads the cache, so the
 * README can still be rebuilt offline (or when the API is having a bad day)
 * without losing the last known-good values.
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const LOGIN = process.env.PROFILE_LOGIN || 'DavidAbril411';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const OUT = new URL('../profile/data/stats.json', import.meta.url);

const QUERY = `query($login: String!) {
  user(login: $login) {
    login
    createdAt
    followers { totalCount }
    repositories(ownerAffiliations: OWNER, privacy: PUBLIC, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        isFork
        languages(first: 12, orderBy: {field: SIZE, direction: DESC}) {
          edges { size node { name color } }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar { totalContributions }
    }
  }
}`;

function loadCache() {
  if (existsSync(OUT)) {
    try {
      return JSON.parse(readFileSync(OUT, 'utf8'));
    } catch {}
  }
  return null;
}

async function fetchStats() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'profile-readme-builder',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join('; '));

  const u = json.data.user;
  const repos = u.repositories.nodes.filter((r) => !r.isFork);

  const bytes = new Map();
  for (const repo of repos) {
    for (const { size, node } of repo.languages.edges) {
      const prev = bytes.get(node.name) ?? { size: 0, color: node.color };
      prev.size += size;
      bytes.set(node.name, prev);
    }
  }
  const total = [...bytes.values()].reduce((a, b) => a + b.size, 0) || 1;
  const languages = [...bytes.entries()]
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 6)
    .map(([name, v]) => ({ name, color: v.color || '#8b8b8b', pct: Math.round((v.size / total) * 1000) / 10 }));

  const c = u.contributionsCollection;
  return {
    login: u.login,
    generatedAt: new Date().toISOString(),
    since: u.createdAt.slice(0, 10),
    followers: u.followers.totalCount,
    publicRepos: u.repositories.totalCount,
    stars: repos.reduce((a, r) => a + r.stargazerCount, 0),
    forks: repos.reduce((a, r) => a + r.forkCount, 0),
    contributionsLastYear: c.contributionCalendar.totalContributions,
    commitsLastYear: c.totalCommitContributions,
    pullRequests: c.totalPullRequestContributions,
    issues: c.totalIssueContributions,
    languages,
    topRepos: repos
      .slice(0, 5)
      .map((r) => ({ name: r.name, stars: r.stargazerCount })),
  };
}

const PLACEHOLDER = {
  login: LOGIN,
  generatedAt: null,
  since: null,
  followers: null,
  publicRepos: null,
  stars: null,
  forks: null,
  contributionsLastYear: null,
  commitsLastYear: null,
  pullRequests: null,
  issues: null,
  languages: [],
  topRepos: [],
  placeholder: true,
};

const cache = loadCache();

if (!TOKEN) {
  if (cache) {
    console.log('gen-stats: no GITHUB_TOKEN — keeping cached profile/data/stats.json');
    process.exit(0);
  }
  console.log('gen-stats: no GITHUB_TOKEN and no cache — writing placeholder stats');
  writeFileSync(OUT, JSON.stringify(PLACEHOLDER, null, 2) + '\n');
  process.exit(0);
}

try {
  const stats = await fetchStats();
  // Keep the previous timestamp when nothing else moved, so a scheduled run
  // that finds no news produces no diff and therefore no commit.
  if (cache) {
    const strip = ({ generatedAt, ...rest }) => JSON.stringify(rest);
    if (strip(cache) === strip(stats)) stats.generatedAt = cache.generatedAt;
  }
  writeFileSync(OUT, JSON.stringify(stats, null, 2) + '\n');
  console.log(
    `gen-stats: ${stats.publicRepos} repos · ${stats.stars}★ · ${stats.contributionsLastYear} contributions · ${stats.languages.length} languages`
  );
} catch (err) {
  console.error(`gen-stats: ${err.message}`);
  if (cache) {
    console.error('gen-stats: keeping the cached stats so the build still produces a correct README');
    process.exit(0);
  }
  // In CI a bad token means the workflow is misconfigured and should go red.
  if (process.env.CI) process.exit(1);
  console.error('gen-stats: writing placeholder stats — CI will fill in the real numbers');
  writeFileSync(OUT, JSON.stringify(PLACEHOLDER, null, 2) + '\n');
}
