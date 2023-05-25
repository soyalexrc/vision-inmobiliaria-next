import {AdminLayout} from "../../../../../components/layouts";
import {Box, MenuItem, Select, Typography} from "@mui/material";
import NextLink from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React from "react";
import {axiosInstance} from "../../../../../utils";
import {FormatCashFlow} from "../../../../../interfaces";
import {useSnackbar} from "notistack";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'



const colors: any = {
    'Banco Nacional de Crédito (BNC)': '#2e7bbc',
    'Banesco Panamá': '#36752a',
    'Banesco Venezuela': '#2a1bc1',
    'Banco Nacional de Terceros': '#c00435',
    'Oficina Paseo La Granja': '#d9a2c7',
    'Oficina San Carlos': '#914b34',
    'Tesorería': '#fe6e6c',
    'Ingreso a cuenta de terceros': '#1bbdf7'
};


export default function ResumenDeOperacionesPage() {
    const [formatData, setFormatData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const {enqueueSnackbar} = useSnackbar();
    const [dataSet, setDataSet] = React.useState<any>([]);
    const [options, setOptions] = React.useState<any>({})
    const [currency, setCurrency] = React.useState<string>('bs');



    async function getFormatsData() {
        try {
            setLoading(true);
            const response = await axiosInstance.get('format/cashFlow/getAllData');
            if (response.status === 200) {
                const dataObj = {

                }
                setFormatData(response.data);
                const grouped = Array.from(groupBy(response.data, (format: FormatCashFlow) => format.entity))
                    .map((element: any, index) => {
                        return [
                            element[0],
                            sumTotals(element[1]),
                            colors[element[0]]
                        ]
                    })

                setFormatData(grouped);
                setChartData(grouped, currency);



            }
        } catch (err) {
            enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
        } finally {
            setLoading(false);
        }
    }

    function setChartData(data = formatData, currency: string) {
        setOptions({
            title: {
                text: ''
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    colorByPoint: true,
                    type: 'pie',
                    size: '100%',
                    innerSize: '80%',
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        crop: false,
                        distance: '-10%',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '16px'
                        },
                        connectorWidth: 0
                    }
                }
            },
            series: [
                {
                    colorByPoint: true,
                    type: 'pie',
                    name: currency,
                    data: getDataByCurrency(data, currency),
                }
            ],
            // legend: {
            //     enabled: false
            // },
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' TWh'
            },
        })
    }

    function getDataByCurrency(data: any[], currency: string) {
        return data.map((el: any) => {
            return {
                name: el[0],
                y: el[1][currency],
                color: el[2]
            }
        })
    }

    function sumTotals(data: any[]) {
        let totalBs = 0;
        let totalEUR = 0;
        let totalUSD = 0;
        data.forEach((x: any) => {
            if (x.currency === 'Bs') totalBs += Number(x.amount);
            if (x.currency === '$') totalUSD += Number(x.amount);
            if (x.currency === '€') totalEUR += Number(x.amount);
        })
        return {bs: totalBs, usd: totalUSD, eur: totalEUR};
    }
    function groupBy(list: any[], keyGetter: any) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    function handleChangeCurrency(event: any) {
        setCurrency(event.target.value)
        setChartData(formatData, event.target.value);
    }


        React.useEffect(() => {
            getFormatsData()
        }, [])


    return (
        <AdminLayout title='Formato de flujo de caja | Vision inmobiliaria'>
            <Box>
                <Box display='flex' alignItems='center'>
                    <NextLink href='/admin/formatos/flujo-de-caja'>Flujo de caja</NextLink>
                    <ArrowRightIcon sx={{ color: 'gray' }} />
                    <Typography> Resumen de operaciones</Typography>
                </Box>
                <Select
                    value={currency}
                    onChange={handleChangeCurrency}
                >
                    <MenuItem value='bs'>bs</MenuItem>
                    <MenuItem value='usd'>$ usd</MenuItem>
                    <MenuItem value='eur'>€ eur</MenuItem>
                </Select>
                {/*<Typography variant='h1' align='center'>Grafico</Typography>*/}
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />

            </Box>
        </AdminLayout>
    )
}
