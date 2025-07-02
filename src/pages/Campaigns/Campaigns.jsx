import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import Campaign from "../../components/Campaign/Campaign";

const Campaigns = () => {
  const { isPending, error, data = [] } = useQuery({
    queryKey: ['campaigns data'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/addCampaign');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });

  const [sortDescending, setSortDescending] = useState(true);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortDescending(prev => !prev);
  };

  // 🧠 Memoized sort for performance (re-runs only on sort/data change)
  const sortedCampaigns = useMemo(() => {
    return [...data].sort((a, b) => {
      const amountA = Number(a.donation_amount) || 0;
      const amountB = Number(b.donation_amount) || 0;
      return sortDescending ? amountB - amountA : amountA - amountB;
    });
  }, [data, sortDescending]);

  if (isPending) return <p className="text-center text-xl py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="w-11/12 mx-auto mt-10">
      {/* Sort Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {sortDescending ? (
            <>
              <FaSortAmountDown /> Highest First
            </>
          ) : (
            <>
              <FaSortAmountUp /> Lowest First
            </>
          )}
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCampaigns.length === 0 ? (
          <p className="text-center py-5 text-2xl">No Campaigns Found!</p>
        ) : (
          sortedCampaigns.map((campaign, index) => (
            <Campaign
              key={campaign._id || index}
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
