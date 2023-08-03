const baseUrl = import.meta.env.VITE_API_URL;

const resources = {
  products: "/",
  pagination: "/pagination/:page",
  count: "/count",
  oneProduct: "/:id",
  deleteProduct: "/:id",
};

export { baseUrl, resources };
