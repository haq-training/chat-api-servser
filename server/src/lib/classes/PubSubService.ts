/* eslint-disable no-shadow */
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';
import { usersId } from '../../db_models/users';

export enum IUserEvent {
    NewMessage = 'NewMessage',
    OnlineTracker = 'OnlineTracker',
    Chat = 'Chat',
}

export type ChatMessageSending = {
    roomId: number;
    postedUserId: usersId;
    postedAt: Date;
    content: any;
};

export type UserOnline = {
    id: usersId;
    body: string;
};

export interface IPubSubConfig {
    host: string;
    port: number;
}

export default class PubSubService {
    private pubsub!: RedisPubSub;

    publisher!: Redis;

    subscriber!: Redis;

    constructor(publisher: Redis, subscriber: Redis) {
        this.publisher = publisher;
        this.subscriber = subscriber;
        this.pubsub = new RedisPubSub({
            publisher: this.publisher,
            subscriber: this.subscriber,
        });
    }

    private publish(triggerName: string, message: any) {
        this.pubsub
            .publish(triggerName, message)
            .then(() => console.log(`Published: ${triggerName}`))
            .catch((err) => console.error(err));
    }

    publishToUser(userId: usersId, key: string, message: any) {
        const triggerName = `${key}-${userId}`;
        this.publish(triggerName, message);
    }

    asyncIteratorByUser(userId: usersId, key: IUserEvent) {
        const triggerName = `${key}-${userId}`;
        return this.pubsub.asyncIterator(triggerName);
    }

    sendOnlineMessage(message: UserOnline, userIds: number | number[]) {
        if (Array.isArray(userIds)) {
            userIds.forEach((userId) => {
                this.publishToUser(userId, IUserEvent.OnlineTracker, message);
            });
            return;
        }
        this.publishToUser(userIds, IUserEvent.OnlineTracker, message);
    }

    sendChatMessage(
        chatMessage: ChatMessageSending,
        userIds: number | number[]
    ) {
        if (Array.isArray(userIds)) {
            userIds.forEach((userId) => {
                this.publishToUser(userId, IUserEvent.Chat, chatMessage);
            });
            return;
        }
        this.publishToUser(userIds, IUserEvent.Chat, chatMessage);
    }
}
