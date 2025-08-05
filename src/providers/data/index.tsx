import graphqlDataProvider, {
    GraphQLClient,
    liveProvider as graphqlLiveProvider
} from "@refinedev/nestjs-query";
import { createClient } from 'graphql-ws';
import { fetchWrapper } from "./fetch-wrapper";

export const API_BASE_URL = 'https://api.crm.refine.dev'
export const API_URL = `${API_BASE_URL}/graphql`
export const WS_URL = 'wss://api.crm.refine.dev/graphql'

export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try {
            return fetchWrapper(url, options);
        } catch (error) {
            return Promise.reject(error as Error);
        }
    }
})

// Websocket that will listen to subscriptions to this GraphQL API
// Uses Live Provider to implement real time updates across various users
export const wsClient = typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
            const accessToken = localStorage.getItem("access_token");

            return {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        }
    })
    : undefined

// Data Provider to make requests to the GraphQL API
export const dataProvider = graphqlDataProvider(client);

// Live Provider to make subscriptions to GraphQL API
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined;

