import React, { useState } from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListSection from "./_component/TemplateListSection";

function Dashboard() {

  // const [userSearchInput ,setUserSearchInput] = useState<string>("");
  return (
    <div>
      <div>
        {/* Search Bar Section */}
        <SearchSection />
        {/* Template List  */}
        <TemplateListSection />
      </div>
    </div>
  );
}

export default Dashboard;
