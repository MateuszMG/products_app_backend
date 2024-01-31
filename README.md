# Before start

1. Create .env file
2. Copy everything from .env.example file to your new created .env file

### Start project

1. Install dependencies ( enter 'npm i' command in your console )
2. Run server ( enter 'npm run start' command in your console )

## Available scripts

- "s": "ts-node-dev src/index.ts -e js,ts,json,ejs",
- "start": "ts-node-dev src/index.ts -e js,ts,json,ejs",
- "format": "prettier --write 'src/\*_/_.{ts,tsx,css,md,json}' --config ./.prettierrc",
- "prepare": "husky install",
- "test": "jest --config --watch --coverage ",
- "release": "release-it"
