// import { fetchAllProducts, fetchProductsByFilters } from './productAPI';
import {atom,selector} from 'recoil';

export const productsState=atom({
    key:'productsState',
    default:[]
});

export const statusState = atom({
    key: 'statusState', // unique ID for the atom
    default: 'idle', // initial state is 'idle'
});

export const Farr = atom({
    key: 'Farr', // unique ID for the atom
    default: [], // initial state is 'idle'
});

export const filterList = atom({
  key: 'filter',
  default: []  // Set this to an empty string for a text filter
});

export const fetchAllProductsState = selector({
    key: 'fetchAllProductsState', // A unique ID for this selector
    get: async ({get}) => {
      try {
        const productsStateArray=get(productsState)
        const filteredArray=get(filterList)
        const arrK=get(Farr);
        const response =await fetch('http://localhost:3000/products')
        const data=await response.json()
        if(arrK.length>0){
          const filtered_Products = data.filter((item) => arrK.includes(item.brand));
          console.log("filtered products--> ",filtered_Products)
          return filtered_Products;
        }
        else{
          console.log("hello")
          return data;
        }
       

      } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Return an empty array on error
      }
    },
  });

export const fetchProductsByFiltersState=selector({
    key: 'fetchProductsByFiltersState', // A unique ID for this selector
  get: async ({ get }) => {
    const filters = get(productsState); // Read the current filters from `productsState`

    try {
      const response =await fetch('http://localhost:3000/products?limit=100')
      const data=await response.json()
      return data;
      // const response = await fetchProductsByFilters(filters); // Fetch products based on filters
      // return response.data; // Return the filtered products
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      return []; // Return an empty array on error
    }
  },
})

