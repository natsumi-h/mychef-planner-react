import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Layout } from "./components/Layout/Layout.tsx";
import { Favorite } from "./pages/Favorite.tsx";
import { List } from "./pages/List.tsx";
import { FridgePage } from "./pages/Fridge.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Home } from "./pages/Home.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { SingleRecipe } from "./pages/SingleRecipe.tsx";
import "@splidejs/splide/css";
import { Signin } from "./pages/Signin.tsx";
import { FavoriteRecipeContextProvider } from "./context/FavoriteRecipeContext.tsx";
// import "@splidejs/react-splide/css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin redirectTo="/" />,
      },
      {
        path: "recipe/:id/",
        element: <SingleRecipe />,
      },
      {
        path: "favorite",
        element: (
          <ProtectedRoute redirectTo="/favorite">
            <Favorite />
          </ProtectedRoute>
        ),
      },
      {
        path: "list",
        element: (
          <ProtectedRoute redirectTo="/list">
            <List />
          </ProtectedRoute>
        ),
      },
      {
        path: "fridge",
        element: (
          <ProtectedRoute redirectTo="/fridge">
            <FridgePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "gray.600",
      },
      // a: {
      //   color: "teal.500",
      // },
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  colors: {
    primary: "#48BB78",
    secondary: "#F0FFF4",
    text: "gray.600",
    heading: "#1A202C",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavoriteRecipeContextProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
          {/* <Outlet /> */}
        </ChakraProvider>
      </FavoriteRecipeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
