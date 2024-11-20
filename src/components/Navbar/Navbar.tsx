import { ReactElement } from "react";

const Navbar = ({ comp }: { comp: ReactElement }) => {
  return (
    <>
      <nav className="flex items-center bg-red-500 w-full fixed top-0 h-20">
        <ul>
          <li>{comp}</li>
        </ul>
        <ul>
          <li>{comp}</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
