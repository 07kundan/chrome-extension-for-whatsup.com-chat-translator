// Content script to modify page content

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log(request);
  if (request.action === "translate") {
    const elements = document.querySelectorAll("._akbu");

    elements.forEach((element) => {
      const spans = element.querySelector("span.selectable-text");

      const spanElement = spans.querySelectorAll("span");

      spanElement.forEach((span) => {
        const clonedSpan = span.cloneNode(true);
        const text = span.textContent;
        // console.log(text);
        clonedSpan.style.display = "block";
        clonedSpan.style.color = "blue";
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${request.translateFrom}|${request.translateTo}`;
        fetch(apiUrl).then((res) =>
          res.json().then((data) => {
            // console.log(data);
            clonedSpan.textContent = data?.responseData.translatedText;
          })
        );
        spans.appendChild(clonedSpan);
      });
    });
    sendResponse({ status: "success" });
  }
});
