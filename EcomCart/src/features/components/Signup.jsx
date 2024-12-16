import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {createUser} from '../auth/authApi'
import { authState ,authErrorState} from '../../store/atom/list';
import { useRecoilValue,useSetRecoilState } from "recoil";

export default function Signup() {
    const setUser = useSetRecoilState(authState);
    const setError = useSetRecoilState(authErrorState); 
    const user = useRecoilValue(authState); 
  
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    // console.log(errors)  // Will show you errors
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
                        try{
                        createUser({email:data.email,password:data.password}).then((data)=>{
                            console.log(data.data)
                            setUser(authState,{data}); // Update Recoil state with the new user
                            setError(null); // Clear any previous error
                            })
                      } catch (err) {
                        setError(err.message); // Set error if API call fails
                      }
                        
                    })}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required", pattern: {
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                            message: "Email not Valid"
                                        }
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required", pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `- at least 8 characters\n
- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
- Can contain special characters`
                                        }
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                            </div>

                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                    id="confirm-password"
                                    {...register("confirmPassword", { required: "Confirm password is required",
                                        validate:(value,formValues)=>value===formValues.password || 'Passwords not matching'

                                     })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                                {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                            </div>

                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already a Member{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}