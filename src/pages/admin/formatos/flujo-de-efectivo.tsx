import React from 'react';
import {AdminLayout} from "../../../../components/layouts";
import {Box, Tab, Tabs} from "@mui/material";
import {a11yProps, TabPanel} from "../../../../components/ui/tabs";
import {CashFlowList} from "../../../../components/ui/admin/formats";

export default function CashFlowPage() {
  const [tab, setTab] = React.useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <AdminLayout title='Formato de flujo de efectivo | Vision inmobiliaria'>
      <>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleChange} aria-label="panel de flujo de efectivo" centered>
            <Tab label="Valor 1" {...a11yProps(0)} />
            <Tab label="Valor 2" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {/*tabla*/}
          <CashFlowList/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {/*lista de atributos*/}
          valor 1
        </TabPanel>
      </>
    </AdminLayout>
  )
}
