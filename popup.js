// code for opening and closing custom tralation
const writeTextDiv = document.getElementById("write-text");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");

openBtn.addEventListener("click", () => {
  writeTextDiv.classList.remove("hidden");
  writeTextDiv.classList.add("flex");
});

closeBtn.addEventListener("click", () => {
  writeTextDiv.classList.remove("flex");
  writeTextDiv.classList.add("hidden");
});
// --------------------------------

// translate custom-text

const translateBtn = document.getElementById("custom-translate");
const textarea1 = document.getElementById("textarea1");
const textarea2 = document.getElementById("textarea2");
const selectTags = document.querySelectorAll("select");

translateBtn.addEventListener("click", () => {
  const translateFrom = selectTags[0].value;
  const translateTo = selectTags[1].value;
  // console.log(translateFrom, translateTo);
  const content = textarea1.value;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${content}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then((res) =>
    res.json().then((data) => {
      // console.log(data);
      textarea2.value = data?.responseData.translatedText;
    })
  );
});

// ----------------

const selectTag = document.querySelectorAll("select");
selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected;
    if (id === 0 && country_code === "en-GB") {
      selected = "selected";
    } else if (id === 1 && country_code === "hi-IN") {
      selected = "selected";
    }
    let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

// code for chat translate
document.getElementById("translate").addEventListener("click", () => {
  // Access the select elements
  const selectTags = document.querySelectorAll("select");

  const translateFrom = selectTags[0].value;
  const translateTo = selectTags[1].value;
  // console.log(translateFrom, translateTo);

  // Send a message to the content script to modify the content
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "translate",
      translateFrom,
      translateTo,
    });
  });
});
// ------------------------------
