const generateBtn = document.getElementById("generate");
const output = document.getElementById("output");

function extractVideoId(url) {
  try {
    const u = new URL(url.trim());
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }
    if (u.pathname.startsWith("/shorts/")) {
      return u.pathname.split("/")[2];
    }
    return null;
  } catch {
    return null;
  }
}

function generateQuestion() {
  const templates = [
    "What is the main idea presented in this video?",
    "What problem is this video trying to solve?",
    "What is one key takeaway from this video?",
    "How would you explain the main concept of this video to someone else?",
    "What does the creator emphasise as most important?",
    "What question would you ask after watching this video?"
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

generateBtn.addEventListener("click", () => {
  output.innerHTML = "";

  const urls = document
    .getElementById("urls")
    .value
    .split("\n")
    .map(u => u.trim())
    .filter(Boolean);

  if (!urls.length) {
    output.innerHTML = "<p>Please paste at least one YouTube URL.</p>";
    return;
  }

  urls.forEach((url) => {
    const id = extractVideoId(url);
    if (!id) return;

    const question = generateQuestion();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>Video ID: ${id}</h3>
      <div class="question">${question}</div>
    `;

    output.appendChild(card);
  });
});
