// eslint-disable-next-line import/extensions,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
// noinspection HttpUrlsUsage
import { createServer } from 'http';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
// import resolvers from './schema/resolvers';
import { WebSocketServer } from 'ws';
// import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import typeDefs from './schema/types';
import { syncDatabase } from './db_loaders/mysql';
import { mongoLoader } from './db_loaders/mongodb';
import { app } from './config/appConfig';
import { USER_JWT } from './lib/utils/jwt';

dotenv.config();

export interface ChatContext {
    isAuth: boolean;
    user?: USER_JWT;
    error: any;
    req: express.Request;
    res: express.Response;
    // awsS3StorageService: AwsS3StorageService;
    // pubsub: PubSubService;
}

interface ContextFunctionProps {
    req: express.Request;
    res: express.Response;
}

const typeDefs = `#graphql
type Query {
    hello: String
}
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {},
};

const authentication = async (
    authorization: string,
    req: express.Request,
    res: express.Response
): Promise<ChatContext & JwtPayload> => {
    let token: string;
    if (authorization.startsWith('Bearer ')) {
        token = authorization.slice(7, authorization.length);
    }
    const user: JwtPayload = new Promise((resolve, reject) => {
        jwt.verify(token, app.secretSign, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    });
    return await user
        .then((result: USER_JWT & JwtPayload) => ({
            isAuth: true,
            user: result,
            req,
            res,
        }))
        .catch((err: Error) => ({
            isAuth: false,
            error: err.message,
            req,
            res,
        }));
};

const context = async ({
                           req,
                           res,
                       }: ContextFunctionProps): Promise<ChatContext> => {
    const token = req.headers?.authorization || '';
    const auth = await authentication(token, req, res);
    return {
        ...auth,
        // ...appContext,
    };
};
// const getDynamicContext = async (
//     ctx: Context<
//         Record<string, unknown> | undefined,
//         Extra & Partial<Record<PropertyKey, never>>
//     >,
//     msg: SubscribeMessage,
//     args: ExecutionArgs
// ) => {
//     if (ctx.connectionParams?.authentication) {
//         // TODO
//         console.log('msg: ', msg);
//         console.log('args: ', args);
//         return { currentUser: { id: 1 } };
//     }
//     return { currentUser: null };
// };

async function startServer() {
    await Promise.all([syncDatabase(), mongoLoader()]);
    const appSrv = express();
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const httpServer = createServer(appSrv);

    // Create WebSocket server using the HTTP server.
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/subscriptions',
    });
    // Save the returned server's info that we can shut down this server later
    const serverCleanup = useServer(
        {
            schema,
            // context: async (ctx, msg, args) => {
            //     console.log('msg: ');
            //     return getDynamicContext(ctx, msg, args);
            // },
            onConnect: async () => {
                console.log('A client connected!');
            },
            onDisconnect() {
                console.log('Disconnected!');
            },
        },
        wsServer
    );

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4003 },
        // context: async ({ req }) => ({ token: req.headers.token }),
    });
    // await server.start();
    // This middleware should be added before calling `applyMiddleware`.
    appSrv.use(graphqlUploadExpress());
    appSrv.use(
        '/graphql',
        bodyParser.json()
        // expressMiddleware(server, {
        //     context,
        // })
    );
    await new Promise<void>(() => {
        // httpServer.listen({ port: app.port, hostname: app.host }, resolve);
        console.log(`🚀 Server ready at ${url}graphql`);
        console.log(
            `🚀 Subscription endpoint ready at ws://${app.host}:${app.port}/subscriptions`
        );
    });
}

startServer().catch((error) => {
    console.error('Unable start server: ', error);
});