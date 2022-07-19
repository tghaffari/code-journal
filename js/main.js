/* eslint-disable no-console */

var $img = document.querySelector('#img');
var $photoUrl = document.querySelector('#photo-url');
var $newEntryForm = document.querySelector('#new-entry-form');

function updateImage(event) {
  $img.setAttribute('src', event.target.value);
}

$photoUrl.addEventListener('input', updateImage);

function saveNewEntry(event) {
  event.preventDefault();
  console.log('event.target', event.target.value);
  var titleInput = $newEntryForm.elements.title.value;
  var photoUrlInput = $newEntryForm.elements.url.value;
  var notesInput = $newEntryForm.elements.notes.value;
  var newEntryInput = { title: titleInput, photoUrl: photoUrlInput, notes: notesInput };
  newEntryInput.entryId = data.nextEntryId;
  console.log('newEntryInput:', newEntryInput);
  data.nextEntryId++;
  data.entries.unshift(newEntryInput);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
}

$newEntryForm.addEventListener('submit', saveNewEntry);
