
import { useLoaderData } from "react-router";
import { useContext, } from "react";
import { AuthContext } from "../../providers/AuthProviders";




const MyDonations = () => {

    const { donations, campaigns } = useLoaderData();
    const { user } = useContext(AuthContext);












    if (!user?.email) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-gray-600">No donation found (User not logged in)</p>
            </div>
        );
    }

    const filteredData = donations?.filter(
        (donation) => donation.email === user.email
    );




    return (
        <div className="bg-white p-8 overflow-auto mt-16 h-screen">



            <div className="text-center pb-8">
                <h2 className="text-2xl mb-4">My Donations</h2>
                <p className="font-semibold">Name: {user.displayName}</p>
                <p className="font-semibold">Email: {user.email}</p>

            </div>


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
                                    <span className="block py-2 px-3 border-r border-gray-300">Deadline</span>
                                </th>
                                <th className="p-0">
                                    <span className="block py-2 px-3 border-r border-gray-300">Donation Amount</span>
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((donation, index) => (
                                <tr
                                    key={donation._id}
                                    className="border-b text-xs md:text-sm text-center text-gray-800"
                                >
                                    <td className="p-2 md:p-4">{index + 1}</td>
                                    <td className="p-2 md:p-4">
                                          {
                                            campaigns?.find(campaign => campaign._id === donation.campaign_id)?.campaign_title || "N/A"
                                        }

                                    </td>

                                    <td className="p-2 md:p-4">
                                        {
                                            campaigns?.find(campaign => campaign._id === donation.campaign_id)?.deadline || "N/A"
                                        }
                                    </td>
                                    <td className="p-2 md:p-4">{donation.donation_amount}</td>



                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">
                                        No donation found.
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
