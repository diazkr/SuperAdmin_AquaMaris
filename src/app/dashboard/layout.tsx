import NavBar from '@/components/Navbar/Navbar';
import React from 'react';


const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="pt-4 pb-4 bg-body lg:flex-row h-full lg:h-screen">
      <div className="h-full grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <div className="w-full h-full">
            <NavBar />
          </div>
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
