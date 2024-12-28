import {useEffect, useState} from "react";
import {useAuth} from "@/app/hooks/useAuth";
import {useHeaders} from "@/app/hooks/useHeaders";
import {productGetAllByUser} from "@/app/api/productService";
import {DataCard} from "@/app/components/dashboardComponents/DataCard";
import {invoiceGetAllByUser, invoiceGetAllByUserPaged} from "@/app/api/invoiceService";
import {Invoice} from "@/app/types/invoice";

export const DataCardInvoice = () => {
    const [dailyInvoiceCounts, setDailyInvoiceCounts] = useState<number[]>([]);
    const [monthlyInvoiceCounts, setMonthlyInvoiceCounts] = useState<number[]>([]);
    const [momChanges, setMomChanges] = useState<number[]>([]);
    const [momTrend, setMomTrend] = useState('no change'); // Default to neutral
    const [dayLabels, setDayLabels] = useState<string[]>([]);
    const [monthLabels, setMonthLabels] = useState<string[]>([]);
    const [totalInvoices, setTotalInvoices] = useState<number>(0);
    const [momPercentageChange, setMomPercentageChange] = useState<number>(0);

    const { user } = useAuth();
    const headers = useHeaders();

    useEffect(() => {
        const fetchData = async () => {
            const invoicesResponse = await invoiceGetAllByUser(user.idUser, headers);
            const invoices: Invoice[] = invoicesResponse.invoices || [];

            if (invoices.length > 0) {
                type DailyCounts = { [key: string]: number };
                type MonthlyCounts = { [key: string]: number };

                // Calculate daily invoice counts
                const dailyCounts: DailyCounts = invoices.reduce((acc: DailyCounts, invoice: Invoice) => {
                    const createdAt = invoice?.createdAt ? new Date(invoice.createdAt) : null;
                    if (createdAt && !isNaN(createdAt.getTime())) {
                        const day = createdAt.toISOString().split('T')[0];
                        acc[day] = (acc[day] || 0) + 1;
                    }
                    return acc;
                }, {});

                // Calculate monthly invoice counts
                const monthlyCounts: MonthlyCounts = invoices.reduce((acc: MonthlyCounts, invoice: Invoice) => {
                    const createdAt = invoice?.createdAt ? new Date(invoice.createdAt) : null;
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
                setDailyInvoiceCounts(sortedDays.map(day => dailyCounts[day]));

                // Sort and store monthly counts
                const sortedMonths = Object.keys(monthlyCounts).sort();
                const monthlyInvoiceCountsArray = sortedMonths.map(month => monthlyCounts[month]);
                setMonthLabels(sortedMonths);
                setMonthlyInvoiceCounts(monthlyInvoiceCountsArray);

                // Calculate MoM changes
                const momChangesArray = sortedMonths.map((month, index) => {
                    if (index === 0) return 0; // No change for the first month
                    const currentCount = monthlyInvoiceCountsArray[index];
                    const previousCount = monthlyInvoiceCountsArray[index - 1];
                    return previousCount === 0
                        ? currentCount > 0 ? 100 : 0
                        : parseFloat(
                            (((currentCount - previousCount) / previousCount) * 100).toFixed(2)
                        );
                });
                setMomChanges(momChangesArray);

                // Set total invoices
                setTotalInvoices(monthlyInvoiceCountsArray[monthlyInvoiceCountsArray.length - 1] || 0);

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
            dailyCounts={dailyInvoiceCounts}
            monthlyCounts={monthlyInvoiceCounts}
            dayLabels={dayLabels}
            momChanges={momChanges}
            name={"Invoices"}
            number={totalInvoices}
            percentage={momPercentageChange}
        />
    );
};
