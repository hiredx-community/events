const fs = require('fs');
const path = require('path');

// Capitalizes each word in a string (e.g., "full stack club" → "Full Stack Club")
function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parseFilename(filename) {
  const name = filename.replace('.md', '');
  const parts = name.split('_');
  const [date, group, ...rest] = parts;

  let status = '';
  let titleParts = rest;
  if (rest[rest.length - 1] === 'archived') {
    status = 'archived';
    titleParts.pop();
  }

  const title = titleParts.join(' ');
  return {
    date,
    group: capitalizeWords(group.replace(/-/g, ' ')),
    title: capitalizeWords(title.replace(/-/g, ' ')),
    status,
    filename
  };
}

function generateReadme(dir, title, reverse = false) {
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(parseFilename)
    .sort((a, b) => (reverse ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

  const content = [
    `# ${title}`,
    '',
    '| Date       | Study Group      | Title         | File |',
    '|------------|------------------|---------------|------|',
    ...files.map(file =>
      `| ${file.date} | ${file.group} | ${file.title} | [Link](./${file.filename}) |`
    )
  ].join('\n');

  fs.writeFileSync(path.join(dir, 'README.md'), content);
}

generateReadme('upcoming-events', '📅 Upcoming Events');
generateReadme('past-events', '📁 Past Events', true);
