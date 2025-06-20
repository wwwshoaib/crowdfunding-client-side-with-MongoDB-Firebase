import { useLoaderData } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
import { Link } from "react-router";

const MyCampaigns = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const [campaignData, setCampaignData] = useState(data);
  

  if (!user?.email) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No data found (User not logged in)</p>
      </div>
    );
  }

  const filteredData = campaignData?.filter(
    (campaign) => campaign.email === user.email
  );

  

  // handle delete operation
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(result => {
      const newResult = campaignData.filter((campaign) => id!= campaign._id);
      setCampaignData(newResult);
      if (result.deletedCount>0) {
            toast.success("Data deleted successfully!");
          } else {
            toast.error("Something went wrong.");
          }
    })

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
                  <span className="block py-2 px-3 border-r border-gray-300"> Campaign Title</span>
                </th>
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">Amount </span>
                </th>
                <th className="p-0">
                  <span className="block py-2 px-3 border-r border-gray-300">Deadline</span>
                </th>

                <th className="p-4 text-xs md:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((campaign, index) => (
                <tr
                  key={campaign._id}
                  className="border-b text-xs md:text-sm text-center text-gray-800"
                >
                  <td className="p-2 md:p-4">{index + 1}</td>
                  <td className="p-2 md:p-4">{campaign.campaign_title}</td>
                  <td className="p-2 md:p-4">Tk. {campaign.donation_amount}</td>
                  <td className="p-2 md:p-4">{campaign.deadline}</td>
                  <td className="relative p-2 md:p-4 flex justify-center space-x-2">
                    <Link
                    to = {`/update/${campaign._id}`}
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
                  <td colSpan="4" className="text-center py-4 text-gray-500">
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
