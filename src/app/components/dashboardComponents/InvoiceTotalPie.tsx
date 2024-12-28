import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {useAuth} from "@/app/hooks/useAuth";
import {useHeaders} from "@/app/hooks/useHeaders";
import {invoiceGetAllByUser} from "@/app/api/invoiceService";
import {PieChart} from "@/app/components/dashboardComponents/charts/PieChart"; // Import Pie chart

export const InvoiceTotalPie = () => {
    const { user } = useAuth();
    const headers = useHeaders();
    const [monthlyTotals, setMonthlyTotals] = useState(Array(12).fill(0));
    const [currentMonthPaidCount, setCurrentMonthPaidCount] = useState(0);
    const [currentMonthUnpaidCount, setCurrentMonthUnpaidCount] = useState(0);
    const [overdueUnpaidCount, setOverdueUnpaidCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const invoicesResponse = await invoiceGetAllByUser(user.idUser, headers);
                const invoices = invoicesResponse.invoices;

                if (invoices) {
                    const currentMonth = new Date().getMonth(); // Current month (0-11)
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1); // Tomorrow's date for overdue calculation

                    // Filter invoices for the current month
                    const currentMonthInvoices = invoices.filter(invoice => {
                        const createdAt = invoice?.createdAt ? new Date(invoice.createdAt) : null;
                        return createdAt && createdAt.getMonth() === currentMonth; // Check if in current month
                    });

                    // Separate paid and unpaid invoices
                    const paidInvoices = currentMonthInvoices.filter(invoice => invoice.paymentStatus === 'paid');
                    const unpaidInvoices = currentMonthInvoices.filter(invoice => invoice.paymentStatus !== 'paid');

                    // Calculate counts
                    setCurrentMonthPaidCount(paidInvoices.length);
                    setCurrentMonthUnpaidCount(unpaidInvoices.length);

                    // Calculate overdue unpaid invoices
                    const overdueInvoices = unpaidInvoices.filter(invoice => {
                        const dueDatePayment = invoice?.dueDatePayment ? new Date(invoice.dueDatePayment) : null;
                        return dueDatePayment && dueDatePayment < tomorrow; // Overdue if earlier than tomorrow
                    });

                    setOverdueUnpaidCount(overdueInvoices.length);

                    // Calculate monthly totals
                    const monthlyCounts = invoices.reduce((acc, invoice) => {
                        const createdAt = invoice?.createdAt ? new Date(invoice.createdAt) : null;
                        if (createdAt) {
                            const month = createdAt.getMonth(); // 0-11
                            acc[month] = acc[month] || { count: 0, totalPrice: 0 };
                            acc[month].count += 1;
                            acc[month].totalPrice += Number(invoice.totalPrice || 0); // Ensure totalPrice is numeric
                        }
                        return acc;
                    }, Array(12).fill(null).map(() => ({ count: 0, totalPrice: 0 })));

                    const monthlyInvoiceTotalPrices = monthlyCounts.map(month => month.totalPrice);
                    setMonthlyTotals(monthlyInvoiceTotalPrices);
                }
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        fetchData();
    }, [user, headers]);

    return (
        <div className="invoice-total-pie">
            {/* Paid vs. Unpaid Pie Chart */}
            <div className="border-2 border-gray-400 p-5 rounded-2xl mb-5">
                <div className="w-[60%] m-auto">
                    <PieChart
                        title="Paid vs Unpaid"
                        labels={['Paid', 'Unpaid']}
                        data={[currentMonthPaidCount, currentMonthUnpaidCount]}
                    />
                </div>
            </div>
            {/* Overdue Pie Chart */}
            <div className="border-2 border-gray-400 p-5 rounded-2xl">
                <div className="w-[60%] m-auto">
                    <PieChart
                        title="Overdue"
                        labels={['Unpaid Invoices']}
                        data={[currentMonthUnpaidCount, overdueUnpaidCount]}
                    />
                </div>
            </div>
        </div>
    );
};