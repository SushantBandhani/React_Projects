import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCart } from "./features/cart/cartAPI";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserSelector } from "./store/atom/list";
import { resetOrder } from "./features/orders/orderSlice";

export default function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const user = useSelector(loggedInUserSelector);

  useEffect(() => {
    dispatch(resetCart(user.id));
    dispatch(resetOrder(user.id));
  }, [dispatch,user]);

  return (
    <>
      {!id && <Navigate to="/" replace={true} />}
      <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-400">
            Order Successfully placed!!
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Order Number #{id}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            you can check your order in My Account {" > "} My Orders{" "}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go back home
            </Link>
            <Link to="#" className="text-sm font-semibold text-white">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
