import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import Campaign from "../../components/Campaign/Campaign";

const Campaigns = () => {
  const campaignData = useLoaderData();
  const [sortDescending, setSortDescending] = useState(true);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortDescending((prev) => !prev);
  };

  // Sort campaigns based on donation_amount
  const sortedCampaigns = [...campaignData]?.sort((a, b) => {
    const amountA = a.donation_amount || 0;
    const amountB = b.donation_amount || 0;
    return sortDescending ? amountB - amountA : amountA - amountB;
  });

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {sortDescending ? (
            <>
              <FaSortAmountDown /> Donation Amount 
            </>
          ) : (
            <>
              <FaSortAmountUp /> Donation Amount 
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCampaigns?.length === 0 ? (
          <p className="text-center py-5 text-2xl">No Data Found!</p>
        ) : (
          sortedCampaigns.map((campaign, index) => (
            <Campaign
              key={campaign?._id || index}
              idx={index}
              campaign={campaign}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Campaigns;
