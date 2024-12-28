import {useEffect, useState} from "react";
import {useAuth} from "@/app/hooks/useAuth";
import {useHeaders} from "@/app/hooks/useHeaders";
import {productGetAllByUser} from "@/app/api/productService";
import {DataCard} from "@/app/components/dashboardComponents/DataCard";
import {invoiceGetAllByUser, invoiceGetAllByUserPaged} from "@/app/api/invoiceService";

interface DailyMonthlyCounts {
    [key: string]: {
        count: number;
        totalPrice: number;
    };
}

export const DataCardTotal = () => {
    const [dailyInvoiceCounts, setDailyInvoiceCounts] = useState<number[]>([]);
    const [monthlyInvoiceCounts, setMonthlyInvoiceCounts] = useState<number[]>([]);
    const [dailyInvoiceTotalPrices, setDailyInvoiceTotalPrices] = useState<number[]>([]);
    const [monthlyInvoiceTotalPrices, setMonthlyInvoiceTotalPrices] = useState<number[]>([]);
    const [momChanges, setMomChanges] = useState<number[]>([]);
    const [momTrend, setMomTrend] = useState('no change'); // Default to neutral
    const [dayLabels, setDayLabels] = useState<string[]>([]);
    const [monthLabels, setMonthLabels] = useState<string[]>([]);
    const [totalInvoices, setTotalInvoices] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0); // Store as a number
    const [momPercentageChange, setMomPercentageChange] = useState<number>(0);

    const { user } = useAuth();
    const headers = useHeaders();

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    useEffect(() => {
        const fetchData = async () => {
            const invoicesResponse = await invoiceGetAllByUser(user.idUser, headers);
            const invoices = invoicesResponse.invoices || [];

            if (invoices.length > 0) {
                const filteredInvoices = invoices.filter(invoice => invoice.paymentStatus === 'paid');

                // Calculate daily counts and total prices
                const dailyCounts: DailyMonthlyCounts = filteredInvoices.reduce((acc: DailyMonthlyCounts, invoice) => {
                    const createdAt = invoice?.createdAt ? new Date(invoice.createdAt) : null;
                    if (createdAt && !isNaN(createdAt.getTime())) {
                        const day = createdAt.toISOString().split('T')[0];
                        acc[day] = acc[day] || { count: 0, totalPrice: 0 };
                        acc[day].count += 1;
                        acc[day].totalPrice += parseFloat(invoice.totalPrice?.toString() || '0');
                    }
                    return acc;
                }, {});

                // Calculate monthly counts and total prices
                const monthlyCounts: DailyMonthlyCounts = filteredInvoices.reduce((acc: DailyMonthlyCounts, invoice) => {
                    const createdAt = invoice?.createdAt ? new Date(invoice.createdAt) : null;
                    if (createdAt && !isNaN(createdAt.getTime())) {
                        const month = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}`;
                        acc[month] = acc[month] || { count: 0, totalPrice: 0 };
                        acc[month].count += 1;
                        acc[month].totalPrice += parseFloat(invoice.totalPrice?.toString() || '0');
                    }
                    return acc;
                }, {});

                // Sort daily counts
                const sortedDays = Object.keys(dailyCounts).sort();
                setDayLabels(sortedDays);
                setDailyInvoiceCounts(sortedDays.map(day => dailyCounts[day].count));
                setDailyInvoiceTotalPrices(sortedDays.map(day => dailyCounts[day].totalPrice));

                // Sort monthly counts
                const sortedMonths = Object.keys(monthlyCounts).sort();
                const monthlyInvoiceCountsArray = sortedMonths.map(month => monthlyCounts[month].count);
                const monthlyInvoiceTotalPricesArray = sortedMonths.map(month => monthlyCounts[month].totalPrice);

                setMonthLabels(sortedMonths);
                setMonthlyInvoiceCounts(monthlyInvoiceCountsArray);
                setMonthlyInvoiceTotalPrices(monthlyInvoiceTotalPricesArray);

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

                // Set total invoices and total prices
                setTotalInvoices(monthlyInvoiceCountsArray[monthlyInvoiceCountsArray.length - 1] || 0);
                const totalPriceSum = monthlyInvoiceTotalPricesArray.reduce((acc, price) => acc + price, 0);
                setTotalPrice(totalPriceSum);

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
            name={"Amount"}
            number={formatNumber(totalPrice)}
            percentage={momPercentageChange}
        />
    );
};