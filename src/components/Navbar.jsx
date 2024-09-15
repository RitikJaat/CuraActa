import React from 'react';

const Navbar = ({ setActivePage }) => {
  return (
    <nav className='flex items-center justify-between px-2 bg-black/40 backdrop-blur-[1px] rounded-lg hover:backdrop-blur-[2px] hover:bg-black/60 duration-300 text-white'>
      <div className="left">
        <ul className="flex gap-3">
          <li className='cursor-pointer font-bold'>CuraActa</li>
          <li
            className='cursor-pointer hover:text-slate-300'>
            Home
          </li>
        </ul>
      </div>
      <div className="right items-center m-1">
        <div className="userimage w-10">
          <img src="https://cdn.pfps.gg/pfps/5040-toji-bbg.png" alt="User Avatar" className='rounded-full' draggable="false" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
