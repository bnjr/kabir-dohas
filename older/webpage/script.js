const apiUrl = "https://bnjr.pythonanywhere.com/doha";
const dohaElement = document.getElementById("doha");
const translationElement = document.getElementById("translation");
const getDohaButton = document.getElementById("get-doha");

function fetchDoha() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((dohaData) => {
      dohaElement.textContent = dohaData.doha;
      translationElement.textContent = dohaData.translation;
    })
    .catch((error) => {
      console.error("Error fetching doha:", error);
    });
}

getDohaButton.addEventListener("click", fetchDoha);

// Fetch a doha when the page loads
fetchDoha();
