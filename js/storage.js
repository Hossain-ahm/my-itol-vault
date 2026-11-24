// ---------- Shared helpers used by every page ----------
const STORAGE_KEY = 'entries';

// Read saved entries. If nothing is saved, or the data is broken, return []
function getEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error('Could not read saved entries:', error);
    return [];
  }
}

// Save the whole array back to localStorage
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Cut long text down for previews
function shorten(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength).trim() + '...' : text;
}