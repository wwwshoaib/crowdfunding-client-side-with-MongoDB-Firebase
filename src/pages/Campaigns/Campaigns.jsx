// Campaigns.jsx
import { useLoaderData } from "react-router-dom";
import Campaign from "../../components/Campaign/Campaign";


const Campaigns = () => {
  const campaignData = useLoaderData();
  

  return (
    
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignData?.length === 0 ? (
          <p className="text-center py-5 text-2xl">No Data Found!</p>
        ) : (
          campaignData.map((campaign, index) => (
            <Campaign
              key={campaign?._id || index}
              idx={index}
              campaign={campaign}
            />
          ))
        )}
      </div>
    
  );
};

export default Campaigns;
