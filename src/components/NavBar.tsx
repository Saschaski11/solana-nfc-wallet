
import React from 'react';
import { Home, ArrowUpDown, Wallet, Settings } from 'lucide-react';

interface NavBarProps {
  onNavItemClick: (view: string) => void;
  activeView: string;
}

const NavBar: React.FC<NavBarProps> = ({ onNavItemClick, activeView }) => {
  return (
    <div className="bg-[#111]/80 backdrop-blur-md border-t border-white/5 py-2">
      <div className="grid grid-cols-4 gap-1 px-4">
        <NavItem 
          icon={<Home size={22} />} 
          label="Home" 
          isActive={activeView === 'dashboard'}
          onClick={() => onNavItemClick('dashboard')}
          view="dashboard"
        />
        <NavItem 
          icon={<ArrowUpDown size={22} />} 
          label="Swap" 
          isActive={activeView === 'exchange'}
          onClick={() => onNavItemClick('exchange')}
          view="exchange"
        />
        <NavItem 
          icon={<Wallet size={22} />} 
          label="Wallet" 
          isActive={activeView === 'details'}
          onClick={() => onNavItemClick('details')}
          view="details"
        />
        <NavItem 
          icon={<Settings size={22} />} 
          label="Settings" 
          isActive={activeView === 'more'}
          onClick={() => onNavItemClick('more')}
          view="more"
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  view: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, view }) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-all py-1 navbar-button"
      onClick={onClick}
      data-view={view}
    >
      <div className={`mb-1 ${isActive ? 'text-[#9b87f5]' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? 'text-white' : 'text-gray-500'}`}>{label}</span>
    </div>
  );
};

export default NavBar;
