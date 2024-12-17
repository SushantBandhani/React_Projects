import {Link, Navigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {checkUser} from '../auth/authApi'
import { authState ,authErrorState,loggedInUserSelector} from '../../store/atom/list';
import { useRecoilValue,useSetRecoilState,useRecoilState } from "recoil";


export default function Login(){
      const { register, handleSubmit, watch, formState: { errors } } = useForm()
      const setUser = useSetRecoilState(authState);
      const [error,setError] = useRecoilState(authErrorState); 
      const user = useRecoilValue(loggedInUserSelector); 
      console.log("Ji namaste",user)
    if(user!=null){
      console.log("hello i am here ");
      <Navigate to="/" replace={true}></Navigate>
    }
    return (
        <>
          {user!=null && <Navigate to="/" replace={true}></Navigate>}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Log in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
                                       checkUser({email:data.email,password:data.password}).then((data)=>{
                                        console.log(data)
                                        setUser({ user: data.data });
                                        setError(null); // Clear any previous error
                                          }).catch((err)=>{
                                            setError(err.message); // Set error if API call fails
                                          })                                      
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
                                        required: "Password is required",
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                                {error && <p className='text-red-500'>{error}</p>}

                            </div>
             
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log in
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a Member?{' '}
                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </>
      )
}