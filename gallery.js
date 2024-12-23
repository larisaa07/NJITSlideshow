let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  $('.moreIndicator').on('click', function () {
    $(this).toggleClass('rot90').toggleClass('rot270');
    $('.details').slideToggle()
  });
  // - slideToggle the visibility of the .details section

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', function () {
    showNextPhoto();
  });

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', function () {
    showPrevPhoto();
  });

  // Call fetchJSON() to load the initial set of images
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    type: "GET",
    url: "images.json",
    dataType: "json",
    success: function (data) {
      mImages = data.images;

      swapPhoto();
    },
  });
  // Use $.ajax here to request the JSON data from mUrl
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  // Access mImages[mCurrentIndex] to update the image source and details
  $('#photo').attr('src', mImages[mCurrentIndex].imgPath);
  // Update the #photo element's src attribute with the current image's path

  // Update the .location, .description, and .date elements with the current image's details
  $('.name').text(`Name: ${mImages[mCurrentIndex].name}`);
  $('.career').text(`Career: ${mImages[mCurrentIndex].career}`);
  $('.pay').text(`Pay: ${mImages[mCurrentIndex].pay}`);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  // Increment mCurrentIndex and call swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
  mCurrentIndex++;
  if (mCurrentIndex > mImages.length - 1){
    mCurrentIndex = 0
  };
  swapPhoto();
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
  mCurrentIndex--;
  if (mCurrentIndex < 0){
    mCurrentIndex = mImages.length - 1
  };
  swapPhoto();
}

// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
  setInterval(function() {
    showNextPhoto();
    console.log("Timer tick!");
  }, mWaitTime);
}
