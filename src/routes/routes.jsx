
import {
  createBrowserRouter,
} from "react-router-dom";


import ErrorPage from "../components/ErrorPage/ErrorPage";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import AddCampaign from "../pages/Home/AddCampaign/AddCampaign";
import AllCampaign from "../pages/AllCampaigns/AllCampaign";
import MyCampaign from "../pages/MyCampaign/MyCampaign";
import MyDonations from "../pages/MyDonations/MyDonations";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ASuccessStory from "../components/ASuccessStory/ASuccessStory";

 export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allCampaigns",
        element: <AllCampaign></AllCampaign>
      },
      {
        path: "/addNewCampaign",
        element: <AddCampaign></AddCampaign>
      },
      {
        path: "/myCampaign",
        element: <MyCampaign></MyCampaign>,
      },
      {
        path: "/myDonations",
        element: <MyDonations></MyDonations>,
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/readASuccess",
        element: <ASuccessStory></ASuccessStory>,
      },
    ],
  },
  
]);
