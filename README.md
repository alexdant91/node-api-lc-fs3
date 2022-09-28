# API SYSTEM

## TODO

- [X] Sistema di registrazione utente
- [X] Sistema di login utente via token
- [ ] Sistema di autorizzazione per le chiamate (middleware)
- [ ] Sistema di update per i dati utente (/api/me)
- [ ] Sistema di delete dell'account (/api/me)
- [ ] Sistema per ottenere le informazioni dell'utente loggato (/api/me)
- [ ] Sistema per poter visualizzare l'elenco degli utenti con paginazione e filtri e possibilità di escludere utente da elenco (/api/users)

## Packages

- Express -> Per avviare e gestire il server in node
- Mongoose -> Per interagire con il db
- Helmet e Cors -> Per sicurezza sulle chiamate
- Dotenv -> Per caricare le impostazioni dal file .env
- Jsonwebtoken -> Per le autorizzazioni utente
- Joi -> Per la validazione dei dati in ingresso alle routes
- Bcryptjs -> Per la criptazione delle password
