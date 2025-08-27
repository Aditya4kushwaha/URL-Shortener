const form = document.getElementById("urlForm");
const longUrl = document.getElementById("longUrl");
const errorMsg = document.getElementById("errorMsg");
const resultBox = document.getElementById("resultBox");
const shortUrlEl = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");

const apiBase = "https://url-shortener-backend-75h1.onrender.com/url";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = longUrl.value.trim();
  errorMsg.textContent = "";
  resultBox.style.display = "none";

  if (!url) {
    errorMsg.textContent = "Please enter a valid URL";
    return;
  }

  try {
    const res = await fetch(apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (res.ok && data.shortUrl) {
      shortUrlEl.innerHTML = `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
      resultBox.style.display = "flex";
    } else {
      errorMsg.textContent = data.message || "Failed to shorten URL";
    }
  } catch {
    errorMsg.textContent = "Could not reach server. Try again later.";
  }
});

copyBtn.addEventListener("click", () => {
  const link = shortUrlEl.querySelector("a")?.href || shortUrlEl.textContent;
  if (!link) return;
  navigator.clipboard.writeText(link)
    .then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy", 1500);
    })
    .catch(() => {
      alert("Failed to copy URL");
    });
});
