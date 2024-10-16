import React, { PropsWithChildren } from "react";


function AppLayout({ children }: PropsWithChildren) { 

  return (
    <main className="w-screen h-screen my-auto bg-slate-200 overflow-y-auto">
      {children}
    </main>
  );
}

export default AppLayout;
