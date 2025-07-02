import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"; // ✅ ঠিক করা হলো
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import LottieSpinner from '../../assets/lottie/spinner.json';

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);

  const {
    isPending,
    error,
    data: campaigns = [],
    refetch,
  } = useQuery({
    queryKey: ['campaigns data'],
    queryFn: async () => {
      const res = await fetch('https://crowdfunding-server-beta.vercel.app/addCampaign');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });

  if (isPending) return <Lottie animationData={LottieSpinner} />;
  if (error) return <p>Error: {error.message}</p>;

  if (!user?.email) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No data found (User not logged in)</p>
      </div>
    );
  }

  const filteredData = campaigns.filter(
    (campaign) => campaign.email === user.email
  );

  // ✅ Updated delete handler with refetch
  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white p-3 rounded shadow text-sm">
        <p>Do you want to delete this campaign?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              fetch(`https://crowdfunding-server-beta.vercel.app/addCampaign/${id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((result) => {
                  if (result.deletedCount > 0) {
                    toast.success("Campaign was deleted successfully!");
                    refetch(); 
                  } else {
                    toast.error("Failed!");
                  }
                });
            }}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white p-8 overflow-auto mt-16 h-screen">
      <h2 className="text-2xl mb-4">My Campaigns</h2>

      {/* Campaigns Table */}
      <div className="relative overflow-auto">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white border mb-20">
            <thead>
              <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">Sl. no.</span>
                </th>
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">Campaign Title</span>
                </th>
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">Amount</span>
                </th>
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">Deadline</span>
                </th>
                <th className="p-4 text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((campaign, index) => (
                <tr key={campaign._id} className="border-b text-xs md:text-sm text-center text-gray-800">
                  <td className="p-2 md:p-4">{index + 1}</td>
                  <td className="p-2 md:p-4">{campaign.campaign_title}</td>
                  <td className="p-2 md:p-4">Tk. {campaign.donation_amount}</td>
                  <td className="p-2 md:p-4">{campaign.deadline}</td>
                  <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                    <Link
                      to={`/update/${campaign._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                      onClick={() => handleDelete(campaign._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCampaigns;
