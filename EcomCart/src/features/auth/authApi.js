export function createUser(userData){
    return new Promise(async(resolve)=>{
        const response=await fetch("http://localhost:3000/users",{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{'content-type':'application/json'}
    })

    if (!response.ok) {
        throw new Error("Failed to create user");
      }
      
  
    const data=await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({data})
})}


export function checkUser(loginInfo){
    return new Promise(async(resolve,reject)=>{
        const email = loginInfo.email;
        const password = loginInfo.password;
        const response=await fetch("http://localhost:3000/users?email="+email)
        const data=await response.json()

        console.log({data})
        if (data.length) {
          if (password === data[0].password) {
            resolve({ data: data[0] });
          } else {
            reject({ message: 'Wrong credentials' });
          }
        } else {
          reject({ message: 'User not found' });
        }
})}