
import React from 'react';
import { ShieldCheck, HelpCircle, RefreshCw, LogOut, Moon, Globe } from 'lucide-react';

const MoreOptionsView = () => {
  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-center mb-6">Settings</h2>
      
      {/* Settings Options */}
      <div className="space-y-3">
        <SettingsItem 
          icon={<Globe size={18} />} 
          title="Network" 
          description="Mainnet" 
          iconBgColor="bg-blue-500/20"
          iconColor="text-blue-400"
        />
        
        <SettingsItem 
          icon={<Moon size={18} />} 
          title="Appearance" 
          description="Dark" 
          iconBgColor="bg-purple-500/20"
          iconColor="text-purple-400"
        />
        
        <SettingsItem 
          icon={<ShieldCheck size={18} />} 
          title="Security" 
          description="Manage wallet security" 
          iconBgColor="bg-green-500/20"
          iconColor="text-green-400"
        />
        
        <SettingsItem 
          icon={<HelpCircle size={18} />} 
          title="Help & Support" 
          description="FAQ and contact info" 
          iconBgColor="bg-yellow-500/20"
          iconColor="text-yellow-400"
        />
      </div>
      
      {/* Danger Zone */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Danger Zone</h3>
        
        <div className="space-y-3">
          <SettingsItem 
            icon={<RefreshCw size={18} />} 
            title="Reset Cache" 
            description="Clear local application data" 
            iconBgColor="bg-orange-500/20"
            iconColor="text-orange-400"
            danger
          />
          
          <button 
            className="w-full p-4 bg-red-900/20 hover:bg-red-900/30 rounded-xl text-left flex items-center space-x-3 border border-red-900/30 transition-colors"
            onClick={() => {
              if (confirm('Are you sure you want to reset your wallet? This action cannot be undone.')) {
                localStorage.removeItem('privateKey');
                localStorage.removeItem('walletAddress');
                window.location.reload();
              }
            }}
          >
            <div className="p-2 bg-red-500/20 rounded-full">
              <LogOut size={18} className="text-red-400" />
            </div>
            <div>
              <p className="text-red-400 font-medium">Reset Wallet</p>
              <p className="text-xs text-red-300/70">Delete wallet data (dangerous)</p>
            </div>
          </button>
        </div>
      </div>
      
      {/* Version Info */}
      <div className="mt-10 text-center">
        <p className="text-xs text-gray-500">Version 1.0.0</p>
      </div>
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
  danger?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  description, 
  iconBgColor, 
  iconColor,
  danger 
}) => (
  <button className={`w-full p-4 ${danger ? 'bg-red-900/10 hover:bg-red-900/20 border-red-900/20' : 'bg-white/5 hover:bg-white/10 border-white/10'} rounded-xl text-left flex items-center space-x-3 border transition-colors`}>
    <div className={`p-2 ${iconBgColor} rounded-full`}>
      <div className={iconColor}>{icon}</div>
    </div>
    <div>
      <p className={`font-medium ${danger ? 'text-red-400' : 'text-white'}`}>{title}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  </button>
);

export default MoreOptionsView;
