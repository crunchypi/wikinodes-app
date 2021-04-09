# wikinodes-app

This repo contains a React app for the 'wikinodes' project, where the attempt is to make a prototype for visual Wikipedia navigation. There are two additional repositories associated with this one:
- [wikinodes-preprocessing](https://github.com/crunchypi/wikinodes-preprocessing) (populating Neo4j db with Wiki data)
- [wikinodes-server](https://github.com/crunchypi/wikinodes-server) (serving content from db to this app)


# Usage

This app is embedded into the server found at [wikinodes-server](https://github.com/crunchypi/wikinodes-server) -- using the code found here in a stand-alone way isn't intended. Still, it's possible using these steps:
- Follow the setup on [wikinodes-server](https://github.com/crunchypi/wikinodes-server) to start the server.
- The usual `npm install` dance to install dependencies ('node_modules') & `npm start`.
- At this point two servers are running and there will be a CORS issue by default. On Linux with Chrome, this can be solved with `google-chrome --disable-web-security  --user-data-dir=/tmp`
- In the new chrome window, go to localhost:3000

Networking configuration of this app can be found at root/front/app/src/api/api.js (that's where IP+port to the API can be changed). Additionally, that's where all the API call funcs are located.
<br>

For docs found at [the repo wiki](https://github.com/crunchypi/wikinodes-app/wiki)
