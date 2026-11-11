import React from "react";
import MainNav from "./components/MainNav";
import { UserNav } from "./components/Usernav";
import me from "@/assets/me.jpg"
import { HeaderActions } from "./components/HeaderAction";

const Navbar = () => {
  const user = { name: "Mohamed Salah", role: "UI/UX", avatar: me };
  return (
    <header className="w-full py-5 bg-white mb-5">
      <nav className=" app-container mx-auto flex items-center gap-6">
        <h1 className="text-xl leading-4 font-normal">Collabspace</h1>
        <MainNav />
        <div>
          <HeaderActions user={null} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
