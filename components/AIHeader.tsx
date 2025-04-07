// i will check it later, this has been made with the help of AI


import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = ({
  logo = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
  onLogoClick = () => {},
  isLoggedIn = false,
  userName = "John Doe",
  profileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  onSignOut = () => {}
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto cursor-pointer"
              src={logo}
              alt="Logo"
              onClick={onLogoClick}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9";
              }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FiSun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <FiMoon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={profileImage}
                  alt="Profile"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                  }}
                />
                <span className="text-gray-700 dark:text-gray-200">{userName}</span>
                <FiChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  {isLoggedIn ? (
                    <button
                      onClick={onSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Sign In
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt3 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex items-center justify-between p-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <FiSun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <FiMoon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {isLoggedIn ? (
                <button
                  onClick={onSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-y-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Sign In
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;