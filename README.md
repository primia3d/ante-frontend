# Ante Tenancy App

Ante Tenancy App is a service platform will be used for managing multiple independent instances for multiple tenants. This will be the module that would on-board new tenants and manage its information for the Ante System’s back office.

# Setup

## Code Setup

Install [Node.js](https://nodejs.org/en) v18 (Preferably v20)

Install [Yarn](https://classic.yarnpkg.com/en/) 1.22.x via terminal

```bash
npm install --global yarn
```

Clone the project

```bash
git clone https://github.com/AllenElguira16/ante-tenancy-app
```

Install packages

```bash
yarn install
```

And run the local server

```bash
yarn dev
```

## DB Setup

Go to [PostgreSQL Download Page](https://www.postgresql.org/download/)

set `root` as password

### Generate Types from Schema

go to project root

```bash
yarn generate
```

### Migrate locally

```bash
yarn migrate-dev
```

### Migrate production

```bash
yarn migrate
```

# Tech Stack

- [next.js](https://nextjs.org/)
- [node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [express](https://expressjs.com/)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/docs)
- [tailwindcss](https://tailwindcss.com/)
- [react-hook-form](https://react-hook-form.com/)
- [radix-ui](https://www.radix-ui.com/)
- [zod](https://zod.dev/)
- [typescript](https://www.typescriptlang.org/)
- [vite](https://vitejs.dev/)

# Features

Role-Access Management

- Responsible for refining and controlling the permissions and privileges granted to different roles or users within a system.

Back Office User Management

- Manages user accounts, including roles such as Super-Admin and Admin.

Client Management

- This functionality encompasses supervision and administration of clients within the Ante System. It features processes for registering client entities and setting up initial authentication details. Additionally, it serves as the designated location for specifying domain assignments.

# Git Workflow

It is a set of strict instructions for git<br>
Why do we do this? To ensure that everyone follows the rules

## Git Commit

We have a specific rules for commit messages

It should always start with a prefix
Below is a list of prefixes

- fix
  - only use this when the commit is about fixing a certain code that has bugs
- chore
  - only use this if there are no minor/major changes such as config update, locale changes, etc...
- feat
  - only use this if there are minor/major changes that users might see often
- refactor
  - only use this if there are only code changes that improves the code

```bash
# git files
git add .
# set git commit message
git commit -am "chore: add files"
# push to branch
git push
```

## Pulling new changes from source

```bash
# assume we are on current branch
$ git fetch --all
# assume branch name source as develop or master
$ git rebase origin/source
# push to origin
$ git push -u origin/current_branch # or 'git push' only if it is already on upstream
```
