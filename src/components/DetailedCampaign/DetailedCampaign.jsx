import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const DetailedCampaign = () => {
    const campaignData = useLoaderData();
    const {
        photoURL,
        campaign_title,
        campaign_type,
        description,
        donation_amount,
        deadline
    } = campaignData;

    return (
        <div className="w-11/12 mx-auto">
            <div className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img
                                    className="w-full h-full object-cover"
                                    src={photoURL}
                                    alt="Campaign"
                                />
                            </div>
                            <div className="flex  mb-4">
                                <div className="w-full py-2 px-2">
                                     <Link to ={'/donate'}
                                     className="bg-lime-500 px-8 py-4 text-white rounded-md"
                                      >Donate</Link>
                                    
                        
                                </div>
                               
                            </div>
                        </div>

                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {campaign_title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                {description}
                            </p>

                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Type:</span>{" "}
                                    <span className="text-gray-600 dark:text-gray-300">{campaign_type}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Deadline:</span>{" "}
                                    <span className="text-gray-600 dark:text-gray-300">{deadline}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Donation Goal:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold mt-2">
                                    ${donation_amount}
                                </p>
                            </div>

                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Full Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default DetailedCampaign;
