/* eslint-disable linebreak-style */
// import { Document, Query } from 'mongoose';
// import {Query} from 'mongoose';
import { IPaginationInput } from '../../__generated__/graphql';
import { InvalidPaginationArgumentError } from '../classes/graphqlErrors';

export type TPageInfo = {
    hasNextPage: boolean;
    endCursor: any;
};

export type TRDBPaginationParam = {
    limit: number | undefined;
    offset: number;
    limitForLast: number | undefined;
};

export type TRDBEdge<T = any> = {
    model: T;
    cursor: number;
};

export type TRDBConnection<T = any> = {
    rows: TRDBEdge<T>[];
    count: number;
    hasNextPage: boolean;
};

export type TMongoConnection<T = any> = {
    totalCount: number;
    pageInfo: TPageInfo;
    edges?: T[];
};

const defaultPaginationInput = {
    first: undefined,
    last: undefined,
    before: undefined,
    after: undefined,
};

export const getRDBPaginationParams = (
    input: IPaginationInput | null | undefined
) => {
    const { first, last, before, after } = input || defaultPaginationInput;
    if (first !== undefined && first !== null && first < 1) {
        throw new InvalidPaginationArgumentError(
            `'first' argument must be greater than 0 but ${first}`
        );
    }
    if (last !== undefined && last !== null && last < 1) {
        throw new InvalidPaginationArgumentError(
            `'last' argument must be greater than 0 but ${last}`
        );
    }
    const result: TRDBPaginationParam = {
        limit: first || last || 10,
        offset: after || 0,
        limitForLast: undefined,
    };
    if (!after && before) {
        if (result.limit && before > result.limit) {
            result.offset = before - result.limit;
        }
    } else if (!first && last) {
        result.limitForLast = result.limit;
        result.limit = undefined;
    }
    return result;
};

const setCursorToRDBRows = <T>(rows: T[], offset: number): TRDBEdge<T>[] =>
    rows.map((model, idx) => ({
        cursor: idx + 1 + offset,
        model,
    }));

export const convertRDBRowsToConnection = <T>(
    { rows, count }: { rows: T[]; count: number },
    offset: number,
    limitForLast: number | undefined
): TRDBConnection<T> => {
    let rowsWithCursor = setCursorToRDBRows(rows, offset);
    rowsWithCursor = limitForLast
        ? rowsWithCursor.slice(-limitForLast)
        : rowsWithCursor;
    return {
        count,
        rows: rowsWithCursor,
        hasNextPage:
            rows.length < 1
                ? false
                : !(count === rowsWithCursor.slice(-1)[0].cursor),
    };
};

// export const getConnectionFromQuery = async <T extends Document>(
//     query: Query<T[], T>,
//     pagination: IPaginationInput | null | undefined
// ): Promise<TMongoConnection<T>> => {
//     const defaultLimit = 10;
//     const { first, last, before, after } = pagination || defaultPaginationInput;
//
//     if (first !== undefined && first !== null && first < 1) {
//         throw new InvalidPaginationArgumentError(
//             `'first' argument must be greater than 0 but ${first}`
//         );
//     }
//     if (last !== undefined && last !== null && last < 1) {
//         throw new InvalidPaginationArgumentError(
//             `'last' argument must be greater than 0 but ${last}`
//         );
//     }
//
//     const sortOpt = query.getOptions().sort;
//     const sortIdOpt =
//         // eslint-disable-next-line no-underscore-dangle
//         sortOpt && sortOpt._id && sortOpt._id === -1 ? '_id' : '-_id';
//
//     const MongooseQuery = query.toConstructor();
//
//     const totalCount = await new MongooseQuery().countDocuments();
//     const [lastDoc] : unknown = await new MongooseQuery().sort(sortIdOpt).limit(1);
//     let lastCursor = lastDoc ? lastDoc.id : null;
//
//     const edgesQuery = new MongooseQuery().sort(sortOpt);
//
//     if (last) {
//         edgesQuery.sort(sortIdOpt);
//     }
//
//     // Using 'as any' because mongoose type definition is weird
//     // ObjectId is available but input type is only number in gt and lt method
//     if (before) {
//         const limit = last || first || defaultLimit;
//         if (sortIdOpt === '_id') {
//             edgesQuery
//                 .where('_id')
//                 .gt(before as any)
//                 .limit(limit);
//         } else {
//             edgesQuery
//                 .where('_id')
//                 .lt(before as any)
//                 .limit(limit);
//         }
//     } else if (after) {
//         const limit = last || first || defaultLimit;
//         if (sortIdOpt === '_id') {
//             edgesQuery
//                 .where('_id')
//                 .lt(after as any)
//                 .limit(limit);
//         } else {
//             edgesQuery
//                 .where('_id')
//                 .gt(after as any)
//                 .limit(limit);
//         }
//     } else {
//         const limit = last || first || defaultLimit;
//         edgesQuery.limit(limit);
//     }
//
//     const edges = await edgesQuery.exec();
//
//     const sortedEdges = last ? edges.reverse() : edges;
//     const endCursor =
//         sortedEdges.length < 1 ? null : sortedEdges.slice(-1)[0].id;
//
//     if (before && last) {
//         lastCursor = endCursor;
//     }
//
//     return {
//         totalCount,
//         edges: sortedEdges,
//         pageInfo: {
//             endCursor,
//             hasNextPage: totalCount < 1 ? false : endCursor !== lastCursor,
//         },
//     };
// };

export const rdbConnectionResolver = {
    edges: (parent: TRDBConnection) => parent.rows,
    totalCount: (parent: TRDBConnection) => parent.count,
    pageInfo: (parent: TRDBConnection) => {
        const last =
            parent.rows.length < 1 ? null : parent.rows.slice(-1)[0].cursor;
        return {
            hasNextPage: parent.hasNextPage,
            endCursor: last,
        };
    },
};

export const rdbEdgeResolver = {
    node: (parent: TRDBEdge) => parent.model,
    cursor: (parent: TRDBEdge) => `${parent.cursor}`,
};
export const mongoEdgeResolver = {
    node: (parent: any) => parent,
    cursor: (parent: any) => parent.id,
};