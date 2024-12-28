import {useEffect, useState} from "react";
import {useAuth} from "@/app/hooks/useAuth";
import {useHeaders} from "@/app/hooks/useHeaders";
import {clientGetAllByUser} from "@/app/api/clientService";
import {DataCard} from "@/app/components/dashboardComponents/DataCard";
import {productGetAllByUser} from "@/app/api/productService";
import {Product} from "@/app/types/product";

export const DataCardProduct = () => {
    const [dailyProductCounts, setDailyProductCounts] = useState<number[]>([]);
    const [monthlyProductCounts, setMonthlyProductCounts] = useState<number[]>([]);
    const [momChanges, setMomChanges] = useState<number[]>([]);
    const [momTrend, setMomTrend] = useState('no change'); // Default to neutral
    const [dayLabels, setDayLabels] = useState<string[]>([]);
    const [monthLabels, setMonthLabels] = useState<string[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [momPercentageChange, setMomPercentageChange] = useState<number>(0);

    const { user } = useAuth();
    const headers = useHeaders();

    useEffect(() => {
        const fetchData = async () => {
            const productsResponse = await productGetAllByUser(user.idUser, headers);
            const products: Product[] = productsResponse.products || [];

            if (products.length > 0) {
                type DailyCounts = { [key: string]: number };
                type MonthlyCounts = { [key: string]: number };

                // Calculate daily product counts
                const dailyCounts: DailyCounts = products.reduce((acc: DailyCounts, product: Product) => {
                    const createdAt = product?.createdAt ? new Date(product.createdAt) : null;
                    if (createdAt && !isNaN(createdAt.getTime())) {
                        const day = createdAt.toISOString().split('T')[0];
                        acc[day] = (acc[day] || 0) + 1;
                    }
                    return acc;
                }, {});

                // Calculate monthly product counts
                const monthlyCounts: MonthlyCounts = products.reduce((acc: MonthlyCounts, product: Product) => {
                    const createdAt = product?.createdAt ? new Date(product.createdAt) : null;
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
                setDailyProductCounts(sortedDays.map(day => dailyCounts[day]));

                // Sort and store monthly counts
                const sortedMonths = Object.keys(monthlyCounts).sort();
                const monthlyProductCountsArray = sortedMonths.map(month => monthlyCounts[month]);
                setMonthLabels(sortedMonths);
                setMonthlyProductCounts(monthlyProductCountsArray);

                // Calculate MoM changes
                const momChangesArray = sortedMonths.map((month, index) => {
                    if (index === 0) return 0; // No change for the first month
                    const currentCount = monthlyProductCountsArray[index];
                    const previousCount = monthlyProductCountsArray[index - 1];
                    return previousCount === 0
                        ? currentCount > 0 ? 100 : 0
                        : parseFloat(
                            (((currentCount - previousCount) / previousCount) * 100).toFixed(2)
                        );
                });
                setMomChanges(momChangesArray);

                // Set total products
                setTotalProducts(monthlyProductCountsArray[monthlyProductCountsArray.length - 1] || 0);

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
            dailyCounts={dailyProductCounts}
            monthlyCounts={monthlyProductCounts}
            dayLabels={dayLabels}
            momChanges={momChanges}
            name={"Products"}
            number={totalProducts}
            percentage={momPercentageChange}
        />
    );
};
