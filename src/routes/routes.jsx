
import {
  createBrowserRouter,
} from "react-router-dom";


import ErrorPage from "../components/ErrorPage/ErrorPage";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import MyCampaign from "../pages/MyCampaigns/MyCampaigns";
import MyDonations from "../pages/MyDonations/MyDonations";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ASuccessStory from "../components/ASuccessStory/ASuccessStory";
import AddCampaign from "../pages/AddCampaign/AddCampaign";
import Campaigns from "../pages/Campaigns/Campaigns";
import PrivateRoute from "../routes/PrivateRoute"
import UpdateCampaign from "../components/UpdateCampaign/UpdateCampaign";
import DetailedCampaign from "../components/DetailedCampaign/DetailedCampaign";
import DonationForm from "../components/DonationForm/DonationForm";




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
        path: "/campaigns",
        element: <Campaigns></Campaigns>,
        loader: () => fetch('http://localhost:5000/addCampaign'),
      },



      {
        path: "/addCampaign",
        element: <PrivateRoute><AddCampaign></AddCampaign></PrivateRoute>
      },
      {
        path: "/myCampaign",
        element: <PrivateRoute><MyCampaign></MyCampaign></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/addCampaign'),
      },
      {
        path: "/myDonations",
        element: <PrivateRoute><MyDonations /></PrivateRoute>,
        loader: async () => {
          const [donationsRes, campaignsRes] = await Promise.all([
            fetch("http://localhost:5000/addDonations"),
            fetch("http://localhost:5000/addCampaign")
          ]);

          return {
            donations: await donationsRes.json(),
            campaigns: await campaignsRes.json()
          };
        }
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
      {
        path: "/update/:id",
        element: <UpdateCampaign></UpdateCampaign>,
        loader: ({ params }) => fetch(`http://localhost:5000/update/${params.id}`),
      },
      {
        path: "/campaign/:id",
        element: <PrivateRoute> <DetailedCampaign></DetailedCampaign></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/campaign/${params.id}`),
      },
      {
        path: "/donate/:id",
        element: <DonationForm></DonationForm>,
         loader: ({ params }) => fetch(`http://localhost:5000/campaign/${params.id}`),
      },
    ],
  },

]);
