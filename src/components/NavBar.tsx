
import React from 'react';
import { PlusCircle, Repeat, LayoutList, MoreHorizontal } from 'lucide-react';

interface NavBarProps {
  onNavItemClick: (view: string) => void;
  activeView: string;
}

const NavBar: React.FC<NavBarProps> = ({ onNavItemClick, activeView }) => {
  return (
    <div className="bg-[#121420]/95 border-t border-[#9b87f5]/20 py-2 backdrop-blur-md">
      <div className="grid grid-cols-4 gap-1 px-2">
        <NavItem 
          icon={<PlusCircle />} 
          label="Add money" 
          isActive={activeView === 'addMoney'}
          onClick={() => onNavItemClick('addMoney')}
        />
        <NavItem 
          icon={<Repeat />} 
          label="Exchange" 
          isActive={activeView === 'exchange'}
          onClick={() => onNavItemClick('exchange')}
        />
        <NavItem 
          icon={<LayoutList />} 
          label="Details" 
          isActive={activeView === 'details'}
          onClick={() => onNavItemClick('details')}
        />
        <NavItem 
          icon={<MoreHorizontal />} 
          label="More" 
          isActive={activeView === 'more'}
          onClick={() => onNavItemClick('more')}
        />
      </div>
      
      {/* Bottom indicator bar */}
      <div className="flex justify-center mt-4 pb-1">
        <div className="w-1/3 h-1 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <div 
      className={`flex flex-col items-center cursor-pointer transition-all ${isActive ? 'scale-105' : 'opacity-80'}`}
      onClick={onClick}
    >
      <div className={`${isActive ? 'bg-[#9b87f5]/30' : 'bg-gray-700'} rounded-full p-3 mb-1 transition-colors`}>
        <div className={`${isActive ? 'text-[#D6BCFA]' : 'text-[#9b87f5]'} h-6 w-6`}>{icon}</div>
      </div>
      <span className={`text-xs ${isActive ? 'text-[#D6BCFA]' : 'text-gray-400'}`}>{label}</span>
    </div>
  );
};

export default NavBar;
