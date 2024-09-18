import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/app1">App 1</NavLink>
        <NavLink to="/app2">App 2</NavLink>
        <NavLink to="/app3">App 3</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
