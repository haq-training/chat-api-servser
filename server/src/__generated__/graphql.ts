import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
import { users, chat_room, chat_members, file } from '../db_models/init-models';
import { IChatMessageModel } from '../mongodb_models/chatMessage';
import { ChatRoomEdge, ChatRoomConnection } from '../db_models/chat_room';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never;
      };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    Cursor: { input: any; output: any };
    Date: { input: any; output: any };
    JSON: { input: any; output: any };
    Upload: { input: any; output: any };
};

export type IAddChatMemberInput = {
    members: Array<IChatMemberInput>;
    roomId: Scalars['Int']['input'];
};

export type IChatMember = {
    __typename?: 'ChatMember';
    is_admin: Scalars['Boolean']['output'];
    user: IUser;
};
export enum IStatus {
    Ready = 'Ready',
    Assignee = 'Assignee',
    InProgress = 'InProgress',
    Waiting = 'Waiting',
    WaitApprove = 'WaitApprove',
    Reject = 'Reject',
    Cancel = 'Cancel',
    Completed = 'Completed',
}
export enum ILevel {
    One = 'One',
    Two = 'Two',
    Three = 'Three',
    Four = 'Four',
}

export type IChatMemberInput = {
    isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
    userId: Scalars['Int']['input'];
};

export type IChatMessage = {
    __typename?: 'ChatMessage';
    content: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    messageContentType?: Maybe<IMessageContentType>;
    posted_at: Scalars['Date']['output'];
    posted_by: IUser;
    /**
     * Return number of read by another user for message send by own.
     * Return null if posted by another user.
     */
    read_count?: Maybe<Scalars['Int']['output']>;
    room_id: Scalars['Int']['output'];
};

export type IChatMessageConnection = {
    __typename?: 'ChatMessageConnection';
    edges?: Maybe<Array<Maybe<IChatMessageEdge>>>;
    pageInfo: IPageInfo;
    totalCount: Scalars['Int']['output'];
};

export type IChatMessageEdge = {
    __typename?: 'ChatMessageEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<IChatMessage>;
};

export type IChatRoom = {
    __typename?: 'ChatRoom';
    id: Scalars['Int']['output'];
    members: Array<IChatMember>;
    messages: IChatMessageConnection;
    name?: Maybe<Scalars['String']['output']>;
    type: IChatRoomType;
    /**
     * Return count number only if ran chat_room_list query.
     * Otherwise return null.
     */
    unread_count?: Maybe<Scalars['Int']['output']>;
};

export type IChatRoomMessagesArgs = {
    input?: InputMaybe<IPaginationInput>;
};

export type IChatRoomConnection = {
    __typename?: 'ChatRoomConnection';
    edges?: Maybe<Array<Maybe<IChatRoomEdge>>>;
    pageInfo: IPageInfo;
    totalCount: Scalars['Int']['output'];
};

export type IChatRoomEdge = {
    __typename?: 'ChatRoomEdge';
    cursor: Scalars['String']['output'];
    node?: Maybe<IChatRoom>;
};

export type IChatRoomListInput = {
    args?: InputMaybe<IPaginationInput>;
    type?: InputMaybe<IChatRoomType>;
    userId: Scalars['Int']['input'];
};

export enum IChatRoomType {
    Group = 'group',
    Private = 'private',
}

export type ICloseChatRoomInput = {
    roomId: Scalars['Int']['input'];
    userId: Scalars['Int']['input'];
};

export type ICreateChatRoomInput = {
    members: Array<IChatMemberInput>;
    name?: InputMaybe<Scalars['String']['input']>;
    type: IChatRoomType;
};

export type ICreateUserInput = {
    avatarUrl?: InputMaybe<Scalars['Upload']['input']>;
    email: Scalars['String']['input'];
    firstName: Scalars['String']['input'];
    lastName: Scalars['String']['input'];
    location?: InputMaybe<Scalars['String']['input']>;
    password: Scalars['String']['input'];
    role: Scalars['Int']['input'];
    story?: InputMaybe<Scalars['String']['input']>;
};

