# Installing
1. `$ git clone ...` Clone the repo
2. `$ cd <repo-root>` Go to it
3. `$ npm i` Install dependencies using NPM (if you don't have NPM, you will need to install it)

# Running dev
1. `$ mongod --dbpath=./data`
2. `$ npm run dev` Start webpack's dev server

# Running prod
1. `$ npm run build` Builds files, placing them in '/dist'.
2. `$ npm run prod`

# Deploying to staging
1. Install heroku-cli tools if you haven't.
2. Get access to the heroku app (message Don)
3. `$ heroku git:remote -a decentralization-staging` Link the heroku app to your project.
4. `$ git push heroku master` Heroku will automatically build 'prod' files. No need to build or check-in before deploying.
