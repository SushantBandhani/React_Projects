export async function fetchLoggedInUserOrders(userId) {
  const response = await fetch(`http://localhost:8080/orders/?user.id=${userId}`);
  const data = await response.json();
  return { data };
}

export async function fetchLoggedInUser(userId) {
  const response = await fetch(`http://localhost:8080/users/${userId}`);
  const data = await response.json();
  return { data };
}

export async function updateUser(update) {
  const response = await fetch(`http://localhost:8080/users/${update.id}`, {
    method: 'PATCH',
    body: JSON.stringify(update),
    headers: { 'content-type': 'application/json' },
  });
  const data = await response.json();
  return { data };
}

// export async function updateUser(updates) {
//   // const { email, password } = loginInfo;
//   const response = await fetch("http://localhost:3000/users/" + updates.id, {
//     method: "PATCH",
//     body: JSON.stringify(updates),
//     headers: { "Content-Type": "application/json" },
//   });
//   const data = await response.json();

//   console.log({ data });

//   if (response.ok) {
//     return { data };
//   } else {
//     throw new Error("Failed to update user");
//   }
// }
