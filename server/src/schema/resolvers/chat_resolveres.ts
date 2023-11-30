/* eslint-disable no-underscore-dangle */
import {
    // col,
    FindAndCountOptions,
    // fn,
    // Model,
    // Op,
    // Transaction,
    WhereOptions,
} from 'sequelize';
import { db } from '../../db_loaders/mysql';
import {
    // AddChatMemberNotAllowCreateError,
    AuthenticationError,
    // ChatMemberNotFoundError,
    // ChatMessageNotFoundError,
    // ChatRoomClosedError,
    // ChatRoomNotAllowCreateError,
    // ChatRoomNotFoundError,
    // InvalidUserRequestError,
    // MySQLError,
    // RecordNotFoundError,
    UserNotFoundError,
} from '../../lib/classes/graphqlErrors';
import {
    // IChatRoomType,
    IMessageContentType,
    IResolvers,
    // ISuccessResponse,
} from '../../__generated__/graphql';
import {
    ChatMemberStatus,
    resolveChatRoomTypeToValue,
    // resolveToChatRoomType,
} from '../types/enum_types';
import  {
    MessageContentType,
} from '../../mongodb_models/chatMessage';
import {
    convertRDBRowsToConnection,
    // getConnectionFromQuery,
    getRDBPaginationParams,
    mongoEdgeResolver,
    rdbConnectionResolver,
    rdbEdgeResolver
 } from '../../lib/ultis/relay';

const chat_resolver: IResolvers = {
    ChatMessageEdge: mongoEdgeResolver,

    ChatMessage: {
        id: (parent) => {
            if (parent._id) {
                return parent._id.toString();
            }
            throw new Error();
        },
        room_id: (parent) => parent.room_id,
        posted_at: (parent) => parent.posted_at,
        content: (parent) => parent.content,
        messageContentType: (parent) =>
            parent.messageContentType === MessageContentType.IMAGE
                ? IMessageContentType.Image
                : IMessageContentType.Text,
        posted_by: async (parent) =>
            await db.users.findByPk(parent.posted_user_id, {
                rejectOnEmpty: new UserNotFoundError(
                    `Không tìm thấy user (ID: ${parent.posted_user_id})`
                ),
            }),
    },

    ChatMember: {
        user: async (parent) =>
            await db.users.findByPk(parent.userId, {
                rejectOnEmpty: new Error(),
            }),
    },

    ChatRoomEdge: rdbEdgeResolver,

    ChatRoomConnection: rdbConnectionResolver,

    // ChatRoom: {
    //     type: (parent) => resolveToChatRoomType(parent.type),
    //     members: async (parent) => {
    //         if (parent.chat_members) {
    //             return parent.chat_members;
    //         }
    //
    //         return await parent.getChat_members({
    //             where: {
    //                 status: ChatMemberStatus.enable,
    //             },
    //         });
    //     },
    //     messages: (parent, { input }) => {
    //         const query = ChatMessage.find({
    //             room_id: parent.id,
    //         });
    //
    //         return getConnectionFromQuery(query, input);
    //     },
    //     unread_count: (parent) =>
    //         parent.unread_count === undefined ? null : parent.unread_count,
    // },

    Query: {
        chat_room_list: async (parent, { input }, context) => {
            if (!context.isAuth) throw new AuthenticationError(context.error);

            const { userId, type, args } = input;

            const { limit, offset, limitForLast } = getRDBPaginationParams(
                args
            );

            const roomIds = await db.chat_members
                .findAll({
                    where: {
                        userId,
                        status: ChatMemberStatus.enable,
                    },
                    attributes: ['chatRoomId', 'lastViewMsg'],
                })
                .then((members) =>
                    members.map((member) => member.chatRoomId)
                );

            const opt: FindAndCountOptions = {
                offset,
                limit,
                include: [
                    {
                        model: db.chat_members ,
                        as: 'chat_members',
                        include: [
                            {
                                model: db.users ,
                                as: 'user',
                            },
                        ],
                    },
                ],
                distinct: true,
            };

            const whereOpt: WhereOptions = {
                id: roomIds,
                isOpen: true,
            };

            if (type) {
                whereOpt.type = resolveChatRoomTypeToValue(type);
            }

            opt.where = whereOpt;
            opt.order = [
                ['updatedAt', 'DESC'],
                ['id', 'DESC'],
            ];

            const result = await db.chat_room.findAndCountAll(opt);
            console.log('!!!! 1');
            const unreadCountPromises = result.rows.map((room) => {
                const myself = room.chat_members.find(
                    (member) => member.userId === userId
                );
                return room.setUnreadCount(
                    myself ? myself.lastViewMsg : undefined
                );
            });
            console.log('!!!! 2');
            await Promise.all(unreadCountPromises);
            console.log('????? 3');
            return convertRDBRowsToConnection(result, offset, limitForLast);
        },

        chat_room: async (parent, { roomId }, context) => {
            if (!context.isAuth) throw new AuthenticationError(context.error);
            return await db.chat_room.findByPk(roomId, {
                rejectOnEmpty: new Error(
                    'Không tìm thấy thông tin phòng chat'
                ),
                include: [
                    {
                        model: db.chat_members ,
                        as: 'chat_members',
                        include: [
                            {
                                model: db.users,
                                as: 'user',
                            },
                        ],
                    },
                ],
            });
        },
    },

};
export default chat_resolver;
