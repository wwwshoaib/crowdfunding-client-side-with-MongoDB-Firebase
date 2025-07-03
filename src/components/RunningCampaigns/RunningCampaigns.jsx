
import { Link } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import Lottie from "lottie-react";
import LottieSpinner from '../../assets/lottie/spinner.json'



const RunningCampaigns = () => {
  const { isPending, error, data = [] } = useQuery({
    queryKey: ['campaigns data'],
    queryFn: async () => {
      const res = await fetch('https://crowdfunding-server-b5i9.onrender.com/addCampaign');
      if (!res.ok) {
        throw new Error('Server response was not OK. Please wait a few minutes..');
      }
      return res.json();
    },
  });


  if (isPending) return <Lottie animationData={LottieSpinner} />;
  if (error) return <p>Error: {error.message}</p>;

    // Filter campaigns: running = donation still needed
    const today = new Date();
    const runningCampaigns = data
        .filter(campaign => {
            const deadlineDate = new Date(campaign.deadline);
            return (
                parseFloat(campaign.total_donation_gained) < parseFloat(campaign.donation_amount) &&
                deadlineDate >= today
            );
        })
        .slice(0, 6);

    // Function to get first 30 words
    const getShortDescription = (text) => {
        const words = text.split(" ");
        if (words.length <= 20) return text;
        return words.slice(0, 20).join(" ") + "...";
    };

    // 
      

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {
                runningCampaigns.map((campaign, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                        <div className="bg-white shadow-md rounded-lg p-4 h-[600px] flex flex-col">
                            <div>
                                <img
                                    src={campaign.photoURL}
                                    alt={campaign.campaign_title}
                                    className="w-full h-72 object-cover rounded-md mb-4"
                                />

                                <h4 className="text-lg font-semibold mb-2">{campaign.campaign_title}</h4>
                                <p className="text-sm text-gray-500 mb-1">
                                    <strong>Campaign Type:</strong> {campaign.campaign_type}
                                </p>

                                <p className="text-sm text-gray-600 ">{getShortDescription(campaign.description)} &nbsp;
                                    {/* Link button to details page */}
                                    <Link
                                        to={`/campaign/${campaign._id}`}
                                        className="font-bold"
                                    >
                                        See Details
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-auto">
                                <p className="text-sm text-gray-500 mb-1">
                                    <strong>Target:</strong> Tk. {campaign.donation_amount}
                                </p>
                                <p className="text-sm text-gray-500 mb-3">
                                    <strong>Deadline:</strong> {campaign.deadline}
                                </p>

                                <div className="text-center">
                                    <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition">

                                        <Link
                                            to={`/campaign/${campaign._id}`}
                                            className="font-bold"
                                        >
                                            See More
                                        </Link>


                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default RunningCampaigns;
