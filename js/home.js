// ---------- Home page: show the 5 most recent entries ----------

const grid = document.querySelector('#entry-grid');


// Build one card element from one entry object
function createCard(entry) {
  const card = document.createElement('article');
  card.className = 'card';

  const date = document.createElement('p');
  date.className = 'card-date';
  date.textContent = entry.date;

  const title = document.createElement('h2');
  title.className = 'card-title';
  title.textContent = entry.title;

  const body = document.createElement('p');
  body.className = 'card-body';
  body.textContent = shorten(entry.body, 160);

  card.append(date, title, body);

  // Only add a tags row if the entry has tags
  if (entry.tags && entry.tags.length > 0) {
    const tags = document.createElement('div');
    tags.className = 'tags';

    entry.tags.forEach((tagName) => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tagName;
      tags.append(tag);
    });

    card.append(tags);
  }

  return card;
}

// Get the 5 most recent entries and show them
const recentEntries = getEntries().slice(0, 5);

grid.innerHTML = '';
recentEntries.forEach((entry) => {
  grid.append(createCard(entry));
});