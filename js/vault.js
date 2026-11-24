// ---------- Vault page: show every entry ----------

const list = document.querySelector('#vault-list');


// Build one full-width row from one entry object
function createRow(entry) {
  const row = document.createElement('article');
  row.className = 'vault-row';

  // Date + tags line
  const meta = document.createElement('div');
  meta.className = 'row-meta';

  const date = document.createElement('p');
  date.className = 'row-date';
  date.textContent = entry.date;
  meta.append(date);

  if (entry.tags) {
    entry.tags.forEach((tagName) => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tagName;
      meta.append(tag);
    });
  }

  // ••• menu (visual only for now)
  const menu = document.createElement('button');
  menu.type = 'button';
  menu.className = 'row-menu';
  menu.setAttribute('aria-label', 'Entry options');
  menu.textContent = '•••';

  const title = document.createElement('h2');
  title.className = 'row-title';
  title.textContent = entry.title;

  const body = document.createElement('p');
  body.className = 'row-body';
  body.textContent = shorten(entry.body, 220);

  row.append(meta, menu, title, body);
  return row;
}

// Show ALL entries — no slice this time
const entries = getEntries();
list.innerHTML = '';

if (entries.length === 0) {
  list.innerHTML = '<p class="empty-msg">Your vault is empty. <a href="new-entry.html">Write your first entry</a>.</p>';
} else {
  entries.forEach((entry) => {
    list.append(createRow(entry));
  });
}