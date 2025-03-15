import { NavLink } from "react-router-dom"
// import './NavBar.css'

export const NavBar = () => {
  return (
    <div className="bg-black flex flex-row sticky top-0 text-red-700 pt-2 px-4">
      <NavLink
        to="/monitor"
        className={({ isActive }) => `${isActive ? "text-red-700 bg-white" : ""} block px-8 pt-1 pb-3 rounded-t-[8px] duration-200`}
      >
        Theo dõi
      </NavLink>
      <NavLink
        to="/config-manager"
        className={({ isActive }) => `${isActive ? "text-red-700 bg-white" : ""} block px-8 pt-1 pb-3 rounded-t-[8px] duration-200`}
      >
        Cấu hình
      </NavLink>
    </div>
  )
}
