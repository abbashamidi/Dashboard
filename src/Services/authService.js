export async function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "AbbashamidiCR@gmail.com" && password === "123456789") {
        resolve({
          token: "mock-jwt-token",
          user: { name: "Test User", email },
        });
      } else {
        reject(new Error("Invalid Email or Password"))
      }
    }, 1000);
  });
}
