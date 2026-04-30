const fs = require('fs');
const https = require('https');

https.get('https://api.github.com/users/UthkarshMandloi/repos', {
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const repos = JSON.parse(data);
    const ndjson = repos.map(repo => {
      return JSON.stringify({
        _type: 'project',
        _id: `project-${repo.id}`,
        title: repo.name.replace(/-/g, ' '),
        slug: { _type: 'slug', current: repo.name.toLowerCase() },
        summary: repo.description || 'A project by Uthkarsh Mandloi on GitHub.',
        technologies: repo.language ? [repo.language] : ['Various'],
        link: repo.homepage || repo.html_url,
        github: repo.html_url
      });
    }).join('\n');
    
    fs.writeFileSync('projects.ndjson', ndjson);
    console.log('projects.ndjson created successfully.');
  });
}).on('error', err => {
  console.error(err);
});
