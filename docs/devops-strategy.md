# 1. Architecture technique cible

Ma Bibliothèque est une Single Page Application développée en Angular 18, servie par Nginx dans un conteneur Docker. Il n'y a pas de backend : les données sont stockées directement dans le localStorage du navigateur. C'est un choix volontaire pour ce projet afin de se concentrer sur la partie DevOps plutôt que sur le développement.
Navigateur utilisateur, Conteneur Docker, Nginx, fichier angular buildés


# 2. Structure du repository

Le dépôt est organisé de façon à séparer clairement le code applicatif, la configuration DevOps et la documentation.
bibliotheque:
src/
    app/core/models/      : définition de l'objet Book
        pages/            : pages de l'application (home, book-list)
        services/         : logique métier (BookService)
    docs/devops-strategy.md : stratégie DevOps du projet
    .github/workflows/ci.yml :  pipeline CI GitHub Actions
Dockerfile : build multi-stage Angular + Nginx
docker-compose.yml : lancement de l'application
.env.example : exemple de variables d'environnement
README.md : documentation principale

# 3. Workflow Git

Je travaille avec une branche `main` qui reste toujours stable. Chaque fonctionnalité ou correction est développée sur une branche dédiée, puis intégrée via une Pull Request. Les commits suivent la convention Conventional Commits pour garder un historique lisible.

Les préfixes utilisés sont `feat:` pour une nouvelle fonctionnalité
`fix:` pour une correction
`docs:` pour de la documentation
`test:` pour les tests.
exemple :
main
 feat/docker
 feat/ci-pipeline
 fix/app-component-tests
 docs/devops-strategy

# 4. Services Docker prévus

L'application tourne dans un seul conteneur Docker qui contient Nginx et les fichiers Angular buildés. Le Dockerfile utilise un build multi-stage pour garder une image finale légère.
Stage 1 : Node.js 20 Alpine :
npm ci
npm run build

Stage 2 : Nginx Alpine
copie des fichiers buildés
exposition du port 80

Le docker-compose.yml expose le port 8080 en local et redémarre automatiquement le conteneur en cas de problème.

# 5. Variables d'environnement

Ce projet ne nécessite pas de variables d'environnement sensibles pour l'instant car il n'y a pas de backend ni de clé API externe. Le fichier `.env.example` est présent pour anticiper une future évolution du projet, notamment si on ajoute un backend ou une API de recherche de livres.
Le fichier `.env` est listé dans `.gitignore` pour ne jamais être commité par accident.

# 6. Stratégie de tests

Les tests sont écrits avec Jasmine et Karma, qui sont inclus par défaut dans Angular. On teste la création des composants principaux ainsi que la logique du BookService. Le BookService est mocké dans les tests de composants pour isoler chaque unité de code et ne pas dépendre du localStorage pendant les tests.


# 7. Pipeline CI prévu

Le pipeline se déclenche automatiquement à chaque push sur n'importe quelle branche et à chaque Pull Request vers `main`. Il garantit que le code compile, que les tests passent et que l'image Docker se construit correctement avant tout merge.
Push ou Pull Request

# 8. Sécurité et secrets

Aucun secret, mot de passe ou clé API n'est présent dans le dépôt Git. Le fichier `.env` est dans le `.gitignore` et un `.env.example` montre la structure attendue sans les vraies valeurs. Dependabot est activé sur le dépôt pour détecter automatiquement les vulnérabilités dans les dépendances npm et proposer des mises à jour.

# 9. Logs prévus

En développement local, les logs Angular sont visibles dans la console du navigateur. En production avec Docker, les logs Nginx sont accessibles via la commande `docker compose logs`. Les erreurs rencontrées par l'utilisateur dans l'interface sont affichées directement dans l'application.

# 10. Risques DevOps

## 10. Risques DevOps

Le plus gros risque sur ce projet c'est d'exposer accidentellement un secret dans Git. Même si pour l'instant il n'y a pas de clé API, c'est une habitude à prendre dès le début. C'est pour ça que le `.env` est dans le `.gitignore`.

Le localStorage présente aussi un risque : si l'utilisateur vide son navigateur ou change d'appareil, il perd tous ses livres. C'est une limitation connue et acceptée pour ce projet, qui sera résolue si on ajoute un backend plus tard.

Enfin, si le pipeline CI casse suite à un mauvais merge, l'application peut se retrouver dans un état instable. Pour limiter ce risque, les tests sont obligatoires dans le pipeline et aucun merge ne peut passer si le CI est rouge.

## 11. Commandes de lancement

En développement local, on installe les dépendances puis on lance le serveur Angular qui écoute sur le port 4200.
npm install
ng serve

Pour lancer les tests et voir la couverture de code :
ng test --watch=false
ng test --watch=false --code-coverage

Pour lancer l'application avec Docker:
docker compose up --build

L'application est alors accessible sur http://localhost:8080. Pour arrêter et voir les logs :
docker compose down
docker compose logs

## 12. Prochaines actions

La prochaine étape prioritaire est d'ajouter un backend Node.js/Express avec une base de données PostgreSQL pour remplacer le localStorage et permettre de retrouver ses livres depuis n'importe quel appareil.
De nouvelles fonctionnalités seront ajoutées à l'application : une barre de recherche, des filtres par genre ou par statut de lecture, et la possibilité d'exporter sa bibliothèque en PDF 