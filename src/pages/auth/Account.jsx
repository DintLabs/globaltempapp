import React from "react";

import { Box, Tabs, Tab } from "@mui/material";
import Setting from "components/account/Setting";
import Products from "components/account/Products";

const Account = () => {
  const [tab, setTab] = React.useState(1);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ padding: "30px 60px" }}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          aria-label="wrapped label tabs example"
          sx={{ mb: "24px" }}
        >
          <Tab value={0} label="Setting" wrapped />
          <Tab value={1} label="Products" />
          <Tab value={2} label="Others" />
        </Tabs>

        {tab === 0 && <Setting />}
        {tab === 1 && <Products />}
      </Box>
    </Box>
  );
};

export default Account;