export type IDeleteChatMessageInput = {
    messageId: Scalars['ID']['input'];
    userId: Scalars['Int']['input'];
};

export type IEditChatMessageInput = {
    content: Scalars['String']['input'];
    messageId: Scalars['ID']['input'];
    userId: Scalars['Int']['input'];
};

export type IForgotPassword = {
    gmail: Scalars['String']['input'];
};

export type IFriendRequest = {
    __typename?: 'FriendRequest';
    message?: Maybe<Scalars['String']['output']>;
    senderId: Scalars['Int']['output'];
};

export type ILeaveChatRoomInput = {
    roomId: Scalars['Int']['input'];
    userId: Scalars['Int']['input'];
};

export enum IMessageContentType {
    Image = 'image',
    Text = 'text',
}

export type IMutation = {
    __typename?: 'Mutation';
    ChangePassword: ISuccessResponse;
    acceptFriend: ISuccessResponse;
    addFriend: ISuccessResponse;
    add_chat_member: IChatRoom;
    block_user: ISuccessResponse;
    close_chat_room: ISuccessResponse;
    create_chat_room: IChatRoom;
    /**
     * #### Error Code:
     *
     * - `Unauthenticated`
     * - `ChatMessageNotFound`
     * - `NotPermitted`
     */
    delete_chat_message: ISuccessResponse;
    delete_user: ISuccessResponse;
    edit_chat_message: IChatMessage;
    forgot_password: ISuccessResponse;
    leave_chat_room: ISuccessResponse;
    post_chat_message: IChatMessage;
    register: IUser;
    /**
     * #### Error Code:
     *
     * - `Unauthenticated`
     * - `PlayerNotFound`
     */
    send_direct_message: ISuccessResponse;
    unFriend: ISuccessResponse;
    unblock_user: ISuccessResponse;
    upRoleUser: ISuccessResponse;
    updateUser: ISuccessResponse;
    view_chat_messages: IChatMessageConnection;
};

export type IMutationChangePasswordArgs = {
    input: IChangePasswordInput;
};

export type IMutationAcceptFriendArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationAddFriendArgs = {
    email: Scalars['String']['input'];
};

export type IMutationAdd_Chat_MemberArgs = {
    input: IAddChatMemberInput;
};

export type IMutationBlock_UserArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationClose_Chat_RoomArgs = {
    input: ICloseChatRoomInput;
};

export type IMutationCreate_Chat_RoomArgs = {
    input: ICreateChatRoomInput;
};

export type IMutationDelete_Chat_MessageArgs = {
    input: IDeleteChatMessageInput;
};

export type IMutationDelete_UserArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationEdit_Chat_MessageArgs = {
    input: IEditChatMessageInput;
};

export type IMutationForgot_PasswordArgs = {
    input: IForgotPassword;
};

export type IMutationLeave_Chat_RoomArgs = {
    input: ILeaveChatRoomInput;
};

export type IMutationPost_Chat_MessageArgs = {
    input: IPostChatMessageInput;
};

export type IMutationRegisterArgs = {
    input: ICreateUserInput;
};

export type IMutationSend_Direct_MessageArgs = {
    input: ISendDirectMessageInput;
};

export type IMutationUnFriendArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationUnblock_UserArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationUpRoleUserArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationUpdateUserArgs = {
    input: IUpdateUserInput;
};

export type IMutationView_Chat_MessagesArgs = {
    input: IViewChatMessagesInput;
};

export type IPageInfo = {
    __typename?: 'PageInfo';
    endCursor?: Maybe<Scalars['Cursor']['output']>;
    hasNextPage: Scalars['Boolean']['output'];
};

