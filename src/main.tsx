import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Layout } from "./components/Layout/Layout.tsx";
import { FavoriteScreen } from "./pages/FavoriteScreen.tsx";
import { ListScreen } from "./pages/ListScreen.tsx";
import { FridgeScreen } from "./pages/FridgeScreen.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HomeScreen } from "./pages/HomeScreen.tsx";
import { ProtectedRoute } from "./components/Layout/ProtectedRoute.tsx";
import { SingleRecipeScreen } from "./pages/SingleRecipeScreen.tsx";
// import "@splidejs/splide/css";
import { SigninScreen } from "./pages/SigninScreen.tsx";
import { FavoriteRecipeContextProvider } from "./context/FavoriteRecipeContext.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";
// import "@splidejs/react-splide/css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "signin",
        element: <SigninScreen redirectTo="/" />,
      },
      {
        path: "recipe/:id/",
        element: <SingleRecipeScreen />,
      },
      {
        path: "favorite",
        element: (
          <ProtectedRoute redirectTo="/favorite">
            <FavoriteScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "list",
        element: (
          <ProtectedRoute redirectTo="/list">
            <ListScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "fridge",
        element: (
          <ProtectedRoute redirectTo="/fridge">
            <FridgeScreen />
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
