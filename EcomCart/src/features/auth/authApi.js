export async function createUser(userData) {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const data = await response.json();
  return { data };
}

export async function checkUser(loginInfo) {
  const { email, password } = loginInfo;
  const response = await fetch(`http://localhost:3000/users?email=${email}`);
  const data = await response.json();

  console.log({ data });

  if (data.length) {
    if (password === data[0].password) {
      return { data: data[0] };
    } else {
      throw new Error("Wrong credentials");
    }
  } else {
    throw new Error("User not found");
  }
}


export async function signout(userId){
  // check if session or token then remove it
  return {
    success: true
  }
}