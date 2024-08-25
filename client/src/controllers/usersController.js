/************************ Login User ************************/
const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data)

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem('token', data.token)
  localStorage.setItem('email', data.user.email)


  return data;
};

/************************ Register User ************************/
const registerUser = async (email, password, passwordConfirm) => {
  if (!email || !password || !passwordConfirm) {
    throw Error("All fields are required");
  }

  if (password !== passwordConfirm) {
    throw Error("Password does not match");
  }

  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password}),
  });

  const data = await res.json()

  if (!res.ok)
  {
    throw Error(data.error)
  }

  localStorage.setItem('token', data.token)
  localStorage.setItem('email', data.user.email)

  return data;
}

export { loginUser, registerUser };