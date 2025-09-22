export const getUser = () => {
  return {
    email: localStorage.getItem("email"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
  };
};
