import React from 'react';
import { FaList } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const DEFAULT_IMAGE = "https://res.cloudinary.com/dpj4vsqbo/image/upload/v1733721452/categorys/lyihaamrmu79acd9ei1c.png";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40 bg-[#006400]">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#FFFFFF] text-[#000000] px-5 transition-all">
        {/* Sidebar Toggle */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-green-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        {/* Search Bar */}
        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
            type="text"
            name="search"
            placeholder="Buscar..."
          />
        </div>
        {/* User Info */}
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-sm font-bold">{userInfo.name}</h2>
                <span className="text-[14px] w-full font-normal">{userInfo.role}</span>
              </div>
              {/* User Image */}
              <img
                className="w-[45px] h-[45px] rounded-full overflow-hidden object-cover"
                src={
                  userInfo.role === "admin"
                    ? DEFAULT_IMAGE
                    : userInfo.image || DEFAULT_IMAGE
                }
                alt="User"
                onError={(e) => (e.target.src = DEFAULT_IMAGE)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
