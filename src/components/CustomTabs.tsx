import { Box, Tab, Tabs } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { CustomTabsProps } from "@/types/tabs";

const CustomTabs = ({ tabs }: CustomTabsProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const currentTabIndex = useMemo(
    () => tabs.findIndex((tab) => tab.path === pathName),
    [pathName, tabs]
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(tabs[newValue].path);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
        marginBottom: 4,
      }}
    >
      <Tabs
        variant="standard"
        value={currentTabIndex}
        onChange={handleChange}
        textColor="inherit"
        sx={{
          ".MuiTab-root": {
            fontWeight: 600,
            color: "#6E6D7A",
          },
          ".Mui-selected": {
            color: "#000000",
          },
          ".MuiTabs-indicator": {
            backgroundColor: "#000000",
          },
          paddingX: "36px",
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} {...a11yProps(tab.id)} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;
