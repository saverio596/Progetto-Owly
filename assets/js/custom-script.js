const input = document.getElementById("categoryInput");
const button = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("result");


// Funzione per cercare libri su Open Library
async function handleSearch() {
    const query = input.value.trim();
    if (!query) return;

    resultsContainer.innerHTML = "<p>Caricamento...</p>";

    try {
        // API di Open Library
        const response = await fetch(`https://openlibrary.org/subjects/${encodeURIComponent(query)}.json`);
        https://covers.openlibrary.org/b/$key/$value-$size.jpg
        if (!response.ok) throw new Error("Errore nella richiesta API");

        const data = await response.json();

        if (data.works && data.works.length > 0) {

            
            // Mostra i libri
            resultsContainer.innerHTML = `<p style="color:#70757a">Trovati circa: ${data.works.length} risultati</p>`;
            resultsContainer.innerHTML += data.works.map(work => `
                <div class="book-card">
                    <div class="cover-book">
                        <img src="https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg">
                    </div>    
                    <div class="info-book">
                        <h3 class="book-title" data-key="${work.key}">${work.title}</h3>
                        <p class="book-authors">Autore: ${work.authors.map(a => a.name).join(", ")}</p>
                        <div class="description-container" id="desc-${work.key.replace(/\//g, '')}"></div>
                    </div>
                </div>
            `).join("");

                // Aggiungi listener ai titoli appena creati
            resultsContainer.querySelectorAll(".book-title").forEach(title => {
                title.addEventListener("click", () => toggleDescription(title.dataset.key, title));
            });

        } else {
            resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
        }
    } catch (error) {
        resultsContainer.innerHTML = `<p>Errore: ${error.message}</p>`;
        console.error(error);
    }
}

async function toggleDescription(bookKey, titleElement) {
            // Generiamo un ID pulito per il div della descrizione
            const safeId = "desc-" + bookKey.replace(/\//g, '');
            const descDiv = document.getElementById(safeId);

            // Se è già aperto, lo chiudiamo
            if (descDiv.style.display === 'block') {
                descDiv.style.display = 'none';
                return;
            }

            // Altrimenti, lo mostriamo
            descDiv.style.display = 'block';

            try {
                // SECONDA API: Recupera i dettagli del libro usando la sua KEY
                const response = await fetch(`https://openlibrary.org${bookKey}.json`);
                const details = await response.json();

                // Gestione del testo della descrizione (a volte è un oggetto, a volte una stringa)
                let text = "Descrizione non disponibile per questo libro.";
                if (details.description) {
                    text = typeof details.description === 'string' ? details.description : details.description.value;
                }

                descDiv.innerHTML = `<strong>Descrizione:</strong><br>${text}`;
            } catch (error) {
                descDiv.innerHTML = "Errore nel caricamento della descrizione.";
            }
        }

 // Evento click sul bottone
button.addEventListener("click", handleSearch);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});