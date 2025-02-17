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


async function fetchAndFilterPlaces() {
  const searchValue = document.getElementById("search-box").value.trim().toLowerCase();
  const placeGrid = document.getElementById("placeGrid");
  placeGrid.innerHTML = ""; // Clear previous results

  try {
      const response = await fetch("https://67ab14a565ab088ea7e8930a.mockapi.io/place/place");
      const data = await response.json();

      // Filter places based on search input
      const filteredPlaces = data.filter(place => 
          place.title.toLowerCase().includes(searchValue)
      );

      if (filteredPlaces.length === 0) {
          placeGrid.innerHTML = "<h2 style='color:white;'>No matching places found</h2>";
          return;
      }

      filteredPlaces.forEach(place => {
          let card = document.createElement("div");
          card.className = "place-card";

          let title = document.createElement("h1");
          title.innerHTML = place.title;
          title.style.fontSize = "large";

          let image = document.createElement("img");
          image.src = place.image;
          image.className = "place-img";

          let information = document.createElement("p");
          information.innerText = place.information;

          let rating = document.createElement("h4");
          rating.innerHTML = `⭐⭐ ${place.rating}`;
          rating.style.border = "1px solid black";
          rating.style.borderRadius = "20px";
          rating.style.padding = "5px";
          rating.style.width = "95px";
          rating.style.textAlign = "center";
          rating.style.margin = "auto";
          rating.style.fontSize = "large";

          let cost = document.createElement("p");
          cost.innerHTML = `💰 ${place.cost}`;
          cost.style.fontWeight = "bold";

          let bookButton = document.createElement("button");
          bookButton.innerHTML = "Book Now";
          bookButton.className = "book-btn";
          bookButton.addEventListener("click", () => {
              alert("You are ready to book a slot!");
              location.href = "book.html";
          });

          card.append(title, image, information, rating, cost, bookButton);
          placeGrid.appendChild(card);
          document.body.style.backgroundColor="#45008a"
      });

  } catch (error) {
      console.error("Error fetching places:", error);
      placeGrid.innerHTML = "<h2 style='color:white;'>Failed to load places</h2>";
  }
}

// Initial fetch when the page loads
fetchAndFilterPlaces();

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

// logout button
function logout() {
  alert("Are you sure you want to log out?");
  let userInput = prompt("If yes, please enter 'yes' or type 'no' to cancel.");

  if (userInput && userInput.toLowerCase() === "yes") {
    alert("You have been logged out successfully!");

    // Show full-screen loading page
    document.getElementById("loadingPage").style.display = "block";

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "login.html"; // Change to your actual login page
    }, 2000);
  } else {
    alert("Logout canceled.");
  }
}
// logout button end

