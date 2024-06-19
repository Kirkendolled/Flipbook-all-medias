// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const papers = document.querySelectorAll(".paper");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = papers.length;

function showPage(pageNumber) {
    papers.forEach((paper, index) => {
        if (index === pageNumber - 1) {
            paper.style.display = "block";
        } else {
            paper.style.display = "none";
        }
    });
}

function goNextPage() {
    if (currentLocation < numOfPapers) {
        currentLocation++;
        showPage(currentLocation);
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        currentLocation--;
        showPage(currentLocation);
    }
}

// Initial setup to show the first page
showPage(currentLocation);

// Event listener to handle resize events
window.addEventListener('resize', function () {
    if (window.innerWidth <= 768) {
        // Ensure only the current page is displayed on mobile
        showPage(currentLocation);
    }
});
