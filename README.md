This is a project that demonstrates a more complex microfrontend approach, using a real authentication flow, and housing several sub-frontend projects that are built using different frameworks.

We're using Auth0 for our authentication layer because I didn't want to build the backend to support it, it's easy and it's free.

# Starting the project in dev

## Commands

I didn't feel like figuring out how to npm it today, so here's a script

You can quickly install all necessary node modules in all projects with:

`sh ./scripts/startEverything.sh`

You can quickly start all projects with:

`sh ./scripts/installEverything.sh`

Alternatively you can go into each project in the `packages` directory and run:

`npm i && npm run start`
