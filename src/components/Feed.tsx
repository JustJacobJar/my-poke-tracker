export default function Feed({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid max-w-[96rem] grid-cols-1 gap-4 place-self-center p-4 lg:grid-cols-2 2xl:grid-cols-3">
      {children}
    </div>
  );
}