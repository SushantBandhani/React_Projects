import Navbar from "../navbar/Navbar";
import ProductList from "../product-List/ProductList";

export default function Home(){
    return(
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
        </div>
    )
}