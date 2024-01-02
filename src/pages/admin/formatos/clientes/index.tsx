import React from 'react';
import { AdminLayout } from '../../../../../components/layouts';
import { Box, Tab, Tabs } from '@mui/material';
import { ClientsList, ClientsChart } from '../../../../../components/ui/admin/formats';
import { a11yProps, TabPanel } from '../../../../../components/ui/tabs';

export default function ClientsPage() {
  const [tab, setTab] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <AdminLayout title="Formato de clientes | Vision inmobiliaria">
      <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="panel de propiedades y atributos" centered>
            <Tab label="Tabla" {...a11yProps(0)} />
            <Tab label="Grafico" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {/*tabla*/}
          <ClientsList />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {/*grafico*/}
          <ClientsChart />
        </TabPanel>
      </>
    </AdminLayout>
  );
}
