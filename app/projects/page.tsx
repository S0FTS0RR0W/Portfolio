interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

//get GitHub repos
async function getRepos() {
  // TODO: Replace 'charlie' with your actual GitHub username
  const res = await fetch('https://api.github.com/users/S0FTS0RR0W/repos', {
    next: { revalidate: 3600 } // Revalidate data once per hour
  });
  
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export default async function Projects() {
  const repos: Repo[] = await getRepos();

  return (
    <section className="font-mono flex flex-col items-center justify-center space-y-4">
      <h1>My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div key={repo.id} className="border p-4 rounded-lg">
            <h2 className="font-bold">{repo.name}</h2>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-teal-500 transition-all group inline-block">
              View on GitHub
              <div className="bg-teal-500 h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}