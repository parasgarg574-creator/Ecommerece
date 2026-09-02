import { RxDashboard } from "react-icons/rx";
import { FaChevronLeft } from "react-icons/fa";
const SideBar = ({
  collapsed,
  setcollapsed,
  activePage,
  setactivePage,
}) => {
  const menuitems = [
    "Dashboard",
    "Products",
    "Orders",
    "Customers",
    "Categories",
    "Settings",
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[315px]"
      }`}
    >
      <div
        className={`flex h-[120px] items-center border-b border-gray-100 ${
          collapsed ? "justify-center px-4" : "px-8"
        }`}
      >
        <img
          src="/Logo.svg"
          alt="Logo"
          width={34}
          height={34}
          className="h-[34px] w-[auto] object-contain"
        />
      </div>
      <button
        type="button"
        onClick={() => setcollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-4 top-32 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
      >
        <FaChevronLeft
          size={15}
          className={`transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>
      <nav className="space-y-2 p-4 sm:p-5">
        {menuitems.map((item) => {
          const active = activePage === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setactivePage(item)}
              title={collapsed ? item : undefined}
              className={`flex w-full items-center rounded-lg px-4 py-3.5 transition ${
                collapsed
                  ? "justify-center"
                  : "justify-start gap-4"
              } ${
                active
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <RxDashboard
                size={20}
                className="shrink-0"
              />

              {!collapsed && (
                <span className="font-medium">
                  {item}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
