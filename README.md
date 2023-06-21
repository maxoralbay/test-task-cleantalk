# Mini app
### Requirments
- Docker
- Docker-compose

### How to run
- Clone this repo and cd to miniapp folder. 
- Copy in backend folder `.env.example` to `.env` and change the value of `GOOGLE_API_KEY` to your own key.
- Run `docker-compose up -d` to start the app.
- Run `docker-compose down` to stop the app.
- Run `docker-compose logs -f` to see the logs.
- Run `docker-compose exec miniapp-some_app bash` to enter the container.

### How to use
- Open your browser and go to `http://localhost:8001/` to see the frontend.
- Check the availability backend api at `http://localhost:8000/api/map/info`.

### Run dev mode for frontend
```shell
docker-compose exec miniapp-front_app npm run dev
```
and open your browser at `http://localhost:3000`.

### List of endpoints
- `GET /api/map/info` - Check availability backend.
- `POST /api/map/triangulate` - Calculate the triangulate.
- `POST /api/map/distance` - Calculate the distance between two points.