import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import LottieSpinner from '../../assets/lottie/spinner.json';

const MyDonations = () => {
  const { user } = useContext(AuthContext);

  const {
    isPending: donationsLoading,
    error: donationsError,
    data: donations,
  } = useQuery({
    queryKey: ['donations', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://crowdfunding-server-beta.vercel.app/myDonations?email=${user.email}`);
      if (!res.ok) throw new Error('Server response was not OK. Please wait a few minutes..');
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (donationsLoading) {
    return <Lottie animationData={LottieSpinner}></Lottie>;
  }

  if (donationsError) {
    return <p>Error loading data: {donationsError.message}</p>;
  }

  if (!user?.email) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No donation found (User not logged in)</p>
      </div>
    );
  }

  const filteredData = Array.isArray(donations) ? donations : [];

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
