/* eslint-disable no-shadow */
import { GraphQLError } from 'graphql';

export enum Chat_ERROR_CODE {
    Unauthenticated = 'Unauthenticated',
    UserNotFound = 'UserNotFound',
    UserAlreadyExist = 'UserAlreadyExist',
    InValidRole = 'InValidRole',
    MySQL = 'MySQL',
    TaskNotAllowUpdate ='TaskNotAllowUpdate',
    InvalidPaginationArgument = 'InvalidPaginationArgument',
}

export class AuthenticationError extends GraphQLError {
    constructor(message: string | null) {
        super(message || 'Lỗi xác thực quyền truy cập của người dùng', {
            extensions: {
                code: Chat_ERROR_CODE.Unauthenticated,
            },
        });
    }
}

export class UserNotFoundError extends GraphQLError {
    constructor(message: string | null = null) {
        super(message || 'Người dùng không tồn tại', {
            extensions: {
                code: Chat_ERROR_CODE.UserNotFound,
            },
        });
    }
}
export class TaskNotAllowUpdateError extends GraphQLError {
    constructor(message: string | null = null) {
        super(
            message || 'TaskNotAllowUpdateError',{
                extensions: {
                    code: Chat_ERROR_CODE.TaskNotAllowUpdate,
                },
            }
        );
    }
}
export class UserAlreadyExistError extends GraphQLError {
    constructor(message: string | null = null) {
        super(
            message ||
                'Người dùng có email, tài khoản đã tồn tại. Hãy đăng nhập hoặc chọn email, tài khoản khác',
            {
                extensions: {
                    code: Chat_ERROR_CODE.UserAlreadyExist,
                },
            }
        );
    }
}

export class InValidRoleError extends GraphQLError {
    constructor(message: string | null = null) {
        super(message || 'Không xác định được quyền truy cập của người dùng', {
            extensions: {
                code: Chat_ERROR_CODE.InValidRole,
            },
        });
    }
}

export class MySQLError extends GraphQLError {
    constructor(message: string | null = null) {
        super(message || 'Lỗi bất thường khi thao tác trong cơ sở dữ liệu', {
            extensions: {
                code: Chat_ERROR_CODE.MySQL,
            },
        });
    }
}

export class InvalidPaginationArgumentError extends GraphQLError {
    constructor(message: string) {
        super(message || 'Lỗi bất thường khi thao tác trong cơ sở dữ liệu', {
            extensions: {
                code: Chat_ERROR_CODE.InvalidPaginationArgument,
            },
        });
    }
}
export enum ErrorCode {
    /**
     * Invalid access token passed
     */
    Unauthenticated = 'Unauthenticated',
    /**
     * Invalid pagination argument specified
     */
    InvalidPaginationArgument = 'InvalidPaginationArgument',
    /**
     * Unexpected error MySQL
     */
    MySQL = 'MySQL',
    /**
     * Unexpected error MinIO
     */
    MinIO = 'MinIO',
    /**
     * RoleNotFound.
     */
    RoleNotFound = 'RoleNotFound',
    /**
     * User not found.
     */
    UserNotFound = 'UserNotFound',
    /**
     * User already exist.
     */
    UserAlreadyExist = 'UserAlreadyExist',
    /**
     * ProductCodeDuplicatedError
     */
    ProductCodeDuplicated = 'ProductCodeDuplicated',
    /**
     * User not mapping with token.
     */
    InvalidUserRequest = 'InvalidUserRequest',
    /**
     * InvalidStatus.
     */
    InvalidStatus = 'InvalidStatus',
    /**
     * TaskNotFound.
     */
    TaskNotFound = 'TaskNotFound',
    /**
     * TaskNotAllowUpdateError.
     */
    TaskNotAllowUpdate = 'TaskNotAllowUpdate',
    /**
     * TaskNotAllowUpdateError.
     */
    TaskNotAllowCreate = 'TaskNotAllowCreate',
    /**
     * NotificationNotFoundError.
     */
    NotificationNotFound = 'NotificationNotFound',
    /**
     * RecordNotFoundError
     */
    RecordNotFound = 'RecordNotFound',
    /**
     * ChatRoomNotFound.
     */
    ChatRoomNotFound = 'ChatRoomNotFound',
    /**
     * ChatRoomClosed.
     */
    ChatRoomClosed = 'ChatRoomClosed',
    /**
     * ChatMemberNotFound.
     */
    ChatMemberNotFound = 'ChatMemberNotFound',
    /**
     * ChatMessageNotFound.
     */
    ChatMessageNotFound = 'ChatMessageNotFound',
    /**
     * ChatRoomNotAllowCreateError.
     */
    ChatRoomNotAllowCreate = 'ChatRoomNotAllowCreate',
    /**
     * AddChatMemberNotAllowCreateError.
     */
    AddChatMemberNotAllowCreate = 'AddChatMemberNotAllowCreate',
}

//