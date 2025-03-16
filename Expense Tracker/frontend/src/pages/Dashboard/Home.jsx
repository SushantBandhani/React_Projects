import react, { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { useUserAuth } from '@/hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '@/utils/apiPaths';
import InfoCard from '@/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io"
import { addThousandsSeperator } from '@/utils/helper';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';
import FinanceOverview from '@/components/Dashboard/FinanceOverview';
import axiosInstance from '@/utils/axiosinstance';
import ExpenseTransactions from '@/components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '@/components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '@/components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '@/components/Dashboard/RecentIncome';
const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setdashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
            if (response.data) {
                setdashboardData(response.data);
            }
        }
        catch (error) {
            console.log("Something went wrong. Please try again later", error)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return () => {

        }
    }, [])

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard icon={<IoMdCard className="text-amber-50" />} label="Total Balance" value={addThousandsSeperator(dashboardData?.totalBalance || 0)} color="bg-violet-500"></InfoCard>
                    <InfoCard icon={<LuWalletMinimal className="text-amber-50" />} label="Total Income" value={addThousandsSeperator(dashboardData?.totalIncome || 0)} color="bg-orange-500"></InfoCard>
                    <InfoCard icon={<LuHandCoins className="text-amber-50" />} label="Total Expense" value={addThousandsSeperator(dashboardData?.totalExpenses || 0)} color="bg-red-500"></InfoCard>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions transactions={dashboardData?.recentTransactions}
                        onSeeMore={() => {
                            navigate("/expense")
                        }}>
                    </RecentTransactions>
                    <FinanceOverview
                        totalBalnce={dashboardData?.totalBalnce || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    ></FinanceOverview>

                    <ExpenseTransactions
                        transations={dashboardData?.last30DaysExpenses?.transations || []}
                        onSeeMore={() => {
                            navigate("/expense")
                        }}
                    />
                    <Last30DaysExpenses data={dashboardData?.last30DaysExpenses?.transactions || []}></Last30DaysExpenses>

                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
                        totalIncome={dashboardData?.totalIncome || 0}
                    ></RecentIncomeWithChart>

                    <RecentIncome
                        transactions={dashboardData?.recentTransactions || []}
                        onSeeMore={() => navigate("/income")}
                    ></RecentIncome>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Home