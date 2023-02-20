import React from 'react';
import {AdminLayout} from "../../../../components/layouts";
import {GetServerSideProps} from "next";
import {parseCookie} from "../../../../utils";
import {Box, Typography, Tabs, Tab} from '@mui/material';
import {PropertiesList, AttributesList} from "../../../../components/ui/admin/properties";
import {a11yProps, TabPanel} from "../../../../components/ui/tabs";

export default function PropertiesPage() {
  const [tab, setTab] = React.useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <AdminLayout title='Propiedades - Vision Inmobiliaria'>
      <>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleChange} aria-label="panel de propiedades y atributos" centered>
            <Tab label="Propiedades" {...a11yProps(0)} />
            <Tab label="Atributos" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel  value={tab} index={0}>
          {/*Lista de propiedades*/}
          <PropertiesList />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {/*lista de atributos*/}
          <AttributesList />
        </TabPanel>
      </>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/autenticacion/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
