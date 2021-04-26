This is a project that demonstrates a more complex microfrontend approach, using a real authentication flow, and housing several sub-frontend projects that are built using different frameworks.

We're using Auth0 for our authentication layer because I didn't want to build the backend to support it, it's easy and it's free.

The project currently leverages material ui for styling in the react apps.

The current application structure is as follows:

Each "Package" sub-frontend in the packages folder (other than the 'container') can be run on its own and must be able to function in isolation. This allows the developer(s) working on this app/feature to have full control over the way that they approach their project; the team can use any framework, libraries, and even specfic versions of whatever they need. However, considerations need to be made to consider how the container application and sibling applications need to interact.

The "Container" application is the orchestrator of all of the different frontend apps, importing their code, and leveraging it in a way that makes the entire application feel like a single experience.

# Starting the project in dev

## Commands

I didn't feel like figuring out how to npm it today, so here's a script

You can quickly install all necessary node modules in all projects with:

`sh ./scripts/startEverything.sh`

You can quickly start all projects with:

`sh ./scripts/installEverything.sh`

Alternatively you can go into each project in the `packages` directory and run:

`npm i && npm run start`
