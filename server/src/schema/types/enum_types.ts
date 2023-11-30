import { IChatRoomType , ILevel , IStatus} from '../../__generated__/graphql';
// import { InvalidStatusError } from '../../lib/classes/graphqlErrors';
export enum DefaultHashValue {
    saltRounds = 10,
}

export enum BucketValue {
    ORIGINAL = 'original',
    FINISHED = 'finished',
    AVATAR = 'avatars',
    TmCloudFiles = 'tm-cloud-files',
}



export enum Status {
    Ready = 1,
    Assignee = 2,
    InProgress = 3,
    Waiting = 4,
    WaitApprove = 5,
    Reject = 6,
    Cancel = 7,
    Completed = 8,
}

export const resolveStatus = (option: number) => {
    switch (option) {
        case Status.Ready:
            return IStatus.Ready;
        case Status.Assignee:
            return IStatus.Assignee;
        case Status.InProgress:
            return IStatus.InProgress;
        case Status.Waiting:
            return IStatus.Waiting;
        case Status.WaitApprove:
            return IStatus.WaitApprove;
        case Status.Reject:
            return IStatus.Reject;
        case Status.Cancel:
            return IStatus.Cancel;
        case Status.Completed:
            return IStatus.Completed;
        default:
            throw new Error();
    }
};

export const resolveStatusToValue = (option: IStatus | null | undefined) => {
    switch (option) {
        case IStatus.Ready:
            return Status.Ready;
        case IStatus.Assignee:
            return Status.Assignee;
        case IStatus.InProgress:
            return Status.InProgress;
        case IStatus.Waiting:
            return Status.Waiting;
        case IStatus.WaitApprove:
            return Status.WaitApprove;
        case IStatus.Reject:
            return Status.Reject;
        case IStatus.Cancel:
            return Status.Cancel;
        case IStatus.Completed:
            return Status.Completed;
        default:
            throw new Error();
    }
};

export enum ChatMemberStatus {
    enable = 1,
    disable = 0,
}

export enum ChatRoomType {
    private = 0,
    group = 1,
}
export const  resolveChatRoomTypeToValue = (type: IChatRoomType) => {
    switch (type) {
        case IChatRoomType.Private:
            return ChatRoomType.private;
        case IChatRoomType.Group:
            return ChatRoomType.group;
        default:
            return 0;
    }
};

export const resolveToChatRoomType = (input: number) => {
    switch (input) {
        case 0:
            return IChatRoomType.Private;
        case 1:
            return IChatRoomType.Group;
        default:
            throw new Error();
    }
};

export enum Level {
    one = 1,
    two = 2,
    three = 3,
    four = 4,
}

export const resolveToLevel = (input: ILevel) => {
    switch (input) {
        case ILevel.One:
            return Level.one;
        case ILevel.Two:
            return Level.two;
        case ILevel.Three:
            return Level.three;
        case ILevel.Four:
            return Level.four;
        default:
            throw new Error('Giá trị của level không hợp lệ');
    }
};

export const iLevelTypeResolve = (input: Level) => {
    switch (input) {
        case Level.one:
            return ILevel.One;
        case Level.two:
            return ILevel.Two;
        case Level.three:
            return ILevel.Three;
        case Level.four:
            return ILevel.Four;
        default:
            throw new Error('Giá trị của level không hợp lệ');
    }
};
