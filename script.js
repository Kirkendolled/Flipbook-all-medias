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
let maxLocation = numOfPapers + 1;

function openBook() {
    if (window.innerWidth > 768) {
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = "translateX(-180px)";
        nextBtn.style.transform = "translateX(180px)";
    } else {
        book.style.transform = "none";
        prevBtn.style.transform = "none";
        nextBtn.style.transform = "none";
    }
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "none";
    } else {
        book.style.transform = "none";
    }
    prevBtn.style.transform = "none";
    nextBtn.style.transform = "none";
}

function resetPages() {
    papers.forEach((paper, index) => {
        paper.classList.remove("flipped");
        paper.style.zIndex = numOfPapers - index;
    });
}

function goNextPage() {
    if (window.innerWidth > 768) {
        if (currentLocation < maxLocation) {
            switch (currentLocation) {
                case 1:
                    openBook();
                    papers[0].classList.add("flipped");
                    papers[0].style.zIndex = 1;
                    break;
                case 2:
                    papers[1].classList.add("flipped");
                    papers[1].style.zIndex = 2;
                    break;
                case 3:
                    papers[2].classList.add("flipped");
                    papers[2].style.zIndex = 3;
                    break;
                case 4:
                    papers[3].classList.add("flipped");
                    papers[3].style.zIndex = 4;
                    break;
                case 5:
                    papers[4].classList.add("flipped");
                    papers[4].style.zIndex = 5;
                    break;
                default:
                    throw new Error("unknown state");
            }
            currentLocation++;
        } else {
            closeBook(true);
            resetPages();
            currentLocation = 1;
        }
    } else {
        if (currentLocation < numOfPapers) {
            currentLocation++;
            showPage(currentLocation);
        }
    }
}

function goPrevPage() {
    if (window.innerWidth > 768) {
        if (currentLocation > 1) {
            switch (currentLocation) {
                case 2:
                    closeBook(true);
                    papers[0].classList.remove("flipped");
                    papers[0].style.zIndex = 5;
                    break;
                case 3:
                    papers[1].classList.remove("flipped");
                    papers[1].style.zIndex = 4;
                    break;
                case 4:
                    papers[2].classList.remove("flipped");
                    papers[2].style.zIndex = 3;
                    break;
                case 5:
                    papers[3].classList.remove("flipped");
                    papers[3].style.zIndex = 2;
                    break;
                case 6:
                    papers[4].classList.remove("flipped");
                    papers[4].style.zIndex = 1;
                    break;
                default:
                    throw new Error("unknown state");
            }
            currentLocation--;
        } else {
            openBook();
            papers.forEach(paper => paper.classList.add("flipped"));
            currentLocation = maxLocation - 1;
        }
    } else {
        if (currentLocation > 1) {
            currentLocation--;
            showPage(currentLocation);
        }
    }
}

function showPage(pageNumber) {
    papers.forEach((paper, index) => {
        if (index === pageNumber - 1) {
            paper.style.display = "block";
        } else {
            paper.style.display = "none";
        }
    });
}

// Initial setup to show the first page on mobile
if (window.innerWidth <= 768) {
    showPage(currentLocation);
}

// Event listener to handle resize events
window.addEventListener('resize', function () {
    if (window.innerWidth <= 768) {
        // Ensure only the current page is displayed on mobile
        showPage(currentLocation);
    } else {
        // Reset to the original flipbook view on desktop
        resetPages();
    }
});

