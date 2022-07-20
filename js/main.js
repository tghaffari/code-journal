
var $img = document.querySelector('#img');
var $photoUrl = document.querySelector('#photo-url');
var $newEntryForm = document.querySelector('#new-entry-form');
var $entriesList = document.querySelector('#entries-list');
var $newButton = document.querySelector('.new-button');
var $navbarEntries = document.querySelector('.navbar-entries');
var $dataView = document.querySelectorAll('[data-view]');
var $entriesPlaceholder = document.querySelector('.entries-placeholder');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

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
  //      <div class="row spacing">
  //        <div class=" column-flex">
  //          <h1 class="title-styling">Title</h1>
  //        </div>
  //        <div class="column-flex">
  //          <i class="fa-solid fa-pen pen-styling"></i>
  //        </div>
  //      </div>
  //      <div class="row">
  //        <div class="column-flex">
  //          <p class="notes-styling">Notes</p>
  //        </div>
  //      </div>
  //    </div>
  //  </div>
  // </li>

  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'bottom-margin');
  liElement.setAttribute('data-entry-id', entry.entryId);

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

  var rowSpacing = document.createElement('div');
  rowSpacing.setAttribute('class', 'row spacing');
  columnDiv.appendChild(rowSpacing);

  var columnFlex1 = document.createElement('div');
  columnFlex1.setAttribute('class', 'column-flex');
  rowSpacing.appendChild(columnFlex1);

  var titleHeader = document.createElement('h1');
  titleHeader.setAttribute('class', 'title-styling');
  titleHeader.textContent = entry.title;
  columnFlex1.appendChild(titleHeader);

  var columnFlex2 = document.createElement('div');
  columnFlex2.setAttribute('class', 'column-flex');
  rowSpacing.appendChild(columnFlex2);

  var iPen = document.createElement('i');
  iPen.setAttribute('class', 'fa-solid fa-pen edit-button');
  columnFlex2.appendChild(iPen);

  var rowDiv2 = document.createElement('div');
  rowDiv2.setAttribute('class', 'row');
  columnDiv.appendChild(rowDiv2);

  var columnFlex3 = document.createElement('div');
  columnFlex3.setAttribute('class', 'column-flex');
  rowDiv2.appendChild(columnFlex3);

  var notesParagraph = document.createElement('p');
  notesParagraph.setAttribute('class', 'notes-styling');
  notesParagraph.textContent = entry.notes;
  columnFlex3.appendChild(notesParagraph);

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

function viewSwap(view) {
  for (var i = 0; i < $dataView.length; i++) {
    if (view === $dataView[i].getAttribute('data-view')) {
      $dataView[i].className = 'view';
      data.view = view;
    } else {
      $dataView[i].className = 'view hidden';
    }
  }
}

function handleNewButtonClick(event) {
  viewSwap('entry-form');
}

function handleNavBarEntriesClick(event) {
  viewSwap('entries');
}

function handleEditButtonClick(event) {
  if (event.target.matches('.edit-button')) {
    viewSwap('entry-form');
    if (event.target.tagName === 'I') {
      var closestItem = event.target.closest('li');
    }

    var dataEntryId = closestItem.getAttribute('data-entry-id');
    dataEntryId = parseInt(dataEntryId);

    for (var i = 0; i < data.entries.length; i++) {
      if (dataEntryId === data.entries[i].entryId) {
        data.editing = data.entries[i];
      }
    }
    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photoUrl;
    $notes.value = data.editing.notes;
  }
}

$newButton.addEventListener('click', handleNewButtonClick);
$navbarEntries.addEventListener('click', handleNavBarEntriesClick);
$entriesList.addEventListener('click', handleEditButtonClick);
