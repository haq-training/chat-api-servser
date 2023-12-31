import { RoleID } from './enum';
import { InValidRoleError } from './classes/graphqlErrors';

export const iRoleToNumber = (role: number) => {
    switch (role) {
        case 0:
            return RoleID.ADMIN;
        case 1:
            return RoleID.USER;
        default:
            throw new InValidRoleError();
    }
};
export enum BucketValue {
    ORIGINAL = 'original',
    FINISHED = 'finished',
    AVATAR = 'avatars',
    TmCloudFiles = 'tm-cloud-files',
}
