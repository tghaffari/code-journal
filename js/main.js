
var $img = document.querySelector('#img');
var $photoUrl = document.querySelector('#photo-url');
var $newEntryForm = document.querySelector('#new-entry-form');
var $entriesList = document.querySelector('#entries-list');
var $newButton = document.querySelector('.new-button');
var $navbarEntries = document.querySelector('.navbar-entries');
var $dataView = document.querySelectorAll('[data-view]');
var $entriesPlaceholder = document.querySelector('.entries-placeholder');

function updateImage(event) {
  $img.setAttribute('src', event.target.value);
}

$photoUrl.addEventListener('input', updateImage);

function saveNewEntry(event) {
  event.preventDefault();
  var titleInput = $newEntryForm.elements.title.value;
  var photoUrlInput = $newEntryForm.elements.url.value;
  var notesInput = $newEntryForm.elements.notes.value;
  var newEntryInput = { title: titleInput, photoUrl: photoUrlInput, notes: notesInput };
  newEntryInput.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntryInput);
  var createdJournalEntry = renderJournalEntry(newEntryInput);
  $entriesList.prepend(createdJournalEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  if (data.entries.length > 0) {
    $entriesPlaceholder.className = 'row bottom-margin entries-placeholder hidden';
  }
  $newEntryForm.reset();
  viewSwap('entries');
}

$newEntryForm.addEventListener('submit', saveNewEntry);

function renderJournalEntry(entry) {

  // <li class="bottom-margin">
  //  <div class="row">
  //    <div class="column-full column-half center">
  //      <img class="img-placeholder bottom-margin" src=$photoURL //(value)>
  //    </div>
  //    <div class="column-full column-half">
  //      <h1 class="title-styling">Title</h1>
  //      <p class="notes-styling">Notes</p>
  //    </div>
  //  </div>
  // </li>

  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'bottom-margin');

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  liElement.appendChild(rowDiv);

  var imgColumnDiv = document.createElement('div');
  imgColumnDiv.setAttribute('class', 'column-full column-half center');
  rowDiv.appendChild(imgColumnDiv);

  var imgElement = document.createElement('img');
  imgElement.setAttribute('class', 'img-placeholder bottom-margin');
  imgElement.setAttribute('src', entry.photoUrl);
  imgColumnDiv.appendChild(imgElement);

  var columnDiv = document.createElement('div');
  columnDiv.setAttribute('class', 'column-full column-half');
  rowDiv.appendChild(columnDiv);

  var titleHeader = document.createElement('h1');
  titleHeader.setAttribute('class', 'title-styling');
  titleHeader.textContent = entry.title;
  columnDiv.appendChild(titleHeader);

  var notesParagraph = document.createElement('p');
  notesParagraph.setAttribute('class', 'notes-styling');
  notesParagraph.textContent = entry.notes;
  columnDiv.appendChild(notesParagraph);

  return liElement;
}

function handleDomContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newJournalEntry = renderJournalEntry(data.entries[i]);
    $entriesList.appendChild(newJournalEntry);
  }

  viewSwap(data.view);

  if (data.entries.length > 0) {
    $entriesPlaceholder.className = 'row bottom-margin entries-placeholder hidden';
  }
}

document.addEventListener('DOMContentLoaded', handleDomContentLoaded);

function assignDataView(event) {
  if (event.target.matches('.new-button')) {
    viewSwap('entry-form');
  }

  if (event.target.matches('.navbar-entries')) {
    viewSwap('entries');
  }
}

function viewSwap(view) {
  for (var i = 0; i < $dataView.length; i++) {
    if (view === $dataView[i].getAttribute('data-view')) {
      $dataView[i].className = '';
      data.view = view;
    } else {
      $dataView[i].className = 'hidden';
    }
  }
}

$newButton.addEventListener('click', assignDataView);
$navbarEntries.addEventListener('click', assignDataView);
