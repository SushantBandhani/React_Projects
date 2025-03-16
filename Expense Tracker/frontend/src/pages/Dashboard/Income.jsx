import DashboardLayout from '@/components/layouts/DashboardLayout'
import IncomeOverview from '@/components/Income/IncomeOverview'
import { useState,useEffect } from 'react';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosinstance';
import Modal from '@/components/Modal';
import AddIncomeForm from '@/components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '@/components/Income/IncomeList';
import DeleteAlert from '@/components/layouts/DeleteAlert';
import { useUserAuth } from '@/hooks/useUserAuth';

const Income=()=>{
    useUserAuth();
    const [incomeData,setIncomeData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
        show:false,
        data:null
    })
    const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false)

    // Get all income details
    const fetchIncomeDetails=async()=>{
        if(loading) return;
        setLoading(true);

        try{
            const response=await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

            if(response.data){
                setIncomeData(response.data)
            }

        }
        catch(error){
            console.log("Something went wrong. Please try again",error);
        }
        finally{
            setLoading(false);
        }
    }

    //Handle Add Income
    const handleAddIncome=async(income)=>{
        const{source,amount,date,icon}=income;

        //Validation Checks
        if(!source.trim()){
            toast.error("Source is Required")
            return;
        }
        if(!amount || isNaN(amount) || Number(amount)<=0){
            toast.error("Amount should be a valid number greater than 0.0")
            return;
        }

        if(!date){
            toast.error("Date is required")
            return;
        }

        try{
            console.log("Inside try")
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
                source,
                amount,
                date,
                icon
            })
            setOpenAddIncomeModal(false)
            toast.success("Income added successfully");
            fetchIncomeDetails();
        }
        catch(error){
            console.log("Inside catch")
            console.error("Error adding income: ",error.response?.data?.message || error.message)
        }

    }

    //Delete Income
    const deleteIncome=async(id)=>{
        try{
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({show:false,data:null})
            toast.success("Income details deleted successfully")
            fetchIncomeDetails();
        }
        catch(error){
            console.error("Error deleting income",
                error.response?.data?.message || error.message
            )
        }
    }

    // handle download and income details
    const handleDownloadIncomeDetails=async()=>{
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: "blob"
            });
    
            // Create a URL for the blob
            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income_details.xlsx");
    
            document.body.appendChild(link);
            link.click();
            link.remove();
    
            // Revoke URL after a short delay to ensure proper download
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            console.error("Error downloading the income details: ", error);
            toast.error("Failed to download income details. Please try again.");
        }

    }

    useEffect(()=>{
        fetchIncomeDetails();
        return ()=>{};
    },[])

    return (
        <DashboardLayout activeMenu={"Income"}>
            <div className='my-5 mx-auto'>
                <div className="grid grid-cols-1 gap-6">
                    <div className=''>
                        {console.log("dcjhsdgsdjcsdjh")}
                       <IncomeOverview transactions={incomeData}
                       onAddIncome={()=>setOpenAddIncomeModal(true)}
                       >
                        </IncomeOverview> 
                    </div>

                    <IncomeList 
                    transactions={incomeData}
                    onDelete={(id)=>{
                        setOpenDeleteAlert({show:true,data:id});
                    }}
                    onDownload={handleDownloadIncomeDetails}
                    />

                </div>
                <Modal
                isOpen={openAddIncomeModal}
                onClose={()=>setOpenAddIncomeModal(false)}
                title="Add Income"
                >
            <AddIncomeForm onAddIncome={handleAddIncome} />   
            </Modal>

            
            <Modal
                isOpen={openDeleteAlert.show}
                onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                title="Delete Income"
                >
                    <DeleteAlert
                    content="Are you sure you want to delete this income detail?"
                    onDelete={()=>deleteIncome(openDeleteAlert.data)}
                    ></DeleteAlert>
            </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Income