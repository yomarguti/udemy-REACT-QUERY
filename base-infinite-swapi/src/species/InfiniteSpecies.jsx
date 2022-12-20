import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { Species } from './Species';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error!</div>}
      {isFetching && <div className="loading">Loading more...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map((page) =>
          page.results.map((species) => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
