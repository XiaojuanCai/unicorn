'use strict';

function setEventListeners() {
  $('.location').on('change',sendLocation);
}

function sendLocation(event) {
  let location = event.target.value;
  let id = event.target.id;

  const ajaxSettings = {
    method: 'PUT',
    data: { 'location': location, 'id' : id }
  };

  $.ajax(`/updateLocation`, ajaxSettings)
    .then(() => {
      $(`#updated_${id}`).html("Location changed to '" + location + "'.");  
    });
}

setEventListeners();