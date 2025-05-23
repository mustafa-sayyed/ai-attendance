import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { LuCamera, LuTable, LuSettings, LuChartBar } from "react-icons/lu";
import { useSidebar } from "../../context/SidebarContext";
import { CalenderIcon, ChevronDownIcon, GridIcon, UserCircleIcon } from "../../icons";
import { LogoutModal } from "../../components/auth/";
import { SiGoogleclassroom } from "react-icons/si";
import { useSelector } from "react-redux";

// Define menu items with their required roles
const originalNavItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/teacher/dashboard",
  },
  {
    name: "Take Attendance",
    icon: <LuCamera />,
    path: "/teacher/take-attendance",
  },
  {
    name: "Attendance Overview",
    icon: <LuTable />,
    path: "/teacher/attendance-overview",
  },
  {
    name: "Manage Department Classes",
    icon: <SiGoogleclassroom />,
    path: "/teacher/manage-deptartment-classes",
    requiredRole: "hod",
  },
  {
    name: "Manage Class",
    icon: <SiGoogleclassroom />,
    path: "/teacher/manage-class",
    requiredRole: "cc",
  },
  {
    name: "Manage Students",
    icon: <SiGoogleclassroom />,
    path: "/teacher/manage-students",
    requiredRole: "cc",
  },
  {
    name: "Reports & Analytics",
    icon: <LuChartBar />,
    path: "/teacher/reports",
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/teacher/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/teacher/profile",
  },
  {
    name: "Settings",
    icon: <LuSettings />,
    path: "/teacher/settings",
  },
];

const othersItems = [
  // Other menu items (commented out)
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [filteredNavItems, setFilteredNavItems] = useState([]);

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  const userRoles = useSelector((state) => state?.auth?.roles || []);

  // Filter navigation items based on user roles
  useEffect(() => {
    const filtered = originalNavItems.filter(item => {
      // If the item requires a specific role, check if user has that role
      if (item.requiredRole) {
        return userRoles.includes(item.requiredRole);
      }
      // If no specific role is required, show the item to everyone
      return true;
    });
    
    setFilteredNavItems(filtered);
  }, [userRoles]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? filteredNavItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive, filteredNavItems]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded ? "lg:justify-center" : "lg:justify-start"
              }`}>
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}>
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}>
                  {nav.icon}
                </span>
                {(isExpanded || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}>
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}>
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}>
                            new
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}>
        <div
          className={`py-8 flex ${!isExpanded ? "lg:justify-center" : "justify-start"}`}>
          <Link to="/">
            {isExpanded || isMobileOpen ? (
              <>
                <img
                  className="dark:hidden"
                  src="/images/logo/logo.svg"
                  alt="Logo"
                  width={150}
                  height={40}
                />
                <img
                  className="hidden dark:block"
                  src="/images/logo/logo-dark.svg"
                  alt="Logo"
                  width={150}
                  height={40}
                />
              </>
            ) : (
              <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
            )}
          </Link>
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded ? "lg:justify-center" : "justify-start"
                  }`}>
                  Menu
                </h2>
                {renderMenuItems(filteredNavItems, "main")}
              </div>
            </div>
          </nav>
          <Link
            onClick={() => setLogoutModalOpen(true)}
            className={`menu-item group ${isMobileOpen ? "mt-1" : "mt-7"} ${
              isActive("/logout") ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span
              className={`menu-item-icon-size ${
                isActive("/logout") ? "menu-item-icon-active" : "menu-item-icon-inactive"
              }`}>
              <MdLogout />
            </span>
            {(isExpanded || isMobileOpen) && (
              <span className="menu-item-text">{"Logout"}</span>
            )}
          </Link>
        </div>
      </aside>
      <LogoutModal isOpen={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </>
  );
};

export default AppSidebar;