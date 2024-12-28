import {BarChart } from "@/app/components/dashboardComponents/charts/BarChart";
import {useAuth} from "@/app/hooks/useAuth";
import {useHeaders} from "@/app/hooks/useHeaders";
import {useEffect, useState} from "react";
import {invoiceGetAllByUser} from "@/app/api/invoiceService";

export const InvoiceTotalBar = () => {
    const { user } = useAuth();
    const headers = useHeaders();
    const [momTrend, setMomTrend] = useState('no change'); // Default to neutral
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0); // Store as a number
    const [momPercentageChange, setMomPercentageChange] = useState(0);
    const [monthlyTotals, setMonthlyTotals] = useState<number[]>(Array(12).fill(0)); // Initialize with zeros

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

                // Initialize monthly counts
                const monthlyCounts = Array(12).fill({ count: 0, totalPrice: 0 }).map(() => ({
                    count: 0,
                    totalPrice: 0,
                }));

                // Populate monthly counts
                filteredInvoices.forEach(invoice => {
                    const createdAt = invoice?.createdAt ? new Date(invoice.createdAt) : null;
                    if (createdAt && !isNaN(createdAt.getTime())) {
                        const month = createdAt.getMonth(); // 0-11
                        monthlyCounts[month].count += 1;
                        monthlyCounts[month].totalPrice += Number(invoice.totalPrice || 0);
                    }
                });

                const monthlyInvoiceCounts = monthlyCounts.map(m => m.count);
                const monthlyInvoiceTotalPrices = monthlyCounts.map(m => m.totalPrice);
                const momChanges: number[] = [];

                // Calculate MoM changes
                monthlyInvoiceCounts.forEach((currentCount, i) => {
                    if (i > 0) {
                        const previousCount = monthlyInvoiceCounts[i - 1];
                        const change = previousCount === 0
                            ? (currentCount > 0 ? 100 : 0)
                            : parseFloat(((currentCount - previousCount) / previousCount * 100).toFixed(2));
                        momChanges.push(change);
                    } else {
                        momChanges.push(0); // No change for the first month
                    }
                });

                // Set totals and trends
                const lastMonthTotalInvoices = monthlyInvoiceCounts[monthlyInvoiceCounts.length - 1] || 0;
                const lastMomChange = momChanges[momChanges.length - 1] || 0;
                const totalPriceSum = monthlyInvoiceTotalPrices.reduce((acc, price) => acc + price, 0);

                setTotalInvoices(lastMonthTotalInvoices);
                setMomPercentageChange(lastMomChange);
                setTotalPrice(totalPriceSum);
                setMonthlyTotals(monthlyInvoiceTotalPrices);

                // Determine trend
                if (momChanges.length > 1) {
                    const secondLastMomChange = momChanges[momChanges.length - 2];
                    if (lastMomChange > secondLastMomChange) {
                        setMomTrend('increase');
                    } else if (lastMomChange < secondLastMomChange) {
                        setMomTrend('decrease');
                    } else {
                        setMomTrend('no change');
                    }
                }
            }
        };

        fetchData();
    }, [user, headers]);

    return (
        <div>
            <BarChart monthlyTotals={monthlyTotals} />
        </div>
    );
};

