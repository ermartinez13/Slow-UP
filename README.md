# Welcome to Slow Up!

a minimalist, keyboard-first, cross-platform application that couples simple time tracking with a good old-fashioned timer, stopwatch, and Pomodoro timer for the purpose of helping minimize burnout. A person (me) once called it, “you’re friendly timer app, on mild steroids”.

To read more about its vision, upcoming features, and more, check out its Notion page at [Slow Up](https://handsome-femur-998.notion.site/Slow-Up-d2425bb47fc1408e90e4ab928590f0bb?pvs=4).

# Development

1. Run `docker compose watch` to start the services
2. Run `docker compose logs -f` to view logs from services
3. App will be available at `localhost`

# Deployment

To test local deployment to staging:

1. Make sure required env vars are present in `.env` file in repo root
2. Run `dagger run node --env-file=.env ./deploy.js`

# Demo

Prod: https://up.ermartinez.com/
Staging: https://staging-up.ermartinez.com/
