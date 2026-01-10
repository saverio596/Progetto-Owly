# 📚 Libreria Interattiva

Libreria Interattiva è una web application che consente di cercare libri per categoria utilizzando le API pubbliche di **Open Library**.  
L’utente può visualizzare titoli, autori, copertine e leggere la descrizione dettagliata dei libri selezionati.

Il progetto è stato sviluppato come esercizio pratico di **JavaScript avanzato**, con particolare attenzione alla gestione del build process, delle variabili d’ambiente e al deploy in produzione.

---

## 🚀 Funzionalità

- Ricerca di libri per categoria (es. fantasy, science, history)
- Visualizzazione elenco risultati
- Visualizzazione copertina del libro
- Visualizzazione descrizione al click sul titolo
- Interfaccia responsive
- Gestione variabili d’ambiente
- Build automatizzata con Webpack
- Deploy su Netlify

---

## 🛠️ Tecnologie utilizzate

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Webpack  
- dotenv-webpack  
- Open Library API  
- Netlify  

> Nota: il progetto **non utilizza Axios né Lodash**.  
> Le chiamate HTTP sono effettuate tramite `fetch` nativo.

---

## 📁 Struttura del progetto

├─ index.html
├─ package.json
├─ webpack.config.js
├─ .gitignore
├─ .env
│
├─ src/
│ ├─ js/
│ │ └─ index.js
│ ├─ css/
│ │ └─ style.css
│ └─ img/
│ ├─ logo-libreria-interattiva.png
│ └─ favicon.svg


---

## 🔐 Variabili d’ambiente

Le variabili d’ambiente sono definite nel file `.env` (non versionato):

API_BASE=https://openlibrary.org
COVERS_BASE=https://covers.openlibrary.org

---

## 🔐 Obiettivo del progetto

- Comprendere il funzionamento di Webpack
- Gestire asset statici (CSS, immagini)
- Utilizzare API esterne
- Gestire variabili d’ambiente
- Preparare un progetto pronto per il deploy in produzione

---

## 🌐 Demo online
Puoi vedere il sito qui:
👉 **https://libreria-interattiva.netlify.app/**

---

## 🌐 Autore

Saverio Benedetto
Progetto realizzato per il percorso JavaScript Avanzato – start2impact

