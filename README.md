# Portfolio

Personal portfolio monorepo. The Angular app in `Frontend/` is the website. The Laravel app in `Backend/` is the API. The two applications run independently and share this Git repository only.

The portfolio design, authentication, and project data are not part of this setup.

## Repository structure

```text
portfolio/
├── Frontend/          Angular application
├── Backend/           Laravel API, including DDEV config
├── .gitignore
└── README.md
```

## Development requirements

- Node.js `^22.22.3`, `^24.15.0`, or `^26.0.0`, with npm
- Docker Desktop
- DDEV 1.25 or newer

Laravel runs inside DDEV on PHP 8.4 with MariaDB. You do not need PHP or Composer installed on the host.

## Start the frontend

```bash
cd Frontend
npm install
npm start
```

The dev server is at http://localhost:4200. It does not need the backend to be running.

The backend base URL used in development is `apiUrl` in `Frontend/src/environments/environment.development.ts`. It is set to `https://portfolio.ddev.site`. Production builds use `apiUrl` in `Frontend/src/environments/environment.ts`.

## Start the backend

```bash
cd Backend
ddev start
```

DDEV serves Laravel at https://portfolio.ddev.site and writes the local database settings into `Backend/.env`. Do not commit that file.

## Run migrations

From `Backend/`:

```bash
ddev artisan migrate
```

## Stop DDEV

From `Backend/`:

```bash
ddev stop
```
