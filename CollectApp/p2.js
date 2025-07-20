const HOST = "https://api.spotify.com/v1/search";
let t = null;
let TOKEN = "";
let searchStartTime;

function fmtNum(n) {
  return (typeof n === "number") ? n.toLocaleString() : n;
}

function msToMin(ms) {
  return (ms / 60000).toFixed(2);
}

function getImg(obj) {
  const arr = obj?.images || obj?.album?.images;
  return arr?.[arr.length - 1]?.url || "";
}

async function getAccessToken() {
  const res = await fetch("token.php");
  const data = await res.json();
  TOKEN = data.access_token;
}

function startSearch() {
  if (t) clearTimeout(t);
  t = setTimeout(liveSearch, 200);
}

function truncate(str, max = 120) {
  return (str && str.length > max) ? str.slice(0, max) + "…" : (str || "");
}

function cardTemplate(type, obj) {
  const img = getImg(obj);
  const thumb = img ? `<img src="${img}" class="thumb" alt="${obj.name}">` : `<div class="thumb"></div>`;
  let summary = "", details = "";

  switch (type) {
    case "artist":
      summary = `<strong>${obj.name}</strong><br>Followers: ${fmtNum(obj.followers?.total)}<br>Popularity: ${obj.popularity}%`;
      details = `Genres: ${obj.genres?.join(", ") || "N/A"}<br>Spotify: <a href="${obj.external_urls.spotify}" target="_blank">Open</a>`;
      break;
    case "track":
      summary = `<strong>${obj.name}</strong><br>by ${obj.artists.map(a => a.name).join(", ")}<br>Album: ${obj.album.name}`;
      details = `Duration: ${msToMin(obj.duration_ms)} min<br>Popularity: ${obj.popularity}<br>${obj.preview_url ? `<audio controls src="${obj.preview_url}"></audio>` : `<em>No preview available</em>`}<br>Spotify: <a href="${obj.external_urls.spotify}" target="_blank">Open</a>`;
      break;
    case "album":
      summary = `<strong>${obj.name}</strong><br>Tracks: ${obj.total_tracks}<br>Released: ${obj.release_date}`;
      details = `Type: ${obj.album_type}<br>Spotify: <a href="${obj.external_urls.spotify}" target="_blank">Open</a>`;
      break;
    case "show":
      summary = `<strong>${obj.name}</strong><br>Publisher: ${obj.publisher}<br>Episodes: ${obj.total_episodes}`;
      details = `${truncate(obj.description)}<br>Spotify: <a href="${obj.external_urls.spotify}" target="_blank">Open</a>`;
      break;
    case "episode":
      summary = `<strong>${obj.name}</strong><br>Release: ${obj.release_date}<br>Duration: ${msToMin(obj.duration_ms)} min`;
      details = `${truncate(obj.description)}<br>Spotify: <a href="${obj.external_urls.spotify}" target="_blank">Open</a>`;
      break;
    case "audiobook":
      summary = `<strong>${obj.name}</strong><br>Author(s): ${obj.authors?.map(a => a.name).join(", ") || "N/A"}<br>Publisher: ${obj.publisher}`;
      details = `${truncate(obj.description)}<br>Spotify: <a href="${obj.external_urls.spotify}" target="_blank">Open</a>`;
      break;
    default:
      break;
  }

  return `
    <div class="result" data-type="${type}" data-id="${obj.id}">
      ${thumb}
      <div class="summary">${summary}</div>
      <div class="details">${details}</div>
    </div>`;
}

function renderSection(title, cards) {
  return cards.length ? `<h3 class="result-section-title">${title}</h3>${cards.join("")}` : "";
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setStats(data, types, duration) {
  const getCount = (group) => (data[group]?.items || []).length;
  let topArtist = { name: "N/A", followers: 0 };
  let topTrack = { name: "N/A", popularity: 0 };
  let trackDurations = [];

  if (types.includes("artist")) {
    for (const a of data.artists?.items || []) {
      if (a.followers?.total > topArtist.followers) topArtist = a;
    }
  }

  if (types.includes("track")) {
    for (const t of data.tracks?.items || []) {
      if (t.popularity > topTrack.popularity) topTrack = t;
      trackDurations.push(t.duration_ms);
    }
  }
  let totalCount = 0;
  if (data.tracks?.items) totalCount += data.tracks.items.length;
  if (data.artists?.items) totalCount += data.artists.items.length;
  if (data.albums?.items) totalCount += data.albums.items.length;
  if (data.shows?.items) totalCount += data.shows.items.length;
  if (data.episodes?.items) totalCount += data.episodes.items.length;
  if (data.audiobooks?.items) totalCount += data.audiobooks.items.length;
  document.getElementById("resultCount").textContent = totalCount;
  

  setText("searchDuration", `${duration} ms`);
  setText("topArtist", topArtist.name);
  setText("topTrack", topTrack.name);
  setText("avgTrackDuration", trackDurations.length ? `${msToMin(trackDurations.reduce((a, b) => a + b) / trackDurations.length)} min` : "N/A");
  if (data.tracks?.items) setText("trackCount", data.tracks.items.length)
  if (data.artists?.items) setText("artistCount", data.artists.items.length)
  if (data.albums?.items) setText("albumCount", data.albums.items.length)
  if (data.shows?.items) setText("showCount", data.shows.items.length)
  if (data.episodes?.items) setText("episodeCount", data.episodes.items.length)
  if (data.audiobooks?.items) setText("audiobookCount", data.audiobooks.items.length)
}

function displayResults(data, types, duration) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  const sections = {
    track: "Tracks",
    artist: "Artists",
    album: "Albums",
    show: "Shows",
    episode: "Episodes",
    audiobook: "Audiobooks"
  };

  for (const type of types) {
    if (data[`${type}s`]?.items) {
      const cards = data[`${type}s`].items.map(obj => cardTemplate(type, obj));
      container.innerHTML += renderSection(sections[type], cards);
    }
  }

  setStats(data, types, duration);
}

async function liveSearch() {
  searchStartTime = performance.now();
  const query = document.getElementById("songSearch").value.trim() || "*";
  let types = Array.from(document.querySelectorAll("#filterWrapper input:checked")).map(i => i.value);
  if (types.length === 0) {
    types = ["track", "artist", "album", "show"];
  }
  const url = `${HOST}?q=${encodeURIComponent(query)}&type=${types.join(',')}&limit=20`;

  if (!TOKEN) await getAccessToken();

  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    const data = await res.json();
    const duration = (performance.now() - searchStartTime).toFixed(0);
    displayResults(data, types, duration);
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("results").innerHTML = "Error fetching results.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAccessToken();
  document.getElementById("search").addEventListener("click", e => {
    e.preventDefault();
    liveSearch();
  });

  document.addEventListener("click", e => {
    const card = e.target.closest(".result");
    if (card) card.classList.toggle("show");
  });

  document.getElementById("songSearch").onkeydown = startSearch;
});
