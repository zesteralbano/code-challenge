cp .env.example .env

docker compose up -d

cd backend
npm run ace migration:run
npm run ace db:seed

cd ../

cd frontend
cp .env.example .env
npm install