export const BASE_URL="http://localhost:8000"

//Api paths

export const API_PATHS={
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_ID:"/api/v1/auth/getUser",
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard"
    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        GET_ALL_INCOME:"/api/v1/income/get",
        DELETE_INCOME:(incomeId)=>`/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME:`api/v1/income/downloadexcel`
    },
    EXPENSE:{
        ADD_Expense:"/api/v1/income/add",
        GET_ALL_Expense:"/api/v1/income/get",
        DELETE_Expense:(expenseId)=>`/api/v1/income/${expenseId}`,
        DOWNLOAD_Expense:`api/v1/income/downloadexcel`
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image",
    }
}