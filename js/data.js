/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var dataJSON = localStorage.getItem('data-local-storage');
if (dataJSON !== null) {
  data = JSON.parse(dataJSON);
}

function saveEntryData(event) {
  data.editing = null;
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}

window.addEventListener('beforeunload', saveEntryData);
