# HairHub - Sistema di Prenotazione Servizi Salone

HairHub è un'applicazione web che consente agli utenti di prenotare servizi nei saloni che aderiscono al sistema. Gli utenti possono creare un account, visualizzare gli appuntamenti passati e futuri, lasciare recensioni sui servizi ricevuti e gestire i propri appuntamenti. Il progetto è composto da una parte di **back-end** (Java Spring Boot, PostgreSQL, JWT) e una parte di **front-end** (Angular).

## Funzionalità principali implementate da me

### Back-end
- **Login e registrazione utenti**: Implementazione della logica di login e registrazione, basata su **JWT** per l'autenticazione degli utenti. La logica è implementata nel back-end ma supportata e integrata anche nel front-end.
- **Gestione degli appuntamenti**: Ho sviluppato la logica per la creazione e la gestione degli appuntamenti. Gli utenti possono prenotare i servizi offerti dai saloni, vedere i propri appuntamenti futuri e passati. Inoltre, ho implementato la funzionalità per disdire un appuntamento. Questa parte è stata completata solo nel back-end.
- **Creazione delle recensioni**: Gli utenti possono lasciare recensioni per gli appuntamenti passati che non sono stati cancellati. La logica per la creazione delle recensioni è stata implementata sia nel back-end che nel front-end.
- **Gestione appuntamenti passati e futuri**: Ho migliorato la logica per visualizzare gli appuntamenti passati e futuri per ciascun utente. Gli appuntamenti vengono ora filtrati correttamente in base all'utente, e da qui è possibile anche creare le recensioni (come descritto sopra). Questa logica è stata implementata completamente nel back-end.

### Front-end
- **Login e registrazione utenti**: Ho implementato la parte di login e registrazione anche nel front-end, che si integra con il back-end per garantire un flusso di autenticazione completo.
- **Gestione appuntamenti**: Ho lavorato insieme al team sulla visualizzazione degli appuntamenti, permettendo agli utenti di vedere i dettagli degli appuntamenti futuri e passati. Gli utenti possono inoltre lasciare recensioni attraverso l'interfaccia.
- **Creazione delle recensioni**: Gli utenti possono aggiungere recensioni agli appuntamenti completati non disdetti. 
- **Collaborazione con il team**: Ho contribuito al miglioramento dell'interfaccia utente, correggendo bug, inoltre ho supervisionato lo sviluppo del front-end per garantire che il flusso di lavoro fosse coerente con le esigenze del back-end.


## Tecnologie utilizzate

- **Back-end**: Java, **Spring Boot**, REST API, PostgreSQL, JWT (JSON Web Token)
- **Front-end**: Angular
- **Database**: PostgreSQL
- **Autenticazione**: JWT (JSON Web Token)
