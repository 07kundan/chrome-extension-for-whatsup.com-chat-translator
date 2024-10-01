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

document.getElementById("translate").addEventListener("click", () => {
  // Access the select elements
  const selectTags = document.querySelectorAll("select");

  const translateFrom = selectTags[0].value;
  const translateTo = selectTags[1].value;
  console.log(translateFrom, translateTo);

  // Send a message to the content script to modify the content
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "translate",
      translateFrom,
      translateTo,
    });
  });
});
