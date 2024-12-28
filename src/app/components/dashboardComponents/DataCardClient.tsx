'use client';
import {useAuth} from "@/app/hooks/useAuth";
import {useHeaders} from "@/app/hooks/useHeaders";
import {useEffect, useState} from "react";
import {Client} from "@/app/types/clients";
import {clientGetAllByUser} from "@/app/api/clientService";
import {DataCard} from "@/app/components/dashboardComponents/DataCard";

export const DataCardClient = () => {
    const [dailyClientCounts, setDailyClientCounts] = useState<number[]>([]);
    const [monthlyClientCounts, setMonthlyClientCounts] = useState<number[]>([]);
    const [momChanges, setMomChanges] = useState<number[]>([]);
    const [momTrend, setMomTrend] = useState('no change'); // Default to neutral
    const [dayLabels, setDayLabels] = useState<string[]>([]);
    const [totalClients, setTotalClients] = useState<number>(0);
    const [momPercentageChange, setMomPercentageChange] = useState<number>(0);

    const { user } = useAuth();
    const headers = useHeaders();

    useEffect(() => {
        const fetchData = async () => {
            const clientsResponse = await clientGetAllByUser(user.idUser, headers);
            const clients: Client[] = clientsResponse.clients;

            if (clients) {
                // Define types for the accumulator objects
                type DailyCounts = { [key: string]: number };
                type MonthlyCounts = { [key: string]: number };

                // Calculate daily client counts
                const dailyCounts: DailyCounts = clients.reduce((acc: DailyCounts, client: Client) => {
                    const createdAt = client?.createdAt ? new Date(client.createdAt) : null;
                    if (createdAt && !isNaN(createdAt.getTime())) {
                        const day = createdAt.toISOString().split('T')[0];
                        acc[day] = (acc[day] || 0) + 1;
                    }
                    return acc;
                }, {});

                // Calculate monthly client counts
                const monthlyCounts: MonthlyCounts = clients.reduce((acc: MonthlyCounts, client: Client) => {
                    const createdAt = client?.createdAt ? new Date(client.createdAt) : null;
                    if (createdAt && !isNaN(createdAt.getTime())) {
                        const month = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}`;
                        acc[month] = (acc[month] || 0) + 1;
                    }
                    return acc;
                }, {});

                // Sort and store daily counts
                const sortedDays = Object.keys(dailyCounts).sort();
                setDayLabels(sortedDays);
                setDailyClientCounts(sortedDays.map(day => dailyCounts[day]));

                // Sort and store monthly counts
                const sortedMonths = Object.keys(monthlyCounts).sort();
                const monthlyClientCountsArray = sortedMonths.map(month => monthlyCounts[month]);
                setMonthlyClientCounts(monthlyClientCountsArray);

                // Calculate MoM changes
                const momChangesArray = sortedMonths.map((month, index) => {
                    if (index === 0) return 0; // No change for the first month
                    const currentCount = monthlyClientCountsArray[index];
                    const previousCount = monthlyClientCountsArray[index - 1];
                    return previousCount === 0
                        ? currentCount > 0 ? 100 : 0
                        : parseFloat(
                            (((currentCount - previousCount) / previousCount) * 100).toFixed(2)
                        );
                });
                setMomChanges(momChangesArray);

                // Set total clients
                setTotalClients(monthlyClientCountsArray[monthlyClientCountsArray.length - 1] || 0);

                // Set MoM percentage change
                const lastMomChange = momChangesArray[momChangesArray.length - 1] || 0;
                setMomPercentageChange(lastMomChange);

                // Determine MoM trend
                if (momChangesArray.length > 1) {
                    const secondLastMomChange = momChangesArray[momChangesArray.length - 2];
                    if (lastMomChange > secondLastMomChange) {
                        setMomTrend('increase');
                    } else if (lastMomChange < secondLastMomChange) {
                        setMomTrend('decrease');
                    } else {
                        setMomTrend('no change'); // Explicitly handle 0% as neutral
                    }
                }
            }
        };

        fetchData();
    }, [user, headers]);

    return (
        <DataCard
            momTrend={momTrend}
            dailyCounts={dailyClientCounts}
            monthlyCounts={monthlyClientCounts}
            dayLabels={dayLabels}
            momChanges={momChanges}
            name={"Clients"}
            number={totalClients}
            percentage={momPercentageChange}
        />
    );
};