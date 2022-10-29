# DevFest Adm

- Node: `v18.12.0`
- npm: `v8.19.2`

## Install dependencies

- Run `npm ci`

## Development Environment

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/DevFestBolivia/devfest-adm/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/DevFestBolivia/devfest-adm/tree/develop)

### Generate keys.ts file

- Run `npm run keys:create`
- A file name `keys.ts` will be generated under `src/environments/`. You need to pass there the `Firebase keys`. For the development project, you can locate them [here](https://console.firebase.google.com/u/0/project/devfest2022dev/settings/general/web:MjhmMmFhMzEtOWQ3MS00YTg5LWE0MTYtMGZkN2IyZTk4ODcy)
- Note that you must not commit the generated file (it's ignored by default in the .gitignore file)

### Run the project in dev mode with JIT compilation

- Run `npm start`
- Project will run by default in port 4200

### Generate dist bundles

- Run `npm run build`

### Deploy project

- Run `npm run firebase:deploy`

### Build and deploy project

- Run `npm run firebase:build-deploy`

## Production Environment

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/DevFestBolivia/devfest-adm/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/DevFestBolivia/devfest-adm/tree/main)

### Generate keys.prod.ts file

- Run `npm run keys:create-prod`
- A file name `keys.prod.ts` will be generated under `src/environments/`. You need to pass there the `Firebase keys`. For the production project, you can locate them [here](https://console.firebase.google.com/u/0/project/devfest-bolivia-2022/settings/general/web:MTU2N2Q0N2YtNTRjNi00OTBhLWI0NTctMjhmMDlhMWU1Yzdm)
- Note that you must not commit the generated file (it's ignored by default in the .gitignore file)

### Generate dist bundles

- Run `npm run build:prod`

### Run the project in prod mode with AOT compilation after build

- Run `npx http-server dist/weekend-coding`
- Project will run by default in port 8080

### Deploy project

- Run `npm run firebase:deploy-prod`

### Build and deploy project

- Run `npm run firebase:build-deploy-prod`