export type IPaginationInput = {
    after?: InputMaybe<Scalars['Cursor']['input']>;
    before?: InputMaybe<Scalars['Cursor']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type IPostChatMessageInput = {
    content: Scalars['String']['input'];
    messageContentType?: InputMaybe<IMessageContentType>;
    roomId: Scalars['Int']['input'];
    userId: Scalars['Int']['input'];
};

export type IQuery = {
    __typename?: 'Query';
    chat_room: IChatRoom;
    chat_room_list: IChatRoomConnection;
    get_chat_room_from_participant?: Maybe<IChatRoom>;
    listFriend?: Maybe<IList_All_Friend>;
    login: IUserLoginResponse;
    me: IUser;
    user: IUser;
    users?: Maybe<Array<Maybe<IUser>>>;
};

export type IQueryChat_RoomArgs = {
    roomId: Scalars['Int']['input'];
};

export type IQueryChat_Room_ListArgs = {
    input: IChatRoomListInput;
};

export type IQueryGet_Chat_Room_From_ParticipantArgs = {
    isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
    participantIds: Array<Scalars['Int']['input']>;
};

export type IQueryLoginArgs = {
    input: IUserLoginInput;
};

export type IQueryUserArgs = {
    id: Scalars['ID']['input'];
};

export type ISendDirectMessageInput = {
    content: Scalars['String']['input'];
    fromUserId: Scalars['Int']['input'];
    toUserId: Scalars['Int']['input'];
};

export type ISubscription = {
    __typename?: 'Subscription';
    friendRequestReceived?: Maybe<IFriendRequest>;
    onlineTracker: IUserOnline;
};

export type ISubscriptionFriendRequestReceivedArgs = {
    userId: Scalars['Int']['input'];
};

export type ISubscriptionOnlineTrackerArgs = {
    userId: Scalars['Int']['input'];
};

export enum ISuccessResponse {
    Success = 'success',
}

export type IUpdateUserInput = {
    avatar?: InputMaybe<Scalars['Upload']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['Int']['input'];
    lastName?: InputMaybe<Scalars['String']['input']>;
    location?: InputMaybe<Scalars['String']['input']>;
    story?: InputMaybe<Scalars['String']['input']>;
};

export type IUser = {
    __typename?: 'User';
    avatarUrl?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['Date']['output']>;
    email: Scalars['String']['output'];
    firstName: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    lastName: Scalars['String']['output'];
    location?: Maybe<Scalars['String']['output']>;
    role: Scalars['Int']['output'];
    status?: Maybe<Scalars['Boolean']['output']>;
    story?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type IUserLoginInput = {
    account: Scalars['String']['input'];
    password: Scalars['String']['input'];
};

export type IUserLoginResponse = {
    __typename?: 'UserLoginResponse';
    token: Scalars['String']['output'];
    user: IUser;
};

export type IUserOnline = {
    __typename?: 'UserOnline';
    body?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['Int']['output']>;
};

export type IViewChatMessagesInput = {
    args?: InputMaybe<IPaginationInput>;
    roomId: Scalars['Int']['input'];
    userId: Scalars['Int']['input'];
};

export type IChangePasswordInput = {
    id: Scalars['ID']['input'];
    new_passWord: Scalars['String']['input'];
    old_passWord: Scalars['String']['input'];
};

export type IList_Friend = {
    __typename?: 'list_Friend';
    avatarUrl?: Maybe<Scalars['String']['output']>;
    email: Scalars['String']['output'];
    firstName: Scalars['String']['output'];
    id: Scalars['Int']['output'];
    lastName: Scalars['String']['output'];
    location?: Maybe<Scalars['String']['output']>;
    status?: Maybe<Scalars['Boolean']['output']>;
    story?: Maybe<Scalars['String']['output']>;
};

export type IList_All_Friend = {
    __typename?: 'list_all_friend';
    block?: Maybe<Array<Maybe<IList_Friend>>>;
    follower?: Maybe<Array<Maybe<IList_Friend>>>;
    friend?: Maybe<Array<Maybe<IList_Friend>>>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
    AddChatMemberInput: IAddChatMemberInput;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    ChatMember: ResolverTypeWrapper<chat_members>;
    ChatMemberInput: IChatMemberInput;
    ChatMessage: ResolverTypeWrapper<IChatMessageModel>;
    ChatMessageConnection: ResolverTypeWrapper<
        Omit<IChatMessageConnection, 'edges'> & {
            edges?: Maybe<Array<Maybe<IResolversTypes['ChatMessageEdge']>>>;
        }
    >;
    ChatMessageEdge: ResolverTypeWrapper<
        Omit<IChatMessageEdge, 'node'> & {
            node?: Maybe<IResolversTypes['ChatMessage']>;
        }
    >;
    ChatRoom: ResolverTypeWrapper<chat_room>;
    ChatRoomConnection: ResolverTypeWrapper<ChatRoomConnection>;
    ChatRoomEdge: ResolverTypeWrapper<ChatRoomEdge>;
    ChatRoomListInput: IChatRoomListInput;
    ChatRoomType: IChatRoomType;
    CloseChatRoomInput: ICloseChatRoomInput;
    CreateChatRoomInput: ICreateChatRoomInput;
    CreateUserInput: ICreateUserInput;
    Cursor: ResolverTypeWrapper<Scalars['Cursor']['output']>;
    Date: ResolverTypeWrapper<Scalars['Date']['output']>;
    DeleteChatMessageInput: IDeleteChatMessageInput;
    EditChatMessageInput: IEditChatMessageInput;
    ForgotPassword: IForgotPassword;
    FriendRequest: ResolverTypeWrapper<IFriendRequest>;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
    LeaveChatRoomInput: ILeaveChatRoomInput;
    MessageContentType: IMessageContentType;
    Mutation: ResolverTypeWrapper<{}>;
    PageInfo: ResolverTypeWrapper<IPageInfo>;
    PaginationInput: IPaginationInput;
    PostChatMessageInput: IPostChatMessageInput;
    Query: ResolverTypeWrapper<{}>;
    SendDirectMessageInput: ISendDirectMessageInput;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    Subscription: ResolverTypeWrapper<{}>;
    SuccessResponse: ISuccessResponse;
    UpdateUserInput: IUpdateUserInput;
    Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
    User: ResolverTypeWrapper<users>;
    UserLoginInput: IUserLoginInput;
    UserLoginResponse: ResolverTypeWrapper<
        Omit<IUserLoginResponse, 'user'> & { user: IResolversTypes['User'] }
    >;
    UserOnline: ResolverTypeWrapper<IUserOnline>;
    ViewChatMessagesInput: IViewChatMessagesInput;
    changePasswordInput: IChangePasswordInput;
    list_Friend: ResolverTypeWrapper<IList_Friend>;
    list_all_friend: ResolverTypeWrapper<IList_All_Friend>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
    AddChatMemberInput: IAddChatMemberInput;
    Boolean: Scalars['Boolean']['output'];
    ChatMember: chat_members;
    ChatMemberInput: IChatMemberInput;
    ChatMessage: IChatMessageModel;
    ChatMessageConnection: Omit<IChatMessageConnection, 'edges'> & {
        edges?: Maybe<Array<Maybe<IResolversParentTypes['ChatMessageEdge']>>>;
    };
    ChatMessageEdge: Omit<IChatMessageEdge, 'node'> & {
        node?: Maybe<IResolversParentTypes['ChatMessage']>;
    };
    ChatRoom: chat_room;
    ChatRoomConnection: ChatRoomConnection;
    ChatRoomEdge: ChatRoomEdge;
    ChatRoomListInput: IChatRoomListInput;
    CloseChatRoomInput: ICloseChatRoomInput;
    CreateChatRoomInput: ICreateChatRoomInput;
    CreateUserInput: ICreateUserInput;
    Cursor: Scalars['Cursor']['output'];
    Date: Scalars['Date']['output'];
    DeleteChatMessageInput: IDeleteChatMessageInput;
    EditChatMessageInput: IEditChatMessageInput;
    ForgotPassword: IForgotPassword;
    FriendRequest: IFriendRequest;
    ID: Scalars['ID']['output'];
    Int: Scalars['Int']['output'];
    JSON: Scalars['JSON']['output'];
    LeaveChatRoomInput: ILeaveChatRoomInput;
    Mutation: {};
    PageInfo: IPageInfo;
    PaginationInput: IPaginationInput;
    PostChatMessageInput: IPostChatMessageInput;
    Query: {};
    SendDirectMessageInput: ISendDirectMessageInput;
    String: Scalars['String']['output'];
    Subscription: {};
    UpdateUserInput: IUpdateUserInput;
    Upload: Scalars['Upload']['output'];
    User: users;
    UserLoginInput: IUserLoginInput;
    UserLoginResponse: Omit<IUserLoginResponse, 'user'> & {
        user: IResolversParentTypes['User'];
    };
    UserOnline: IUserOnline;
    ViewChatMessagesInput: IViewChatMessagesInput;
    changePasswordInput: IChangePasswordInput;
    list_Friend: IList_Friend;
    list_all_friend: IList_All_Friend;
};

export type IChatMemberResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['ChatMember'] = IResolversParentTypes['ChatMember']
> = {
    is_admin?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
    user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatMessageResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['ChatMessage'] = IResolversParentTypes['ChatMessage']
> = {
    content?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
    messageContentType?: Resolver<
        Maybe<IResolversTypes['MessageContentType']>,
        ParentType,
        ContextType
    >;
    posted_at?: Resolver<IResolversTypes['Date'], ParentType, ContextType>;
    posted_by?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
    read_count?: Resolver<
        Maybe<IResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    room_id?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatMessageConnectionResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['ChatMessageConnection'] = IResolversParentTypes['ChatMessageConnection']
> = {
    edges?: Resolver<
        Maybe<Array<Maybe<IResolversTypes['ChatMessageEdge']>>>,
        ParentType,
        ContextType
    >;
    pageInfo?: Resolver<IResolversTypes['PageInfo'], ParentType, ContextType>;
    totalCount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatMessageEdgeResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['ChatMessageEdge'] = IResolversParentTypes['ChatMessageEdge']
> = {
    cursor?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<
        Maybe<IResolversTypes['ChatMessage']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatRoomResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['ChatRoom'] = IResolversParentTypes['ChatRoom']
> = {
    id?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    members?: Resolver<
        Array<IResolversTypes['ChatMember']>,
        ParentType,
        ContextType
    >;
    messages?: Resolver<
        IResolversTypes['ChatMessageConnection'],
        ParentType,
        ContextType,
        Partial<IChatRoomMessagesArgs>
    >;
    name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
    type?: Resolver<IResolversTypes['ChatRoomType'], ParentType, ContextType>;
    unread_count?: Resolver<
        Maybe<IResolversTypes['Int']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatRoomConnectionResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['ChatRoomConnection'] = IResolversParentTypes['ChatRoomConnection']
> = {
    edges?: Resolver<
        Maybe<Array<Maybe<IResolversTypes['ChatRoomEdge']>>>,
        ParentType,
        ContextType
    >;
    pageInfo?: Resolver<IResolversTypes['PageInfo'], ParentType, ContextType>;
    totalCount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IChatRoomEdgeResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['ChatRoomEdge'] = IResolversParentTypes['ChatRoomEdge']
> = {
    cursor?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    node?: Resolver<
        Maybe<IResolversTypes['ChatRoom']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ICursorScalarConfig
    extends GraphQLScalarTypeConfig<IResolversTypes['Cursor'], any> {
    name: 'Cursor';
}

export interface IDateScalarConfig
    extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
    name: 'Date';
}

export type IFriendRequestResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['FriendRequest'] = IResolversParentTypes['FriendRequest']
> = {
    message?: Resolver<
        Maybe<IResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    senderId?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface IJsonScalarConfig
    extends GraphQLScalarTypeConfig<IResolversTypes['JSON'], any> {
    name: 'JSON';
}

export type IMutationResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']
> = {
    ChangePassword?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationChangePasswordArgs, 'input'>
    >;
    acceptFriend?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationAcceptFriendArgs, 'id'>
    >;
    addFriend?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationAddFriendArgs, 'email'>
    >;
    add_chat_member?: Resolver<
        IResolversTypes['ChatRoom'],
        ParentType,
        ContextType,
        RequireFields<IMutationAdd_Chat_MemberArgs, 'input'>
    >;
    block_user?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationBlock_UserArgs, 'id'>
    >;
    close_chat_room?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationClose_Chat_RoomArgs, 'input'>
    >;
    create_chat_room?: Resolver<
        IResolversTypes['ChatRoom'],
        ParentType,
        ContextType,
        RequireFields<IMutationCreate_Chat_RoomArgs, 'input'>
    >;
    delete_chat_message?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationDelete_Chat_MessageArgs, 'input'>
    >;
    delete_user?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationDelete_UserArgs, 'id'>
    >;
    edit_chat_message?: Resolver<
        IResolversTypes['ChatMessage'],
        ParentType,
        ContextType,
        RequireFields<IMutationEdit_Chat_MessageArgs, 'input'>
    >;
    forgot_password?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationForgot_PasswordArgs, 'input'>
    >;
    leave_chat_room?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationLeave_Chat_RoomArgs, 'input'>
    >;
    post_chat_message?: Resolver<
        IResolversTypes['ChatMessage'],
        ParentType,
        ContextType,
        RequireFields<IMutationPost_Chat_MessageArgs, 'input'>
    >;
    register?: Resolver<
        IResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<IMutationRegisterArgs, 'input'>
    >;
    send_direct_message?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationSend_Direct_MessageArgs, 'input'>
    >;
    unFriend?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationUnFriendArgs, 'id'>
    >;
    unblock_user?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationUnblock_UserArgs, 'id'>
    >;
    upRoleUser?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationUpRoleUserArgs, 'id'>
    >;
    updateUser?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationUpdateUserArgs, 'input'>
    >;
    view_chat_messages?: Resolver<
        IResolversTypes['ChatMessageConnection'],
        ParentType,
        ContextType,
        RequireFields<IMutationView_Chat_MessagesArgs, 'input'>
    >;
};

export type IPageInfoResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['PageInfo'] = IResolversParentTypes['PageInfo']
> = {
    endCursor?: Resolver<
        Maybe<IResolversTypes['Cursor']>,
        ParentType,
        ContextType
    >;
    hasNextPage?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IQueryResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']
> = {
    chat_room?: Resolver<
        IResolversTypes['ChatRoom'],
        ParentType,
        ContextType,
        RequireFields<IQueryChat_RoomArgs, 'roomId'>
    >;
    chat_room_list?: Resolver<
        IResolversTypes['ChatRoomConnection'],
        ParentType,
        ContextType,
        RequireFields<IQueryChat_Room_ListArgs, 'input'>
    >;
    get_chat_room_from_participant?: Resolver<
        Maybe<IResolversTypes['ChatRoom']>,
        ParentType,
        ContextType,
        RequireFields<
            IQueryGet_Chat_Room_From_ParticipantArgs,
            'participantIds'
        >
    >;
    listFriend?: Resolver<
        Maybe<IResolversTypes['list_all_friend']>,
        ParentType,
        ContextType
    >;
    login?: Resolver<
        IResolversTypes['UserLoginResponse'],
        ParentType,
        ContextType,
        RequireFields<IQueryLoginArgs, 'input'>
    >;
    me?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
    user?: Resolver<
        IResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<IQueryUserArgs, 'id'>
    >;
    users?: Resolver<
        Maybe<Array<Maybe<IResolversTypes['User']>>>,
        ParentType,
        ContextType
    >;
};

export type ISubscriptionResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']
> = {
    friendRequestReceived?: SubscriptionResolver<
        Maybe<IResolversTypes['FriendRequest']>,
        'friendRequestReceived',
        ParentType,
        ContextType,
        RequireFields<ISubscriptionFriendRequestReceivedArgs, 'userId'>
    >;
    onlineTracker?: SubscriptionResolver<
        IResolversTypes['UserOnline'],
        'onlineTracker',
        ParentType,
        ContextType,
        RequireFields<ISubscriptionOnlineTrackerArgs, 'userId'>
    >;
};

export interface IUploadScalarConfig
    extends GraphQLScalarTypeConfig<IResolversTypes['Upload'], any> {
    name: 'Upload';
}

export type IUserResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']
> = {
    avatarUrl?: Resolver<
        Maybe<IResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    createdAt?: Resolver<
        Maybe<IResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    firstName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    lastName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    location?: Resolver<
        Maybe<IResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    role?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    status?: Resolver<
        Maybe<IResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    story?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
    updatedAt?: Resolver<
        Maybe<IResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserLoginResponseResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['UserLoginResponse'] = IResolversParentTypes['UserLoginResponse']
> = {
    token?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserOnlineResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['UserOnline'] = IResolversParentTypes['UserOnline']
> = {
    body?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IList_FriendResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['list_Friend'] = IResolversParentTypes['list_Friend']
> = {
    avatarUrl?: Resolver<
        Maybe<IResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    firstName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    lastName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    location?: Resolver<
        Maybe<IResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    status?: Resolver<
        Maybe<IResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    story?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IList_All_FriendResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['list_all_friend'] = IResolversParentTypes['list_all_friend']
> = {
    block?: Resolver<
        Maybe<Array<Maybe<IResolversTypes['list_Friend']>>>,
        ParentType,
        ContextType
    >;
    follower?: Resolver<
        Maybe<Array<Maybe<IResolversTypes['list_Friend']>>>,
        ParentType,
        ContextType
    >;
    friend?: Resolver<
        Maybe<Array<Maybe<IResolversTypes['list_Friend']>>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
    ChatMember?: IChatMemberResolvers<ContextType>;
    ChatMessage?: IChatMessageResolvers<ContextType>;
    ChatMessageConnection?: IChatMessageConnectionResolvers<ContextType>;
    ChatMessageEdge?: IChatMessageEdgeResolvers<ContextType>;
    ChatRoom?: IChatRoomResolvers<ContextType>;
    ChatRoomConnection?: IChatRoomConnectionResolvers<ContextType>;
    ChatRoomEdge?: IChatRoomEdgeResolvers<ContextType>;
    Cursor?: GraphQLScalarType;
    Date?: GraphQLScalarType;
    FriendRequest?: IFriendRequestResolvers<ContextType>;
    JSON?: GraphQLScalarType;
    Mutation?: IMutationResolvers<ContextType>;
    PageInfo?: IPageInfoResolvers<ContextType>;
    Query?: IQueryResolvers<ContextType>;
    Subscription?: ISubscriptionResolvers<ContextType>;
    Upload?: GraphQLScalarType;
    User?: IUserResolvers<ContextType>;
    UserLoginResponse?: IUserLoginResponseResolvers<ContextType>;
    UserOnline?: IUserOnlineResolvers<ContextType>;
    list_Friend?: IList_FriendResolvers<ContextType>;
    list_all_friend?: IList_All_FriendResolvers<ContextType>;
};
