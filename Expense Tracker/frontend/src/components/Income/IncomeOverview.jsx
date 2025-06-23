import { LuPlus } from "react-icons/lu"
import CustomBarChart from "@/components/Charts/CustomBarChart"
import { useState, useEffect } from "react"
import { prepareExpenseBarChartData } from "@/utils/helper"
const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [charData, setCharData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setCharData(result)
        return () => { }
    }, [transactions])
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg"></LuPlus>
                    Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomBarChart data={charData}>

                </CustomBarChart>
            </div>

        </div>
    )
}

export default IncomeOverview