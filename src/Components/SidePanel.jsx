import React, { useState } from "react";

import Search from "./Search";
import UserChats from "./UserChats";

function SidePanel() {
  const [added, setAdded] = useState(false);

  return (
    <div className="sidepanel">
      <Search added={() => setAdded((prev) => !prev)} />
      <UserChats added={added} />
    </div>
  );
}

export default SidePanel;
