import Navbar from "../navbar/Navbar";
import ProductDetails from "../product-List/components/ProductDetails";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

export default function ProdcutDetailsPage() {
    return (
        <div>
            <Navbar>
                <RecoilRoot>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductDetails></ProductDetails>
                    </Suspense>
                </RecoilRoot>
            </Navbar>
        </div>
    )
}