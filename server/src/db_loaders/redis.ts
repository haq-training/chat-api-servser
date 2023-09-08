import Redis from 'ioredis';
import { redis as config } from '../config/appConfig';

export const publisher = new Redis(config);

export const subscriber = new Redis(config);
