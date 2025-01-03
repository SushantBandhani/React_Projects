// import react from 'react'
import { useState, useEffect } from 'react'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { productsState, fetchAllProductsState, sortData, statusState, Farr,brands,categories } from '../../store/atom/list'
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import {Items_Per_Page} from '../../app/constants'

// section represents the parts and options represents values inside respective partions

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', current: false },
  { name: 'Price: Low to High', sort: 'price', order: "asc", current: false },
  { name: 'Price: High to Low', sort: 'price', order: "desc", current: false },
]



export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const filteredArray = useRecoilValue(fetchAllProductsState)
  const setArr2 = useSetRecoilState(Farr);
  const setsortArr = useSetRecoilState(sortData);
  const setProducts = useSetRecoilState(productsState);
  const setStatus = useSetRecoilState(statusState);
  const [branD,setBrands]=useRecoilState(brands)
  const [categorieS,setCategories]=useRecoilState(categories)
  const [totalItems,setTotalItems]=useState(0);
  const filters = [
    {
      id: 'brand',
      name: 'Brands',
      options: branD,
    },
    {
      id: 'category',
      name: 'Category',
      options: categorieS,
    },
    // {
    //   id: 'size',
    //   name: 'Size',
    //   options: [
    //     { value: '2l', label: '2L', checked: false },
    //     { value: '6l', label: '6L', checked: false },
    //     { value: '12l', label: '12L', checked: false },
    //     { value: '18l', label: '18L', checked: false },
    //     { value: '20l', label: '20L', checked: false },
    //     { value: '40l', label: '40L', checked: true },
    //   ],
    // },
  ];
  // const [page,setPage]=useState(1);
  let _limit=10;
  // let totalItems=0;
  const [page,setPage]=useState(1);
  

  function handlePage(page){
    console.log(page)
    setPage(page)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('loading');
        const response = await fetch(`https://dummyjson.com/products?limit=${_limit}&skip=${(page-1)*_limit}`);
        const data = await response.json();
        const response2 = await fetch(`http://localhost:3000/brands`);
        const data2 = await response2.json();
        const response3 = await fetch(`http://localhost:3000/categories`);
        const data3 = await response3.json();
        // console.log(data2,data3)
        setBrands(data2)
        setCategories(data3)

        /* Need to fix this headers issue to get the totalcount ,until then manually setting a totalItems */

        // const tot=await response.headers.get("X-ratelimit-limit");
        // console.log('X-Ratelimit-Limit:', response.headers.get('X-Ratelimit-Limit'));
        // if(response.headers.get("X-ratelimit-limit")){
        //   console.log("yes")
        // }
        // setTotalItems(tot)
        // console.log("total in useEffect--> ",tot)
        // console.log(data)
        setProducts(data.products);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching products:', error);
        setStatus('error');
      }
    };

    fetchData();
  }, [setProducts, setStatus,page]);


  const handleFilter = (e, section, option) => {
    if (e.target.checked) {
      setArr2((prevArr) => [...prevArr, option.value]);
    } else {
      setArr2((prevArr) => prevArr.filter((item) => item !== option.value));
    }
  };

  const handleSort = (e, option) => {
    setsortArr(option.order == undefined ? option.sort : option.order)
  }
  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} handleFilter={handleFilter} filters={filters}></MobileFilter>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name}>
                            <p
                              onClick={e => handleSort(e, option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                              )}
                            >
                              {option.name}
                            </p>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>

                  <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon aria-hidden="true" className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>

              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}

                  <DesktopFilter handleFilter={handleFilter} filters={filters}></DesktopFilter>

                  {/* Product grid */}
                  <ProductGrid filteredArray={filteredArray}></ProductGrid>
                </div>
              </section>

              {/* Section of Products ---------------------- */}
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={100}></Pagination>
              </div>
            </main>
          </div>
        </div>

      </div>
    </div>
  )
}

function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen, handleFilter,filters }) {
  return (
    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">


            {filters.map((section) => (
              <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                      <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={e => handleFilter(e, section, option)}
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function DesktopFilter({ handleFilter,filters }) {
  return <form className="hidden lg:block">


    {filters.map((section) => (
      <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">{section.name}</span>
            <span className="ml-6 flex items-center">
              <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
              <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
            </span>
          </DisclosureButton>
        </h3>
        <DisclosurePanel className="pt-6">
          <div className="space-y-4">
            {section.options.map((option, optionIdx) => (
              <div key={option.value} className="flex items-center">
                <input
                  defaultValue={option.value}
                  defaultChecked={option.checked}
                  id={`filter-${section.id}-${optionIdx}`}
                  name={`${section.id}[]`}
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={e => handleFilter(e, section, option)}
                />
                <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    ))}
  </form>;
}

function Pagination({page,setPage,handlePage,totalItems}) {
  // console.log("Total --> ",totalItems)
  const totalPages=Math.ceil(totalItems/Items_Per_Page)
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={(e)=>{handlePage(page>1?page-1:page)}}
        >
          Previous
        </div>
        <div
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={(e)=>{handlePage(page<totalPages?page+1:page)}}
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page-1)*Items_Per_Page+1}</span> to <span className="font-medium">{(page)*Items_Per_Page>totalItems?totalItems:(page)*Items_Per_Page}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <div
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={(e)=>{handlePage(page>1?page-1:page)}}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {Array.from({length:totalPages}).map((ele,index)=>{
        
  return  <div
    onClick={(e)=>handlePage(index+1)}
    aria-current="page"
    className={`relative cursor-pointer z-10 inline-flex items-center ${index+1===page?'bg-indigo-600 text-white':'text-gray-900'} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
  >
    {index+1}
  </div>
            })}
        
            {/* <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            */
            <div
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={(e)=>{handlePage(page<totalPages?page+1:page)}}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </div> }
          </nav>
        </div>
      </div>
    </>
  );
}

function ProductGrid({ filteredArray }) {
  return <div className="lg:col-span-3">
    {/* This is Product list page -----------------------> */}
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredArray.map((product) => (
            <Link key={product.id} to={`productDetails/${product.id}`}>
              <div className="group relative border-solid border-2 p-2 flex flex-col h-full">
                {/* Image Section */}
                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={product.imageAlt}
                    src={product.thumbnail}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                </div>

                {/* Content Section (Title, Rating, Price) */}
                <div className="mt-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6 inline" />
                      <span className="align-bottom">{product.rating}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm block font-medium text-gray-900">${product.price}</p>
                    <p className="text-sm block line-through font-medium text-gray-400">
                      ${Math.round(product.price * (1 - product.discountPercentage / 100))}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
    ;
}