import Redis from 'ioredis'
import dotenv from 'dotenv';

dotenv.config();
const redisClient = new Redis('redis://red-ctcg7j2j1k6c73ffn6sg:6379');

redisClient.on('connect', () => {
  console.log('Conectado a Redis');
});

redisClient.on('error', (err) => {
  console.error('Error en Redis:', err);
});

export default redisClient