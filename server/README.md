<p align="center">
  <img width="300" src="reactypeserverlogo.png">
  <h1 align="center">ReacType Server</h1>
</p>

**ReacType Server** is the backend complement to the visual React prototyping tool **ReacType**. It is built in **Node.js** with the **Express** framework linked to **MongoDB** to handle user authentication (personal accounts on our own database as well as through Github Oauth), sessions, and user project management. The server itself is officially deployed through Heroku, but you can host your own local environment to communicate with the database with this repo.

**For future development teams**: If you wish to update the server and re-deploy through heroku, you will need to get the credentials from one of the last team members:

- [Alex Yu](https://www.linkedin.com/in/alexjihunyu/) [@buddhajjigae](https://github.com/buddhajjigae)
- [Daryl Foster](https://www.linkedin.com/in/darylfosterma/) [@MadinventorZero](https://github.com/MadinventorZero)
- [Jonathan Calvo Ramirez](https://www.linkedin.com/in/jonathan-calvo/) [@jonocr](https://github.com/jonocr)
- [Kevin Park](https://www.linkedin.com/in/xkevinpark/) [@xkevinpark](https://github.com/xkevinpark)
- [William Yoon](https://www.linkedin.com/in/williamdyoon/) [@williamdyoon](https://github.com/williamdyoon)

Redeployment should also be done with only the server subtree and not the entire repo. See this <a href="https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f">article</a> about deploying just a subdirectory.

If `npm` is your package manager, you just need to run the script `npm run dev` and it will start the server on `http://localhost:${DEV_PORT}` for your development environment.
DEV_PORT can be defined in the config.js file on the root directory.
You will also need to define your server address(MONGO_DB_DEV), github OAuth ID (GITHUB_CLIENT) & Secret (GITHUB_SECRET) in a dotenv file in the root directory as well.

Endpoint testing is currently integrated with Jest and Supertest as well and can be run by `npm run test` or `npm run test:watch` for watch mode.
