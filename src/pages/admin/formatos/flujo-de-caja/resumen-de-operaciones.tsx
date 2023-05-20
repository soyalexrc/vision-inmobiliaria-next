import {AdminLayout} from "../../../../../components/layouts";
import {Box, Typography} from "@mui/material";
import NextLink from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React from "react";
import {axiosInstance} from "../../../../../utils";
import {FormatCashFlow} from "../../../../../interfaces";
import {useSnackbar} from "notistack";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

const startYear = 1965,
    endYear = 2020,
    nbr = 6;



export default function ResumenDeOperacionesPage() {
    const [formatData, setFormatData] = React.useState<FormatCashFlow[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const {enqueueSnackbar} = useSnackbar();
    const [dataSet, setDataSet] = React.useState<any>([]);
    const [options, setOptions] = React.useState<any>({})



    function getData(year: any, data: any[]) {
        const output = Object.entries(data).map((country: any) => {
            const [countryName, countryData] = country;
            return [countryName, Number(countryData[year])];
        });
        return [output[0], output.slice(1, nbr)];
    }

    async function fetchContent() {
        const data = await fetch(
            'https://cdn.jsdelivr.net/gh/highcharts/highcharts@88f2067/samples/data/nuclear-energy-production.json'
        );

        const json = await data.json();




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
            colors: ['#e8dc32', '#f4774f', '#ef4527', '#39c1fa', '#BCE29E'],
            series: [
                {
                    type: 'pie',
                    name: startYear,
                    data: getData(startYear, json)[1]
                }
            ],
            legend: {
                enabled: false
            },
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' TWh'
            },
        })

    }

    async function getFormatsData() {
        try {
            setLoading(true);
            const response = await axiosInstance.get('format/cashFlow/getAllData');
            if (response.status === 200) {
                const dataObj = {

                }
                console.log(response.data);
                setFormatData(response.data);
            }
        } catch (err) {
            enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
        } finally {
            setLoading(false);
        }
    }


        React.useEffect(() => {
            getFormatsData()
            fetchContent()
        }, [])

    return (
        <AdminLayout title='Formato de flujo de caja | Vision inmobiliaria'>
            <Box>
                <Box display='flex' alignItems='center'>
                    <NextLink href='/admin/formatos/flujo-de-caja'>Flujo de caja</NextLink>
                    <ArrowRightIcon sx={{ color: 'gray' }} />
                    <Typography> Resumen de operaciones</Typography>
                </Box>
                <Typography variant='h1' align='center'>Grafico</Typography>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />

            </Box>
        </AdminLayout>
    )
}
