const videoSlides = document.querySelectorAll(".video-slide");
const contentSlides = document.querySelectorAll(".content");
const navButtons = document.querySelectorAll(".nav-btn");

let currentSlide = 0;

function updateSlider(index) {
  videoSlides.forEach((video, i) => {
    video.classList.remove("active");
    contentSlides[i].classList.remove("active");
    navButtons[i].classList.remove("active");
  });

  videoSlides[index].classList.add("active");
  contentSlides[index].classList.add("active");
  navButtons[index].classList.add("active");
}

navButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentSlide = index;
    updateSlider(currentSlide);
  });
});

// Auto slide functionality
setInterval(() => {
  currentSlide = (currentSlide + 1) % videoSlides.length;
  updateSlider(currentSlide);
}, 5000);

const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

// Toggle navigation menu on click
menuBtn.addEventListener("click", () => {
  navigation.classList.toggle("active");
});
// ////////////////////////////////////////


fetch("https://67ab14a565ab088ea7e8930a.mockapi.io/place/place")
  .then((response) => response.json())
  .then((data) => {
    let placeGrid = document.getElementById("placeGrid");

    placeGrid.style.display = "flex";
    placeGrid.style.flexWrap = "wrap";
    placeGrid.style.justifyContent = "space-around";
    placeGrid.style.alignContent = "center";
    placeGrid.style.gap = "10px";
    placeGrid.style.padding = "20px";

    document.body.style.backgroundColor = "#45008a"; // Set body background

    data.map((place) => {
      let title = document.createElement("h1");
      title.style.textAlign = "center";
      title.innerHTML = place.title;
      title.style.fontSize="large"

      let image = document.createElement("img");
      image.src = place.image;
      image.style.height = "250px";
      image.style.width = "250px";
      image.style.display = "block";
      image.style.margin = "auto";
      image.style.borderRadius = "8px";

      let information = document.createElement("p");
      information.innerText = place.information;
      information.style.textAlign = "center";

      let rating = document.createElement("h4");
      rating.innerHTML = `⭐⭐ ${place.rating}`;
      rating.style.border = "1px solid black";
      rating.style.borderRadius = "20px";
      rating.style.padding = "5px";
      rating.style.width = "95px";
      rating.style.textAlign = "center";
      rating.style.margin = "auto";
      rating.style.fontSize="large"

      let cost = document.createElement("p");
      cost.innerHTML = `💰 ${place.cost}`;
      cost.style.textAlign = "center";
      cost.style.fontWeight = "bold";

      

      let bookButton = document.createElement("button");
      bookButton.innerHTML = "Book Now";
      bookButton.style.backgroundColor = "#45008a";
      bookButton.style.color = "white";
      bookButton.style.padding = "10px";
      bookButton.style.marginLeft = "10px";
      bookButton.style.border = "3px solid green";
      bookButton.style.borderRadius = "5px";
      bookButton.style.cursor = "pointer";
      bookButton.style.transition = "transform 0.3s, background-color 0.3s";
      

      bookButton.addEventListener("click", function () {
        alert("You are ready to book slot");
        location.href = "book.html";
      });

      bookButton.addEventListener("mouseover", function () {
        bookButton.style.transform = "scale(1.1)";
        bookButton.style.backgroundColor = "darkgreen";
      });

      bookButton.addEventListener("mouseout", function () {
        bookButton.style.transform = "scale(1)";
        bookButton.style.backgroundColor = "#45008a";
      });

      let buttonContainer = document.createElement("div");
      buttonContainer.style.textAlign = "center";
      buttonContainer.append(bookButton);

      let card = document.createElement("div");
      card.append(title, image, information, rating, cost, buttonContainer);
      card.style.border = "3px solid black";
      card.style.height = "auto";
      card.style.width = "300px";
      card.style.padding = "12px";
      card.style.borderRadius = "15px";
      card.style.backgroundColor = "white";
      card.style.transition = "transform 0.4s ease-in-out, background-color 0.3s";
      card.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.3)";
      card.style.textAlign = "center";

      card.addEventListener("mouseover", function () {
        card.style.transform = "scale(1.02) translateY(-5px)";
        card.style.backgroundColor = "lightgrey";
        card.style.boxShadow = "4px 4px 15px rgba(0,0,0,0.5)";
      });

      card.addEventListener("mouseout", function () {
        card.style.transform = "scale(1) translateY(0)";
        card.style.backgroundColor = "white";
        card.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.3)";
      });

      placeGrid.appendChild(card);
    });
  })
  .catch((error) => console.log(error));

  // reviews
 // Function to handle review submission
document.getElementById('submit-review').addEventListener('click', function () {
  const name = document.getElementById('customer-name').value;
  const text = document.getElementById('feedback-text').value;
  const rating = parseInt(document.getElementById('feedback-rating').value);
  const imageUrl = document.getElementById('image-url').value; // Get image URL

  if (name && text) {
      const newReview = { name, text, rating, imageUrl }; // Include image URL in the review object
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviews.push(newReview); // Add the new review to the array
      localStorage.setItem('reviews', JSON.stringify(reviews)); // Save to localStorage

      displayReviews(); // Refresh the reviews UI
      document.getElementById('customer-name').value = ''; // Clear input fields
      document.getElementById('feedback-text').value = '';
      document.getElementById('image-url').value = ''; // Clear image URL field
  } else {
      alert('Please enter both your name and feedback!');
  }
});

// Function to display reviews
function displayReviews() {
  const feedbackContainer = document.getElementById('feedback-container');
  feedbackContainer.innerHTML = ''; // Clear existing reviews

  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach((review, index) => {
      const feedbackItem = document.createElement('div');
      feedbackItem.classList.add('feedback-item');

      feedbackItem.innerHTML = `
          <div class="feedback-info">
              <p class="customer-name">${review.name}</p>
              <p class="feedback-text">${review.text}</p>
          </div>
          <div class="feedback-rating">
              ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
          </div>
          ${review.imageUrl ? `<div class="feedback-image">
              <img src="${review.imageUrl}" alt="Feedback Image" class="zoom-image"/>
          </div>` : ''}
          <button class="remove-button" onclick="removeReview(${index})">Remove</button>
      `;

      feedbackContainer.appendChild(feedbackItem);
  });
}

// Function to remove a review
function removeReview(index) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.splice(index, 1); // Remove the review at the specified index
  localStorage.setItem('reviews', JSON.stringify(reviews)); // Save the updated list back to localStorage

  displayReviews(); // Refresh the reviews UI
}

// Display existing reviews when the page loads
window.onload = displayReviews;


// searching places



