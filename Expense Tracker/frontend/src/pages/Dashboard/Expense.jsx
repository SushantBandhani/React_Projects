import react from 'react'
import { useUserAuth } from '@/hooks/useUserAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { API_PATHS } from '@/utils/apiPaths';
import ExpenseOverview from '@/components/Expense/ExpenseOverview';
import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import AddExpenseForm from '@/components/Expense/AddExpenseForm';
import axiosInstance from '@/utils/axiosinstance';
import toast from 'react-hot-toast';
import ExpenseList from '@/components/Expense/ExpenseList';
import DeleteAlert from '@/components/layouts/DeleteAlert';

const Expense = () => {
    useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    })
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

    // Get all Expense details
    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_Expense}`)

            if (response.data) {
                setExpenseData(response.data)
            }

        }
        catch (error) {
            console.log("Something went wrong. Please try again", error);
        }
        finally {
            setLoading(false);
        }
    }

    //Handle Add Expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        //Validation Checks
        if (!category.trim()) {
            toast.error("Category is Required")
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.0")
            return;
        }

        if (!date) {
            toast.error("Date is required")
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_Expense, {
                category,
                amount,
                date,
                icon
            })
            setOpenAddExpenseModal(false)
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        }
        catch (error) {
            console.error("Error adding expense: ", error.response?.data?.message || error.message)
        }

    }

    //Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_Expense(id));
            setOpenDeleteAlert({ show: false, date: null })
            toast.success("Expense details deleted successfully")
            fetchExpenseDetails();
        }
        catch (error) {
            console.error("Error deleting expense",
                error.response?.data?.message || error.message
            )
        }
    }

    // handle download and expense details
    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_Expense, {
                responseType: "blob"
            });

            // Create a URL for the blob
            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");

            document.body.appendChild(link);
            link.click();
            link.remove();

            // Revoke URL after a short delay to ensure proper download
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            console.error("Error downloading the expense details: ", error);
            toast.error("Failed to download expense details. Please try again.");
        }
    };




    useEffect(() => {
        fetchExpenseDetails();
        return () => {

        }
    }, [])

    // useUserAuth();
    return (
        <DashboardLayout activeMenu={"Expense"}>
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <ExpenseOverview
                        transactions={expenseData}
                        onExpenseIncome={() => setOpenAddExpenseModal(true)}
                    />
                </div>

                <ExpenseList
                    transactions={expenseData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({ show: true, data: id })
                    }}
                    onDownload={handleDownloadExpenseDetails}
                ></ExpenseList>


            </div>

            <Modal
                isOpen={openAddExpenseModal}
                onClose={() => {
                    setOpenAddExpenseModal(false)
                    title = "Add Expense"
                }}
            >
                <AddExpenseForm
                    onAddExpense={handleAddExpense}
                />


            </Modal>

            <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({ show: false, date: null })}
                title="Delete Expense"
            >
                <DeleteAlert
                    content="Are you sure you want to delete this expense detail?"
                    onDelete={() => deleteExpense(openDeleteAlert.data)}
                ></DeleteAlert>
            </Modal>


        </DashboardLayout>
    )
}

export default Expense