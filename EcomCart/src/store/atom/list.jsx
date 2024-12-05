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

export const sortData=atom({
  key:"sortData",
  default:''
})

export const fetchAllProductsState = selector({
    key: 'fetchAllProductsState', // A unique ID for this selector
    get: async ({get}) => {
      try {
        const productsStateArray=get(productsState)
        const filteredArray=get(filterList)
        const sortDataY=get(sortData)
        const arrK=get(Farr);
        const response =await fetch('http://localhost:3000/products')
        const data=await response.json()
        if(arrK.length>0 || sortDataY!=''){
          let filtered_Products = data.filter((item) => (arrK.includes(item.brand) || arrK.includes(item.category)));
          if(filtered_Products.length==0){
            filtered_Products=[...data]
          }
          if(sortDataY=='rating'){
            filtered_Products.sort((a,b)=>{return b.rating-a.rating})
          }
          else if(sortDataY=='asc'){
            filtered_Products.sort((a,b)=>{return a.price-b.price})
          }
          else{
            filtered_Products.sort((a,b)=>{return b.price-a.price})

          }
          return filtered_Products;
        }
        else{
          return data;
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Return an empty array on error
      }
    },
  });
