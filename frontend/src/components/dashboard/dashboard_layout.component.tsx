import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuItem, menuItems } from "./dashboard.utils";
import { getUserInfo } from "../../services/auth.service";

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUserInfo();

  const currentPage = menuItems
    .flatMap((item) => (item.subRoutes ? [item, ...item.subRoutes] : [item]))
    .find(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/")
    );

  const pageTitle = currentPage?.name || "Dashboard";

  const accessibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "user")
  );

  const toggleSubMenu = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleNavigation = (item: MenuItem) => {
    if (item.subRoutes) {
      toggleSubMenu(item.name);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-slate-900 text-gray-200 lg:h-screen lg:overflow-hidden">
      <div className="border-b border-slate-700 bg-slate-800 px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="flex items-center gap-3 text-xl font-semibold text-gray-200 sm:text-2xl">
            <Link to="/" className="shrink-0">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition hover:bg-slate-700 hover:text-white">
                <i className="fas fa-arrow-left"></i>
              </span>
            </Link>
            <span className="min-w-0 truncate">{pageTitle}</span>
          </h1>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="hidden sm:flex sm:items-center sm:gap-4">
              <div className="relative inline-flex">
                <button
                  type="button"
                  className="!rounded-button rounded-full p-1 text-gray-400 transition hover:text-gray-200 focus:outline-none"
                >
                  <i className="fa-solid fa-bell"></i>
                </button>
                <span className="absolute right-0 top-0 grid min-h-[18px] min-w-[18px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-700 text-xs text-white">
                  {5}
                </span>
              </div>
              <button
                type="button"
                className="!rounded-button flex text-sm rounded-full focus:outline-none"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://avatars.githubusercontent.com/u/76697055?v=4"
                  alt="profile"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-w-0 flex-col overflow-hidden lg:flex-row">
        <aside
          className={`flex w-full shrink-0 flex-col border-r border-slate-700 bg-slate-800 transition-all duration-300 ${
            isSidebarCollapsed ? "lg:w-20" : "lg:w-64"
          }`}
        >
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {accessibleMenuItems.map((item) => (
              <div key={item.name}>
                <div
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === item.path ||
                    location.pathname.startsWith(item.path + "/")
                      ? "bg-blue-500/30 text-gray-400"
                      : "text-gray-400 hover:bg-blue-500/20"
                  }`}
                  onClick={() => handleNavigation(item)}
                >
                  <div className="flex items-center">
                    <i className={`${item.icon} w-5 h-5 mr-2`}></i>
                    {!isSidebarCollapsed && <span>{item.name}</span>}
                  </div>
                  {item.subRoutes && !isSidebarCollapsed && (
                    <i
                      className={`fas fa-chevron-down transition-transform duration-200 ${
                        expanded[item.name] ? "rotate-180" : ""
                      }`}
                    ></i>
                  )}
                </div>
                {item.subRoutes && expanded[item.name] && (
                  <div className="ml-6 mt-1 space-y-1 pr-2">
                    {item.subRoutes.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                          location.pathname === subItem.path
                            ? "bg-blue-500/30 text-gray-400"
                            : "text-gray-400 hover:bg-blue-500/20"
                        }`}
                      >
                        <i className={`${subItem.icon} w-4 h-4 mr-2`}></i>
                        {!isSidebarCollapsed && <span>{subItem.name}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden bg-slate-800 p-4 lg:block">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex w-full items-center justify-center rounded-md bg-blue-500/30 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500/20"
            >
              <i
                className={`fas ${
                  isSidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"
                } mr-2`}
              ></i>
              {!isSidebarCollapsed && <span>Collapse Sidebar</span>}
            </button>
          </div>
        </aside>
        <div className="min-w-0 flex-1 overflow-auto">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
