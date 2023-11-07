import { Header, NavVertical } from "components";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex h-full">
        <NavVertical />
        <main className="p-4 w-full mt-20 space-y-4 lg:ml-60 lg:w-[calc(100%-15rem)]">{children}</main>
        <footer></footer>
      </div>
    </>
  );
};
