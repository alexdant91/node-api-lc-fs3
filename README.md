# API SYSTEM

## TODO

- [ ] Sistema di registrazione utente
- [ ] Sistema di autorizzazione per le chiamate
- [ ] Sistema di update per i dati utente
- [ ] Sistema di delete dell'account
- [ ] Sistema per ottenere le informazioni dell'utente loggato
- [ ] Sistema per poter visualizzare l'elenco degli utenti con paginazione e filtri e possibilità di escludere utente da elenco

## Packages

- Express -> Per avviare e gestire il server in node
- Mongoose -> Per interagire con il db
- Helmet e Cors -> Per sicurezza sulle chiamate
- Dotenv -> Per caricare le impostazioni dal file .env
- Jsonwebtoken -> Per le autorizzazioni utente
- Joi -> Per la validazione dei dati in ingresso alle routes
- Bcryptjs -> Per la criptazione delle password
