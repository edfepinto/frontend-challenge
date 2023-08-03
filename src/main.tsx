import React from "react";
import ReactDOM from "react-dom/client";
import Products from "./features/products";
import { ChakraProvider } from "@chakra-ui/react";
import "./global/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Products />
    </ChakraProvider>
  </React.StrictMode>
);

