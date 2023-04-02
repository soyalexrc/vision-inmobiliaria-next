import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Sector,
  Cell,
} from 'recharts';
import {FormatCashFlow} from "../../../../interfaces";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

export interface CashFlowChartProps {
  data: FormatCashFlow[];
  loading: boolean
}

const pieData = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200},
];

export function CashFlowChart({data, loading}: CashFlowChartProps) {


  function getFormatedDataByMonths(chartData: FormatCashFlow[]) {
    const staticData = [
      {
        month: 'ENERO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'FEBRERO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'MARZO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'MARZO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'ABRIL',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'MAYO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'JUNIO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'JULIO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'AGOSTO',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'SEPTIEMBRE',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'OCTUBRE',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'NOVIEMBRE',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
      {
        month: 'DICIEMBRE',
        monto: 0,
        por_pagar: 0,
        retencion: 0
      },
    ];
    for (let i = 0; i < chartData.length; i++) {
      if (staticData.find((el: any) => el.month === chartData[i].month)) {
        const index = staticData.findIndex((val: any) => val.month === chartData[i].month);
        const newValue = {
          monto: staticData[index].monto + Number(chartData[i].amount),
          month: staticData[index].month,
          por_pagar: staticData[index].monto + Number(chartData[i].pending_to_collect),
          retencion: staticData[index].monto + Number(chartData[i].total_due),
        }
        staticData.splice(index, 1, newValue)
      }

    }

    return staticData

  }

  function getFormattedDataByEntity(data: FormatCashFlow[]) {
    const barData = [
      {
        bnc: 0,
        bp: 0,
        bv: 0,
        bnt: 0,
        opg: 0,
        osc: 0,
        t: 0
      },
    ]

    for (let i = 0; i < data.length; i++) {
      if (data[i].entity === 'Tesorería') barData[0].t++
      if (data[i].entity === 'Banco Nacional de Crédito (BNC)') barData[0].bnc++
      if (data[i].entity === 'Banesco Venezuela') barData[0].bv++
      if (data[i].entity === 'Banesco Panamá') barData[0].bp++
      if (data[i].entity === 'Oficina Paseo La Granja') barData[0].opg++
      if (data[i].entity === 'Banco Nacional de Terceros') barData[0].bnt++
      if (data[i].entity === 'Oficina San Carlos') barData[0].osc++
    }

    return barData;
  }

  function getFormattedDataByTransactionType(data: FormatCashFlow[]) {
    const pieData = [
      {name: 'Ingreso', value: 0, color: '#0088FE'},
      {name: 'Egreso', value: 0, color: '#00C49F'},
      {name: 'Interbancaria', value: 0, color: '#FFBB28'},
      {name: 'Ingreso a cuenta de terceros', value: 0, color: '#FF8042'},
    ];
    for (let i = 0; i < data.length; i++) {
      if (data[i].transaction_type === 'Egreso') pieData[0].value++
      if (data[i].transaction_type === 'Ingreso') pieData[1].value++
      if (data[i].transaction_type === 'Interbancaria') pieData[2].value++
      if (data[i].transaction_type === 'Ingreso a cuenta de terceros') pieData[3].value++
    }

    return pieData
  }

  function getFormattedDataByCurrency(data: FormatCashFlow[]) {
    const pieData = [
      {name: '$ Estados Unidos', value: 0, color: '#840e60'},
      {name: 'Bs', value: 0, color: '#b7c188'},
      {name: 'Euros', value: 0, color: '#8583bd'},
    ];

    for (let i = 0; i < data.length; i++) {
      if (data[i].currency === '$ Estados Unidos') pieData[0].value++
      if (data[i].currency === 'Bs') pieData[1].value++
      if (data[i].currency === 'Euros') pieData[2].value++
    }

    return pieData
  }

  function getFormattedDataByPaymentType(data: FormatCashFlow[]) {
    const pieData = [
      {name: 'Efectivo', value: 0, color: '#4be4df'},
      {name: 'Transferencia', value: 0, color: '#51abaf'},
      {name: 'Pago Movil', value: 0, color: '#8dea90'},
      {name: 'Zelle', value: 0, color: '#e3a24e'},
    ];

    for (let i = 0; i < data.length; i++) {
      if (data[i].way_to_pay === 'Efectivo') pieData[0].value++
      if (data[i].way_to_pay === 'Transferencia') pieData[1].value++
      if (data[i].way_to_pay === 'Pago Movil') pieData[2].value++
      if (data[i].way_to_pay === 'Zelle') pieData[3].value++
    }

    return pieData
  }

  if (loading) return <div><p>cargando...</p></div>

  if (!loading && data) {
    return (
      <>
        <div style={{width: '100%', height: '500px'}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={getFormatedDataByMonths(data)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line name='Monto' type="monotone" dataKey="monto" stroke="#90ee8f" activeDot={{r: 8}}/>
              <Line name='Por pagar' type="monotone" dataKey="por_pagar" stroke="#bc5449" activeDot={{r: 8}}/>
              <Line name='Retencion para pagos' type="monotone" dataKey="retencion" stroke="#81007f"
                    activeDot={{r: 8}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{width: '100%', height: '300px', margin: '3rem 0'}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={getFormattedDataByEntity(data)}>
              <Bar name="Banco Nacional de Crédito (BNC)" dataKey="bnc" fill="#95b3b3"/>
              <Bar name="Banesco Panamá" dataKey="bp" fill="#535e1a"/>
              <Bar name="Banesco Venezuela" dataKey="bv" fill="#f38f49"/>
              <Bar name="Banco Nacional de Terceros" dataKey="bnt" fill="#b06f34"/>
              <Bar name="Oficina Paseo La Granja" dataKey="opg" fill="#fe0001"/>
              <Bar name="Oficina San Carlos" dataKey="osc" fill="#84ace0"/>
              <Bar name="Tesorería" dataKey="t" fill="#56368a"/>
              <Tooltip
                cursor={{fill: 'transparent'}}
                labelFormatter={() => "Cantidad de registros por entidad"}
                labelStyle={{fontWeight: 'bold'}}/>
              <Legend/>
            </BarChart>
          </ResponsiveContainer>
        </div>

      <Box display='flex' alignItems='center' justifyContent='center' flexWrap='wrap'>
        <Box>
          <PieChart width={250} height={300} onMouseEnter={() => {}}>
            <Pie
              data={getFormattedDataByTransactionType(data)}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {getFormattedDataByTransactionType(data).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color}/>
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
          <Typography align='center' variant='h4'>Tipo de transaccion</Typography>
        </Box>
        <Box>
          <PieChart width={250} height={300} onMouseEnter={() => {}}>
            <Pie
              data={getFormattedDataByCurrency(data)}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              label
            >
              {getFormattedDataByCurrency(data).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color}/>
              ))}
            </Pie>
            <Tooltip />
            <Tooltip/>

          </PieChart>
          <Typography align='center' variant='h4'>Tipo de moneda</Typography>

        </Box>
        <Box>
          <PieChart width={250} height={300} onMouseEnter={() => {}}>
            <Pie
              data={getFormattedDataByPaymentType(data)}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {getFormattedDataByPaymentType(data).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color}/>
              ))}
            </Pie>
            <Tooltip/>

          </PieChart>
          <Typography align='center' variant='h4'>Tipo de pago</Typography>

        </Box>
      </Box>


      </>
    )
  }

}
