# Guide de déploiement

## Sommaire

1. [Désactiver la surveillance des fichiers](#désactiver-la-surveillance-des-fichiers)
2. [Désactiver Apollo Server](#désactiver-apollo-server)
3. [Ne pas exposer le serveur d’API à l'hôte](#ne-pas-exposer-le-serveur-dapi-à-lhôte)
4. [Faire fonctionner l'application en arrière-plan (mode détaché)](#faire-fonctionner-lapplication-en-arrière-plan-mode-détaché)
5. [Exposer l'application sur un port configurable](#exposer-lapplication-sur-un-port-configurable)
6. [Remplacer le reverse proxy Next.js par nginx (facultatif)](#remplacer-le-reverse-proxy-nextjs-par-nginx-facultatif)
7. [Cloner / Démarrer l’appli sur le server en local](#cloner--démarrer-lappli-sur-le-server-en-local)
8. [Mettre en place un reverse proxy avec SSL (Caddy)](#mettre-en-place-un-reverse-proxy-avec-ssl-caddy)

## Désactiver la surveillance des fichiers

1. Ajouter un fichier docker-compose.prod.yml qui est une copie du fichier docker-compose.yml (enlever les tests s'il y a).
2. Dans le makefile, ajouter la commande pour lancer le docker-compose.prod.yml

```docker
docker compose -f docker-compose.prod.yml up --build --detach
```

3. Changer la target dans le docker-compose.prod par prod.

## Désactiver Apollo Server

1. Mettre dans le docker-compose.prod au niveau des variables d'environnement.

```dotenv
NODE_ENV=production
```

## Ne pas exposer le serveur d’API à l'hôte

1. Changer dans le docker-compose les ports par expose par exemple :

```docker
    expose:
      - 4000
```

## Faire fonctionner l'application en arrière-plan (mode détaché)

1. Dans le Makefile (après build ajouter —detach).

## Exposer l'application sur un port configurable

1. Créer un fichier .env (à mettre dans le gitignore).

```dotenv
PORT=8000
```

2. Dans le docker-compose prod changer de manière dynamique le port du front avec une variable environnement

```docker
   ports:
      - ${GATEWAY_PORT}:3000
```

## Remplacer le reverse proxy Next.js par nginx (facultatif)

1. Dans le docker-compose.prod mettre image de Nginx

```docker
gateway:
    image: nginx
    depends_on:
      - back-end
      - web-app
    ports:
      - ${GATEWAY_PORT}:80
    volumes:
      - ./gateway/nginx.conf:/etc/nginx/nginx.conf
```

2. Créer le fichier de ngnix.conf dans un dossier gateway

```nginx
events {}

http {
  server {
    listen 80;

    location /api {
      proxy_pass http://back-end:4000/api;
    }

    location /file-hosting {
      proxy_pass http://file-hosting:5001/;
    }

    location / {
      proxy_pass http://web-app:3000;
    }
  }
}
```

## Cloner / Démarrer l’appli sur le server en local

Cloner le projet dans un dossier nom du projet / production

## Mettre en place un reverse proxy avec SSL (caddy)

1. Installer Caddy
2. Vérifier si Caddy est bien installer

```bash
systemctl status caddy
```

3. Modifier le CaddyFile pour qu'il redirige les requêtes HTTP vers l'application

4. Mettre en place la préproduction dans le CaddyFile
