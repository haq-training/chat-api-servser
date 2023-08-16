import mongoose, { Document, ObjectId, Schema } from 'mongoose';

// eslint-disable-next-line no-shadow
export enum MessageContentType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
}

export interface IChatMessageModel extends Document<ObjectId> {
    room_id: number;
    posted_user_id: number;
    content: string;
    messageContentType?: MessageContentType;
    posted_at: Date;
    read_count: number;
}

const chatMessageSchema = new Schema({
    room_id: { type: Number, required: true },
    posted_user_id: { type: Number, required: true },
    content: { type: String, required: true },
    messageContentType: { type: String, required: false },
    posted_at: { type: Date, required: true },
});

export default mongoose.model<IChatMessageModel>(
    'ChatMessage',
    chatMessageSchema
);
