import { Login } from "../layouts/Login";

export const Home = () => {
  return (
    <section className=" flex items-center justify-center h-screen w-screen">
      <div className=" p-10 rounded  w-full h-full flex items-center justify-center gap-4">
        <p className="uppercase font-bold text-8xl">taskflow pro</p>
      </div>
      <div className=" p-10 rounded  w-full h-full flex items-center justify-center gap-4">
        <Login />
      </div>
    </section>
  );
};
