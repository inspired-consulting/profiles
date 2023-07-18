# Team Profiles and Badge Generator

## Requirements

1. Make sure you have Docker installed on your system.

2. Clone this repository to your local machine or download the source code.

3. Open your terminal and navigate to the root directory of the app.

## Use the app

### Run the app

Run the following command in your terminal to build and run the Docker container in the background (detached mode) via docker compose:

```bash
docker compose up -d --build
```

Run the following command in your terminal to run the Docker container in the background (detached mode) via docker compose:

```bash
docker compose up -d
```

Open your browser and navigate to <http://localhost:9000>.

### Stop the app

Run the following command in your terminal to stop the Docker container via docker compose:

```bash
docker compose down
```

## Access the database

Run the following command in your terminal to access the database via docker compose:

```bash
docker compose exec -ti db psql -U postgres -d profiles_db
```

## Access the app container

Run the following command in your terminal to access the app container:

```bash
docker exec -it profiles-server /bin/sh
```
