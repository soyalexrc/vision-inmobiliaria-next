import React from 'react';
import {AdminLayout} from "../../../../components/layouts";
import {Box, Tab, Tabs} from "@mui/material";
import {ClientsList} from "../../../../components/ui/admin/formats";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ClientsPage() {
  const [tab, setTab] = React.useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <AdminLayout title='Formato de clientes | Vision inmobiliaria'>
      <>
        <>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={tab} onChange={handleChange} aria-label="panel de propiedades y atributos" centered>
              <Tab label="Valor 1" {...a11yProps(0)} />
              <Tab label="Valor 2" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel  value={tab} index={0}>
            {/*tabla*/}
            <ClientsList />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {/*lista de atributos*/}
            valor 1
          </TabPanel>
        </>
      </>
    </AdminLayout>
  )
}
