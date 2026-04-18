'use client';

import { useState } from 'react';
import Sidebar from '../../components/app/Sidebar';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed((v) => !v)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}
