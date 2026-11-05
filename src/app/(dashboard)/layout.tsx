export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-light w-full ">
      <main className="app-container ">{children}</main>
    </div>
  );
}
