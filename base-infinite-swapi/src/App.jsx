import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { InfinitePeople } from './people/InfinitePeople';
import { InfiniteSpecies } from './species/InfiniteSpecies';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        {/* <InfinitePeople /> */}
        <InfiniteSpecies />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
