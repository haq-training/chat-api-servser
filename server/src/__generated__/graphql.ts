import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
import { users } from '../db_models/init-models';
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

export type IForgotPassword = {
    gmail: Scalars['String']['input'];
};

export type IMutation = {
    __typename?: 'Mutation';
    ChangePassword: ISuccessResponse;
    addFriend: ISuccessResponse;
    delete_user: ISuccessResponse;
    forgot_password: ISuccessResponse;
    register: IUser;
    unFriend: ISuccessResponse;
    upRoleUser: ISuccessResponse;
    updateUser: ISuccessResponse;
};

export type IMutationChangePasswordArgs = {
    input: IChangePasswordInput;
};

export type IMutationAddFriendArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationDelete_UserArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationForgot_PasswordArgs = {
    input: IForgotPassword;
};

export type IMutationRegisterArgs = {
    input: ICreateUserInput;
};

export type IMutationUnFriendArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationUpRoleUserArgs = {
    id: Scalars['ID']['input'];
};

export type IMutationUpdateUserArgs = {
    input: IUpdateUserInput;
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

export type IQuery = {
    __typename?: 'Query';
    login: IUserLoginResponse;
    me: IUser;
    user: IUser;
    users?: Maybe<Array<Maybe<IUser>>>;
};

export type IQueryLoginArgs = {
    input: IUserLoginInput;
};

export type IQueryUserArgs = {
    id: Scalars['ID']['input'];
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

export type IChangePasswordInput = {
    id: Scalars['ID']['input'];
    new_passWord: Scalars['String']['input'];
    old_passWord: Scalars['String']['input'];
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
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    CreateUserInput: ICreateUserInput;
    Cursor: ResolverTypeWrapper<Scalars['Cursor']['output']>;
    Date: ResolverTypeWrapper<Scalars['Date']['output']>;
    ForgotPassword: IForgotPassword;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
    Mutation: ResolverTypeWrapper<{}>;
    PageInfo: ResolverTypeWrapper<IPageInfo>;
    PaginationInput: IPaginationInput;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    SuccessResponse: ISuccessResponse;
    UpdateUserInput: IUpdateUserInput;
    Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
    User: ResolverTypeWrapper<users>;
    UserLoginInput: IUserLoginInput;
    UserLoginResponse: ResolverTypeWrapper<
        Omit<IUserLoginResponse, 'user'> & { user: IResolversTypes['User'] }
    >;
    changePasswordInput: IChangePasswordInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
    Boolean: Scalars['Boolean']['output'];
    CreateUserInput: ICreateUserInput;
    Cursor: Scalars['Cursor']['output'];
    Date: Scalars['Date']['output'];
    ForgotPassword: IForgotPassword;
    ID: Scalars['ID']['output'];
    Int: Scalars['Int']['output'];
    JSON: Scalars['JSON']['output'];
    Mutation: {};
    PageInfo: IPageInfo;
    PaginationInput: IPaginationInput;
    Query: {};
    String: Scalars['String']['output'];
    UpdateUserInput: IUpdateUserInput;
    Upload: Scalars['Upload']['output'];
    User: users;
    UserLoginInput: IUserLoginInput;
    UserLoginResponse: Omit<IUserLoginResponse, 'user'> & {
        user: IResolversParentTypes['User'];
    };
    changePasswordInput: IChangePasswordInput;
};

export interface ICursorScalarConfig
    extends GraphQLScalarTypeConfig<IResolversTypes['Cursor'], any> {
    name: 'Cursor';
}

export interface IDateScalarConfig
    extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
    name: 'Date';
}

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
    addFriend?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationAddFriendArgs, 'id'>
    >;
    delete_user?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationDelete_UserArgs, 'id'>
    >;
    forgot_password?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationForgot_PasswordArgs, 'input'>
    >;
    register?: Resolver<
        IResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<IMutationRegisterArgs, 'input'>
    >;
    unFriend?: Resolver<
        IResolversTypes['SuccessResponse'],
        ParentType,
        ContextType,
        RequireFields<IMutationUnFriendArgs, 'id'>
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

export type IResolvers<ContextType = any> = {
    Cursor?: GraphQLScalarType;
    Date?: GraphQLScalarType;
    JSON?: GraphQLScalarType;
    Mutation?: IMutationResolvers<ContextType>;
    PageInfo?: IPageInfoResolvers<ContextType>;
    Query?: IQueryResolvers<ContextType>;
    Upload?: GraphQLScalarType;
    User?: IUserResolvers<ContextType>;
    UserLoginResponse?: IUserLoginResponseResolvers<ContextType>;
};
