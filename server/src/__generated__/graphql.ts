import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
} from 'graphql';
import { users } from '../db_models/init-models';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Cursor: any;
    Date: any;
    JSON: any;
    Upload: any;
};

export type ICreateUserInput = {
    email: Scalars['String'];
    password: Scalars['String'];
    first_name: Scalars['String'];
    last_name: Scalars['String'];
    status: Scalars['Int'];
    role: Scalars['Int'];
    location?: Maybe<Scalars['String']>;
    story?: Maybe<Scalars['String']>;
    avatar_url?: Maybe<Scalars['Upload']>;
    file?: Maybe<Scalars['Upload']>;
};

export type IMutation = {
    __typename?: 'Mutation';
    createUser: IUser;
};

export type IMutationCreateUserArgs = {
    input: ICreateUserInput;
};

export type IQuery = {
    __typename?: 'Query';
    me: IUser;
    login: IUserLoginResponse;
};

export type IQueryLoginArgs = {
    input: IUserLoginInput;
};

export enum IServiceCode {
    /** This is the message automatically send by system. */
    NewTaskCreated = 'newTaskCreated',
    TaskUpdated = 'taskUpdated',
}

export enum ISuccessResponse {
    Success = 'success',
}

export type IUser = {
    __typename?: 'User';
    id: Scalars['Int'];
    email: Scalars['String'];
    first_name: Scalars['String'];
    last_name: Scalars['String'];
    avatar_url?: Maybe<Scalars['String']>;
    status: Scalars['Int'];
    location?: Maybe<Scalars['String']>;
    story?: Maybe<Scalars['String']>;
    file?: Maybe<Scalars['String']>;
    role: Scalars['Int'];
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
};

export type IUserLoginInput = {
    account: Scalars['String'];
    password: Scalars['String'];
};

export type IUserLoginResponse = {
    __typename?: 'UserLoginResponse';
    token: Scalars['String'];
    user: IUser;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
    | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
    | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
    CreateUserInput: ICreateUserInput;
    String: ResolverTypeWrapper<Scalars['String']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    JSON: ResolverTypeWrapper<Scalars['JSON']>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    ServiceCode: IServiceCode;
    SuccessResponse: ISuccessResponse;
    Upload: ResolverTypeWrapper<Scalars['Upload']>;
    User: ResolverTypeWrapper<users>;
    UserLoginInput: IUserLoginInput;
    UserLoginResponse: ResolverTypeWrapper<
        Omit<IUserLoginResponse, 'user'> & { user: IResolversTypes['User'] }
    >;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
    CreateUserInput: ICreateUserInput;
    String: Scalars['String'];
    Int: Scalars['Int'];
    Cursor: Scalars['Cursor'];
    Date: Scalars['Date'];
    JSON: Scalars['JSON'];
    Mutation: {};
    Query: {};
    Upload: Scalars['Upload'];
    User: users;
    UserLoginInput: IUserLoginInput;
    UserLoginResponse: Omit<IUserLoginResponse, 'user'> & {
        user: IResolversParentTypes['User'];
    };
    Boolean: Scalars['Boolean'];
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
    createUser?: Resolver<
        IResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<IMutationCreateUserArgs, 'input'>
    >;
};

export type IQueryResolvers<
    ContextType = any,
    ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']
> = {
    me?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
    login?: Resolver<
        IResolversTypes['UserLoginResponse'],
        ParentType,
        ContextType,
        RequireFields<IQueryLoginArgs, 'input'>
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
    id?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    first_name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    last_name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
    avatar_url?: Resolver<
        Maybe<IResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    status?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    location?: Resolver<
        Maybe<IResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    story?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
    file?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
    role?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
    createdAt?: Resolver<
        Maybe<IResolversTypes['Date']>,
        ParentType,
        ContextType
    >;
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
    Query?: IQueryResolvers<ContextType>;
    Upload?: GraphQLScalarType;
    User?: IUserResolvers<ContextType>;
    UserLoginResponse?: IUserLoginResponseResolvers<ContextType>;
};
