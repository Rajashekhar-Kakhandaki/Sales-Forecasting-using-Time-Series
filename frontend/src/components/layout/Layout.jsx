import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

  const [open, setOpen] = useState(true);

  return (

    <div className="bg-slate-100 min-h-screen">

      <Sidebar open={open} />

      <div
        className={`transition-all duration-300 ${
          open ? "ml-64" : "ml-20"
        }`}
      >

        <Navbar
          toggleSidebar={() => setOpen(!open)}
        />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>

  );
}

export default Layout;