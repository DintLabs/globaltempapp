import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab } from "@mui/material";

import Setting from "components/account/Setting";
import Products from "components/account/Products";

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "30px 60px",
  boxSizing: "border-box",
  overflow: "hidden",

  [theme.breakpoints.down("md")]: {
    padding: "30px 24px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "30px 16px",
  },
}));

const Account = () => {
  const [tab, setTab] = React.useState(1);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Account;
