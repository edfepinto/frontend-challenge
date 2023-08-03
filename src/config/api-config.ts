const baseUrl = "https://homologacao.windel.com.br:3000/teste-front";

const resources = {
  products: "/",
  pagination: "/pagination/:page",
  count: "/count",
  oneProduct: "/:id",
  deleteProduct: "/:id",
};

export { baseUrl, resources };
