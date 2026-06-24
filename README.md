# Bibliothèque

[![CI](https://github.com/Naoile/bibliotheque/actions/workflows/ci.yml/badge.svg)](https://github.com/Naoile/bibliotheque/actions/workflows/ci.yml)

Application web personnelle pour suivre mes lectures
Elle permet d'ajouter un livre, noter s'il a été lu, lui attribuer une note et écrire une fiche de lecture. Les données sont sauvegardées localement dans le navigateur.


# Technologies utilisées

- Angular 18 : framework frontend
- Tailwind CSS : style de l'interface
- localStorage : sauvegarde des données dans le navigateur
- Docker + Nginx: conteneurisation de l'application
- GitHub Actions : pipeline CI/CD automatisé

# Comment lancer le projet

1) Sans Docker (développement) : 
npm install
ng serve
Puis ouvre http://localhost:4200 dans ton navigateur.

2) Avec Docker
docker compose up --build
Puis ouvre http://localhost:8080 dans ton navigateur.

# Lancer les tests
ng test --watch=false
