import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/bulkrepocreator">App 1</NavLink>
        <NavLink to="/userremoveallrepos">App 2</NavLink>
        <NavLink to="/dockerfilecreator">App 3</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
