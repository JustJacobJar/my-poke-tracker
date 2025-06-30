import InfiniteScroll from "react-infinite-scroll-component";

export default function Feed({
  children,
  dataLength,
  next,
  hasMore,
}: {
  children: React.ReactNode;
  dataLength: number;
  next: () => void;
  hasMore: boolean;
}) {
  return (
    <InfiniteScroll
      className="flex w-full flex-col place-items-center place-self-center"
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={
        <svg
          className="stroke-border my-4 size-12 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      }
      endMessage={<h4 className="my-8 text-lg">No more teams.</h4>}
    >
      <li className="grid max-w-[96rem] grid-cols-1 gap-4 place-self-center p-4 lg:grid-cols-2 2xl:grid-cols-3">
        {children}
      </li>
    </InfiniteScroll>
  );
}
