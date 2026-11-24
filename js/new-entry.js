// ---------- Elements ----------
const form = document.querySelector('#entry-form');
const saveBtn = document.querySelector('#save-btn');
const titleInput = document.querySelector('#entry-title');
const bodyInput = document.querySelector('#entry-body');
const tagSelect = document.querySelector('#entry-tag');
const dateDisplay = document.querySelector('#entry-date');
const tagList = document.querySelector('#tag-list');
const addTagBtn = document.querySelector('#add-tag-btn');
const newTagInput = document.querySelector('#new-tag-input');

const MAX_EXTRA_TAGS = 3;
let extraTags = [];   // tags added with "+ Add Tag"

// ---------- Show today's date ----------
dateDisplay.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
});

// ---------- Tags ----------
function showTagInput() {
  if (extraTags.length >= MAX_EXTRA_TAGS) return;
  newTagInput.hidden = false;
  newTagInput.focus();
}

function hideTagInput() {
  newTagInput.value = '';
  newTagInput.hidden = true;
}

function addTag(name) {
  if (name === '') {
    hideTagInput();
    return;
  }

  // Don't allow duplicates (including the dropdown tag), ignoring case
  const allTags = [tagSelect.value, ...extraTags];
  const isDuplicate = allTags.some((tag) => tag.toLowerCase() === name.toLowerCase());

  if (!isDuplicate && extraTags.length < MAX_EXTRA_TAGS) {
    extraTags.push(name);
    renderExtraTags();
  }

  hideTagInput();
}

function renderExtraTags() {
  // Remove the old chips, then rebuild them from the array
  tagList.querySelectorAll('.chip-added').forEach((chip) => chip.remove());

  extraTags.forEach((name, index) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip chip-added';
    chip.textContent = `${name} ×`;
    chip.setAttribute('aria-label', `Remove tag ${name}`);

    chip.addEventListener('click', () => {
      extraTags.splice(index, 1);
      renderExtraTags();
    });

    tagList.insertBefore(chip, newTagInput);
  });

  // Hide "+ Add Tag" once the limit is reached
  addTagBtn.hidden = extraTags.length >= MAX_EXTRA_TAGS;
}

addTagBtn.addEventListener('click', showTagInput);

newTagInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();   // stop Enter from submitting the form
    addTag(newTagInput.value.trim());
  }
  if (event.key === 'Escape') {
    hideTagInput();
  }
});

// Clicking away also adds whatever was typed
newTagInput.addEventListener('blur', () => addTag(newTagInput.value.trim()));

// ---------- Discard ----------
form.addEventListener('reset', () => {
  extraTags = [];
  renderExtraTags();
  hideTagInput();
});

// ---------- Save ----------
saveBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (body === '') {
    bodyInput.placeholder = 'Write something before saving...';
    bodyInput.focus();
    return;
  }

  const newEntry = {
    id: Date.now(),
    title: title || 'Untitled Reflection',
    body: body,
    tags: [tagSelect.value, ...extraTags],
    date: new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })
  };

  const entries = getEntries();
  entries.unshift(newEntry);
  saveEntries(entries);

  form.reset();
  window.location.href = 'index.html';
});