import { storageConfig } from '../../config/appConfig';
import MinIOServices from './MinIOServices';
import { publisher, subscriber } from '../../db_loaders/redis';
import PubSubService from './PubSubService';

export const minIOServices = new MinIOServices({
    bucketName: storageConfig.minIO.devApp,
    domainName: storageConfig.minIO.domain,
    useSSL: storageConfig.minIO.useSSL,
    endPoint: storageConfig.minIO.endPoint,
    port: storageConfig.minIO.port,
    accessKey: storageConfig.minIO.accessKey,
    secretKey: storageConfig.minIO.secretKey,
});

export const pubsub_service = new PubSubService(publisher, subscriber);
