export const authHeader = () => {
  const _token = localStorage.getItem("_token");
  if (_token) {
    return { Authorization: _token };
  }

  return {};
};
