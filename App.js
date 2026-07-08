function loadScreen(name) {
  if (name === "home") loadHome();
  if (name === "session") loadSession();
  if (name === "catch") loadCatch();
  if (name === "gallery") loadGallery();
}

document.querySelectorAll(".nav-item").forEach(item => {
  item.onclick = () => loadScreen(item.dataset.screen);
});

function loadHome() {
  screen.innerHTML = `
    <div class="circle-btn" id="new-session-btn">
      <div>BDSZ</div>
      <div style="font-size:60px;">+</div>
    </div>
  `;
  document.getElementById("new-session-btn").onclick = () => loadScreen("session");
}

function loadSession() {
  screen.innerHTML = `
    <h2>Nova sesija</h2>
    <label>Vrsta vode</label>
    <select id="water-type">
      <option value="rijeka">Rijeka</option>
      <option value="jezero">Jezero</option>
      <option value="kanal">Kanal</option>
    </select>
    <br><br>
    <button id="start-session-btn">Start sesije</button>
  `;
  document.getElementById("start-session-btn").onclick = startNewSession;
}

function startNewSession() {
  const session = {
    id: Date.now(),
    startTime: new Date().toISOString(),
    waterType: document.getElementById("water-type").value,
    catches: []
  };
  localStorage.setItem("activeSession", JSON.stringify(session));
  loadScreen("catch");
}

function loadCatch() {
  screen.innerHTML = `
    <h2>Novi ulov</h2>
    <label>Vrsta ribe</label>
    <select id="fish-type">
      <option>Šaran</option>
      <option>Mrena</option>
      <option>Som</option>
      <option>Smudj</option>
    </select><br><br>

    <label>Težina (kg)</label>
    <input type="number" id="weight"><br><br>

    <label>Dužina (cm)</label>
    <input type="number" id="length"><br><br>

    <label>Mamac</label>
    <select id="bait">
      <option>Kukuruz</option>
      <option>Crvi</option>
      <option>Pelet</option>
      <option>Hleb</option>
    </select><br><br>

    <button id="save-catch-btn">Spremi ulov</button>
  `;
  document.getElementById("save-catch-btn").onclick = saveCatch;
}

function saveCatch() {
  const session = JSON.parse(localStorage.getItem("activeSession"));
  const catchData = {
    id: Date.now(),
    fish: document.getElementById("fish-type").value,
    weight: document.getElementById("weight").value,
    length: document.getElementById("length").value,
    bait: document.getElementById("bait").value
  };
  session.catches.push(catchData);
  localStorage.setItem("activeSession", JSON.stringify(session));
  loadScreen("gallery");
}

function loadGallery() {
  const session = JSON.parse(localStorage.getItem("activeSession"));
  screen.innerHTML = `<h2>Galerija</h2>`;
  session.catches.forEach(c => {
    screen.innerHTML += `
      <div class="gallery-item">
        ${c.fish} - ${c.weight}kg - ${c.length}cm
      </div>
    `;
  });
}

loadHome();
