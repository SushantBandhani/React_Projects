export async function fetchCount(amount=1){
    const response =await fetch('http://localhost:3000/products')
    const data=await response.json()
    resolveConfig(data)
}