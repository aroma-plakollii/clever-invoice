import React from 'react';
import { Pie } from 'react-chartjs-2'; // Ensure this is the correct import based on your setup
import { ChartData, DefaultDataPoint } from 'chart.js'; // Adjust the import based on your Chart.js version
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartOptions
} from 'chart.js'; // Import required elements from chart.js

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
    labels: string[];
    data: number[];
    title: string;
}

export const PieChart = (props: PieChartProps) => {
    const pieData = {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor: [`${props.title === 'Paid' ? '#69b8d6' : '#da5c9d'}`, `${props.title === 'Paid' ? '#5c5f92' : '#4b81bf'}`],
                borderColor: 'white',
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'start',
                labels: {
                    color: 'black',
                },
            },
            // title: {
            //     display: true,
            //     text: props.title,
            // },
        },
        layout: {
            padding: {
                // right: 50,
            },
        },
    };

    return <Pie data={pieData} options={options} />;
};