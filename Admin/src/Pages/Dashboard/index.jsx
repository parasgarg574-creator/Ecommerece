import { useState } from "react";
import SideBar from "../sideBar";
import Header from "../TopBar";
const Dashboard = () => {
  const [collapsed, setcollapsed] = useState(false);
  const [activePage, setactivePage] = useState("Dashboard");
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  const getadmin = localStorage.getItem("response");
  const Admin = JSON.parse(getadmin)
  return (
    <div className="flex min-h-screen w-full bg-[#f5f4f2]">
      <SideBar
        collapsed={collapsed}
        setcollapsed={setcollapsed}
        activePage={activePage}
        setactivePage={setactivePage}
      />
      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
          collapsed ? "ml-[80px]" : "ml-[315px]"
        }`}
      >
        <Header admin={Admin} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-semibold text-[#333] sm:text-[22px]">
              {activePage === "Dashboard" ? "Dashboard" : activePage}
            </h1>

            <button
              onClick={handleLogout}
              className="h-[36px] w-full rounded-[6px] bg-[#00491B] px-4 text-[12px] font-semibold text-white transition hover:bg-[#019D3E] sm:w-auto"
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
