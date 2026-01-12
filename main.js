// Konfigurasi Variabel
let flashcards = [];
let currentIndex = 0;
const endpoint = "https://pabcl.codelabspace.or.id/flashcards";

//ambil data API
fetch(endpoint)
  .then((result) => result.json())
  .then(({ data }) => {
    flashcards = data.slice(-10);
    if (flashcards.length > 0) {
      updateCardContent();
      updateProgressBar();
    }
  })
  .catch((err) => console.error("Gagal load API:", err));

// fungsi update konten flashcard
function updateCardContent() {
  const currentData = flashcards[currentIndex];

  // update question (verb in english)
  document.querySelector(".card-front .verb-text").textContent =
    currentData.question;

  // update answer (verb in indo)
  document.querySelector(".card-back .verb-text").textContent =
    currentData.answer;

  // auto flip card
  document.getElementById("cardElement").classList.remove("is-flipped");
}

// fungsi navigasi next
function moveNext() {
  if (currentIndex < flashcards.length - 1) {
    currentIndex++;
    updateCardContent();
    updateProgressBar();
  } else {
    document.getElementById("congratsOverlay").style.display = "flex";
  }
}

// fungsi navigasi prev
function movePrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCardContent();
    updateProgressBar();
  }
}

// fungsi progress bar
function updateProgressBar() {
  const total = flashcards.length;
  const progress = ((currentIndex + 1) / total) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

// fungsi flip
function flipCard() {
  document.getElementById("cardElement").classList.toggle("is-flipped");
}
