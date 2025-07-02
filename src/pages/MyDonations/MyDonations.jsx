import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [donationRes, campaignRes] = await Promise.all([
          fetch("https://your-server-url.com/donations"), // Replace with real endpoint
          fetch("https://your-server-url.com/campaigns")
        ]);

        const donationData = await donationRes.json();
        const campaignData = await campaignRes.json();

        setDonations(donationData);
        setCampaigns(campaignData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user?.email) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No donation found (User not logged in)</p>
      </div>
    );
  }

  const filteredData = Array.isArray(donations)
    ? donations.filter((donation) => donation.email === user.email)
    : [];

  // 🔄 Show Spinner While Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary w-16 h-16"></span>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 overflow-auto mt-16 h-screen">
      <div className="text-center pb-8">
        <h2 className="text-2xl mb-4">My Donations</h2>
        <p className="font-semibold">Name: {user.displayName}</p>
        <p className="font-semibold">Email: {user.email}</p>
      </div>

      <div className="relative overflow-auto">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white border mb-20">
            <thead>
              <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                <th className="p-0"><span className="block py-2 px-3 border-r border-gray-300">Sl. no.</span></th>
                <th className="p-0"><span className="block py-2 px-3 border-r border-gray-300">Campaign Title</span></th>
                <th className="p-0"><span className="block py-2 px-3 border-r border-gray-300">Donation Date & Time</span></th>
                <th className="p-0"><span className="block py-2 px-3 border-r border-gray-300">Donation Amount</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((donation, index) => (
                  <tr key={donation._id} className="border-b text-xs md:text-sm text-center text-gray-800">
                    <td className="p-2 md:p-4">{index + 1}</td>
                    <td className="p-2 md:p-4">
                      {campaigns.find(c => c._id === donation.campaign_id)?.campaign_title || "N/A"}
                    </td>
                    <td className="p-2 md:p-4">
                      {new Date(donation.date).toLocaleString('en-BD', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                        hour12: true
                      })}
                    </td>
                    <td className="p-2 md:p-4">{donation.donation_amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No donations found for this user.
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

export default MyDonations;
