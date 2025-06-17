import { useLoaderData } from "react-router-dom";
import Card from "../Card/Card";

const Cards = () => {
  const campaignData = useLoaderData();

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaignData?.length === 0 ? (
        <p className="text-center py-5 text-2xl">No Data Found!</p>
      ) : (
        campaignData.map((campaign, index) => (
          <Card
            key={campaign?._id}
            idx={index}
            campaign={campaign}
          />
        ))
      )}
    </div>
  );
};

export default Cards;
