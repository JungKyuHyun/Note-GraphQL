import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import { typeDefs, defaults, resolvers } from './clinetState';

// 수동으로 아폴로 캐시를 생성해 주는 방법. 
// apollo-boost를 사용하면 자동으로 해결됨. 
const cache = new InMemoryCache(); 

// 네이밍을 Link로 지은 이유
// 기본적으로 Apollo에서 거의 모든 명령어들은 전부 링크가 된다.
// HTTP로 연결되는 Link를 만들 수도 있고, 에러를 전담하는 errorLink등을 만들 수 있다. 
const stateLink = withClientState({ // Clinet State를 위한 설정을 하기 위해 만듬 
    cache,
    typeDefs,
    defaults,
    resolvers,
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink])
});

export default client;