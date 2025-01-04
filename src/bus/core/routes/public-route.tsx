export const PublicRoute = ({ children }: any) => {
  const hasPermission = true;

  return hasPermission ? children : (window.location.href = "/welcome/home");
};
