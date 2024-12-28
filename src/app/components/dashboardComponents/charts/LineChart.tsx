'use client';
import { Line } from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    name: any;
    dayLabels: any;
    dailyCounts: any;
    monthlyCounts: any;
    momChanges: any;
}

export const LineChart = (props: LineChartProps) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
            {
                data: [],
                borderColor: 'rgba(192, 75, 75, 1)',
                backgroundColor: 'rgba(192, 75, 75, 0.2)',
                yAxisID: 'y-axis-2',
                fill: false,
            },
        ],
    });

    useEffect(() => {
        const fetchData = () => {
            setChartData({
                labels: props.dayLabels,
                datasets: [
                    {
                        data: props.dailyCounts,
                        borderColor: '#16a34a',
                        backgroundColor: '#14532d',
                        fill: false,
                        // tension: 0.1,
                    },
                    {
                        data: props.monthlyCounts,
                        borderColor: '#69b7d9',
                        backgroundColor: 'rgba(192, 75, 75, 0.2)',
                        fill: false,
                        // tension: 0.1,
                        yAxisID: 'y-axis-2',
                    },
                    // {
                    //     label: 'MoM Change (%)',
                    //     data: props.momChanges,
                    //     borderColor: 'rgba(255, 159, 64, 1)',
                    //     backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    //     fill: false,
                    //     tension: 0.1,
                    //     yAxisID: 'y-axis-3',
                    // },
                ],
            })
        }

        fetchData();
    }, [props.dailyCounts, props.dayLabels, props.monthlyCounts]);

    return (
        <Line
            data={chartData}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                    title: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        display: false, // Hides the x-axis
                        grid: {
                            display: false, // Hides the x-axis grid lines
                        },
                    },
                    y: {
                        beginAtZero: true,
                        display: false, // Hides the y-axis
                        grid: {
                            display: false, // Hides the y-axis grid lines
                        },
                    },
                    'y-axis-2': {
                        type: 'linear',
                        position: 'right',
                        display: false, // Hides the y-axis on the right
                        grid: {
                            display: false, // Hides the y-axis grid lines on the right
                        },
                    },
                },
                elements: {
                    line: {
                        tension: 0.4,
                    },
                    point: {
                        radius: 0,
                    },
                },
            }}
        />
    );
};