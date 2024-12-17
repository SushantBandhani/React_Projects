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

export const brands=atom({
  key:"brands",
  default:[]
})
export const categories=atom({
  key:"categories",
  default:[]
})
export const productId=atom({
  key:'productId',
  default:null
})

export const fetchAllProductsState = selector({
    key: 'fetchAllProductsState', // A unique ID for this selector
    get: async ({get}) => {
      try {
        const productsStateArray=get(productsState)
        const filteredArray=get(filterList)
        const sortDataY=get(sortData)
        const arrK=get(Farr);
        let filtered_Products=[...productsStateArray];
        if(arrK.length>0 || sortDataY!=''){
           filtered_Products = productsStateArray.filter((item) => (arrK.includes(item.brand) || arrK.includes(item.category)));
           if(filtered_Products.length==0){
            filtered_Products=[...productsStateArray]
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
        }
        return filtered_Products;
      } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Return an empty array on error
      }
    },
  });


  export const productState = selector({
    key: 'productState',
    get: async ({ get }) => {
      const id = get(productId);
  
      if (!id){
        return {};
      }
  
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch product:', error);
        return {};
      }
    },
  });

// State to store the logged-in user
export const authState = atom({
  key: "authState",
  default: {
    user:null
  },
});

// State to store signup error messages
export const authErrorState = atom({
  key: "authErrorState",
  default: null,
});


export const loggedInUserSelector = selector({
  key: "loggedInUserSelector",
  get: ({ get }) => {
    const auth = get(authState);
    return auth?.user || null; // Return the user or null
  },
});

