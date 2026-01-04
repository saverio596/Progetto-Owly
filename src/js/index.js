import '../css/style.css';

// =======================
// IMMAGINI (webpack)
// =======================
import logoPath from '../img/logo-libreria-interattiva.png';
import faviconPath from '../img/favicon.svg';

// Favicon
const link = document.createElement('link');
link.rel = 'icon';
link.href = faviconPath;
document.head.appendChild(link);

// Logo (una sola volta)
const header = document.querySelector('.header');
if (header && !header.querySelector('.app-logo')) {
  const logoImg = document.createElement('img');
  logoImg.src = logoPath;
  logoImg.alt = 'Logo Libreria Interattiva';
  logoImg.className = 'app-logo';
  header.prepend(logoImg);
}

// =======================
// DOM ELEMENTS
// =======================
const input = document.getElementById('categoryInput');
const button = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('result');

// =======================
// SEARCH BOOKS (Netlify Function)
// =======================
async function handleSearch() {
  const query = input.value.trim();
  if (!query) return;

  resultsContainer.innerHTML = '<p>Caricamento...</p>';

  try {
    // 🔥 chiamata alla Netlify Function (NO CORS)
    const response = await fetch(
      `/.netlify/functions/fetchBooks?category=${query}`
    );

    if (!response.ok) {
      throw new Error('Errore nella richiesta API');
    }

    const data = await response.json();

    if (data.works && data.works.length > 0) {
      resultsContainer.innerHTML = `
        <p style="color:#70757a;font-size:14px;">
          Trovati circa: ${data.works.length} risultati
        </p>
      `;

      resultsContainer.innerHTML += data.works
        .map(work => `
          <div class="book-card">
            <div class="cover-book">
              ${
                work.cover_id
                  ? `<img src="https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg" alt="Cover libro">`
                  : ''
              }
            </div>

            <div class="info-book">
              <h3 class="book-title" data-key="${work.key}">
                ${work.title}
              </h3>

              <p class="book-authors">
                Autore: ${
                  work.authors
                    ? work.authors.map(a => a.name).join(', ')
                    : 'Sconosciuto'
                }
              </p>

              <div
                class="description-container"
                id="desc-${work.key.replace(/\//g, '')}"
                style="display:none"
              ></div>
            </div>
          </div>
        `)
        .join('');

      // listener titoli
      resultsContainer.querySelectorAll('.book-title').forEach(title => {
        title.addEventListener('click', () =>
          toggleDescription(title.dataset.key)
        );
      });
    } else {
      resultsContainer.innerHTML = '<p>Nessun risultato trovato.</p>';
    }
  } catch (error) {
    resultsContainer.innerHTML = `<p>Errore: ${error.message}</p>`;
    console.error(error);
  }
}

// =======================
// BOOK DESCRIPTION
// =======================
async function toggleDescription(bookKey) {
  const safeId = `desc-${bookKey.replace(/\//g, '')}`;
  const descDiv = document.getElementById(safeId);

  if (!descDiv) return;

  if (descDiv.style.display === 'block') {
    descDiv.style.display = 'none';
    return;
  }

  descDiv.style.display = 'block';
  descDiv.innerHTML = '<em>Caricamento descrizione...</em>';

  try {
    const response = await fetch(
      `https://openlibrary.org${bookKey}.json`
    );

    const details = await response.json();

    let text = 'Descrizione non disponibile.';
    if (details.description) {
      text =
        typeof details.description === 'string'
          ? details.description
          : details.description.value;
    }

    descDiv.innerHTML = `<strong>Descrizione:</strong><br>${text}`;
  } catch (error) {
    descDiv.innerHTML = 'Errore nel caricamento della descrizione.';
    console.error(error);
  }
}

// =======================
// EVENTS
// =======================
button.addEventListener('click', handleSearch);

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSearch();
});
