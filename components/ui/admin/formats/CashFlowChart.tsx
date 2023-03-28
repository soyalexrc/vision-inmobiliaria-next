import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {Grid} from "@mui/material";
import {RHFAutocomplete} from "../../forms";
import {states} from "../../../../utils/mock-data";

const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
const data = [
  {
    month: 'ENERO',
    uv: 4000,
    monto: 2400,
    amt: 2400,
  },
  {
    month: 'FEBRERO',
    uv: 3000,
    monto: 1398,
    amt: 2210,
  },
  {
    month: 'MARZO',
    uv: 2000,
    monto: 9800,
    amt: 2290,
  },
  {
    month: 'MARZO',
    uv: 2780,
    monto: 3908,
    amt: 2000,
  },
  {
    month: 'ABRIL',
    uv: 1890,
    monto: 4800,
    amt: 2181,
  },
  {
    month: 'MAYO',
    uv: 2390,
    monto: 3800,
    amt: 2500,
  },
  {
    month: 'JUNIO',
    uv: 3490,
    monto: 4300,
    amt: 2100,
  },
  {
    month: 'JULIO',
    uv: 3490,
    monto: 4300,
    amt: 2100,
  },
  {
    month: 'AGOSTO',
    uv: 3490,
    monto: 4300,
    amt: 2100,
  },
  {
    month: 'SEPTIEMBRE',
    uv: 3490,
    monto: 4300,
    amt: 2100,
  },
  {
    month: 'OCTUBRE',
    uv: 0,
    monto: 0,
    amt: 0,
  },
  {
    month: 'NOVIEMBRE',
    uv: 0,
    monto: 100,
    amt: 0,
  },
  {
    month: 'DICIEMBRE',
    uv: 0,
    monto: 0,
    amt: 0,
  },
];


export function CashFlowChart() {
  return (
    <>
      {/*Filtros*/}
      <form action="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            {/*  <RHFAutocomplete*/}
            {/*    name="location.state"*/}
            {/*    options={['']}*/}
            {/*    getOptionLabel={(option: any) => option || ''}*/}
            {/*    defaultValue={null}*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
      </form>
      <div style={{width: '100%', height: '500px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="month"/>
            <YAxis dataKey='monto'/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="monto" stroke="#610321" activeDot={{r: 8}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
