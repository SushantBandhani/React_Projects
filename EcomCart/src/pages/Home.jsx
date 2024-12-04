import { RecoilRoot } from "recoil";
import React, { Suspense } from 'react';
import Navbar from "../navbar/Navbar";
import ProductList from "../product-List/components/ProductList";

export default function Home(){
    return(
        <div>
            <Navbar>
                <RecoilRoot>
                    <Suspense fallback={<div>Loading.....</div>}>
                    <ProductList></ProductList>
                    </Suspense>
                </RecoilRoot>
            </Navbar>
        </div>
    )
}