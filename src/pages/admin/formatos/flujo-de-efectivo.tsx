import React from 'react';
import {AdminLayout} from "../../../../components/layouts";
import {Box, Tab, Tabs} from "@mui/material";
import {a11yProps, TabPanel} from "../../../../components/ui/tabs";
import {CashFlowChart, CashFlowList} from "../../../../components/ui/admin/formats";

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
            <Tab label="Tabla" {...a11yProps(0)} />
            <Tab label="Grafico" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {/*tabla*/}
          <CashFlowList/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {/*grafioo*/}
          <CashFlowChart />
        </TabPanel>
      </>
    </AdminLayout>
  )
}
