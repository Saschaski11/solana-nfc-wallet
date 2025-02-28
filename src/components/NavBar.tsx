
import React from 'react';
import { PlusCircle, Repeat, LayoutList, MoreHorizontal } from 'lucide-react';

const NavBar = () => {
  return (
    <div className="bg-[#121420]/95 border-t border-[#9b87f5]/20 py-2">
      <div className="grid grid-cols-4 gap-1">
        <NavItem icon={<PlusCircle />} label="Add money" />
        <NavItem icon={<Repeat />} label="Exchange" />
        <NavItem icon={<LayoutList />} label="Details" />
        <NavItem icon={<MoreHorizontal />} label="More" />
      </div>
      
      {/* Bottom indicator bar */}
      <div className="flex justify-center mt-4 pb-1">
        <div className="w-1/3 h-1 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-700 rounded-full p-3 mb-1">
        <div className="text-[#9b87f5] h-6 w-6">{icon}</div>
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
};

export default NavBar;
