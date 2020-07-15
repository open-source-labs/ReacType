<p align="center">
  <img width="300" src="reactypeserverlogo.png">
  <h1 align="center">ReacType Server</h1>
</p>

**ReacType Server** is the backend complement to the visual React prototyping tool **ReacType**. It is built in **Node.js** with the **Express** framework linked to **MongoDB** to handle user authentication (personal accounts on our own database as well as through Github Oauth), sessions, and user project management. The server itself is officially deployed through Heroku, but you can host your own local environment to communicate with the database with this repo.

**For future development teams**: If you wish to update the server and re-deploy through heroku, you will need to get the credentials from one of the last team members:

- [Tyler Sullberg](https://www.linkedin.com/in/tyler-sullberg) [@tsully](https://github.com/tsully)
- [Andrew Cho](https://www.linkedin.com/in/andrewjcho84/) [@andrewjcho84](https://github.com/andrewjcho84)
- [Aaron Bumanglag](https://www.linkedin.com/in/akbuma) [@akbuma](https://github.com/akbuma)
- [Fredo Chen](https://www.linkedin.com/in/fredochen/) [@fredosauce](https://github.com/fredosauce)

Redeployment should also be done with only the server subtree and not the entire repo. See this <a href="https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f">article</a> about deploying just a subdirectory.

If `npm` is your package manager, you just need to run the script `npm run dev` and it will start the server on `http://localhost:5000` for your development environment.

Endpoint testing is currently integrated with Jest and Supertest as well and can be run by `npm run test` or `npm run test:watch` for watch mode.
