// ---------- Elements ----------
const form = document.querySelector('#entry-form');
const saveBtn = document.querySelector('#save-btn');
const titleInput = document.querySelector('#entry-title');
const bodyInput = document.querySelector('#entry-body');
const tagSelect = document.querySelector('#entry-tag');
const dateDisplay = document.querySelector('#entry-date');

// ---------- Show today's date in the editor ----------
dateDisplay.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
});

// ---------- Read the saved entries (or an empty array) ----------
function getEntries() {
  return JSON.parse(localStorage.getItem('entries')) || [];
}

// ---------- Save ----------
saveBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const tag = tagSelect.value;

  // Don't save an empty entry
  if (body === '') {
    bodyInput.placeholder = 'Write something before saving...';
    bodyInput.focus();
    return;
  }

  // Build the entry object
  const newEntry = {
    id: Date.now(),
    title: title || 'Untitled Reflection',
    body: body,
    tags: [tag],
    date: new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })
  };

  // Load the existing array, add the new entry to the front, save it back
  const entries = getEntries();
  entries.unshift(newEntry);
  localStorage.setItem('entries', JSON.stringify(entries));

  console.log('Saved:', newEntry);
  console.log('All entries:', entries);

  form.reset();
  // window.location.href = 'index.html';   
});