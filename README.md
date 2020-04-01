# MemeLord
A discord bot that will mock and insult your friends!

## Installation
MemeLord uses Node.js 12, npm, Typescript, docker and docker-compose

### Node
You can install Node.js directly from the website [here](https://nodejs.org/en/), though I recommend using
NVM [here](https://github.com/nvm-sh/nvm).

### Docker/Docker-Compose
Follow the instructions [here](https://docs.docker.com/compose/install/) to install Docker/Docker Compose.

### Dependencies
All node dependencies can be installed by running `npm install`.

## Running MemeLord Locally
### Pre-Start Steps
You'll need to get a token for this bot from the Discord Developer Portal before starting up. Once you have
the token, export it to `CLIENT_TOKEN`
```sh
export CLIENT_TOKEN=bysecrettoken
```

### Start
Once NPM is installed (this comes with node), just enter `npm run start` or `npm run start:watch` to start a local instance.

### Running in Docker
There is a docker-compose file supplied with this repository, to deploy locally run:
```sh
# Build the local image
docker-compose build
# Deploy it, yee haw!
docker-compose up
```

## Generating New Commands/Random Events
Scripts are provided to generate skeletons for new commands or random events run the following the create either:
```sh
node scripts/genEvent.js myNewEvent
node scripts/genCommand.js myCommand
```

These will generate new `.ts` files and place them in either `src/commands` or `src/randomEvents`, depending on what you ran.
