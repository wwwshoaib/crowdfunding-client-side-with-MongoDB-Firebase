


import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthProviders';


const AddCampaign = () => {

    const navigate = useNavigate();
   const { user } = useContext(AuthContext);
    console.log(user);


    const handleAddNewCampaign = e => {
        e.preventDefault();
        const form = e.target;
        const name = user.displayName;
        const email = user.email;
        const photoURL = e.target.photo.value;
        const campaign_title = e.target.campaign_title.value;
        const campaign_type = e.target.campaign_type.value;
        const description = e.target.description.value;
        const donation_amount = e.target.donation_amount.value;
        const deadline = e.target.deadline.value;

        const newCampaign = { name, email, photoURL, campaign_title, campaign_type, description, donation_amount, deadline };
       // console.log(newCampaign)
        fetch('http://localhost:5000/addCampaign', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCampaign)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("A New Campaign created successfully!")
                      navigate("/campaigns");


                }
            })


        //clear the form after the submission
        form.reset();
    };

    return (
        <div className="w-11/12 mx-auto">
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://www.svgrepo.com/show/301692/login.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Add New Campaign
                    </h2>

                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleAddNewCampaign}>


                            {/* photo */}
                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                    Photo URL
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                        id="photo"
                                        name="photo"
                                        type="text"
                                        placeholder="Give here photo URL"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            {/* Campaign Title */}
                            <div className="mt-6">
                                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                    Campaign Title
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        name="campaign_title"
                                        placeholder="Type here campaign title"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            {/* campaign type */}
                            <div className="mt-6">
                                <label htmlFor="category" className="block text-sm font-medium leading-5 text-gray-700">
                                    Select Campaign Category
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <select
                                        id="category"
                                        name="campaign_type"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="">-- Please choose an option --</option>
                                        <option value="personal issue">Personal Issue</option>
                                        <option value="startup">Startup</option>
                                        <option value="business">Business</option>
                                        <option value="creative ideas">Creative Ideas</option>
                                    </select>
                                </div>
                            </div>


                            {/* Description */}
                            <div className="mt-6">
                                <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Write a short description (max 100 words)..."
                                        required
                                        rows={4}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        maxLength={600}
                                    />
                                </div>
                            </div>

                            {/* Donation Amount */}
                            <div className="mt-6">
                                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                    Minimum Donation Amount
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        name="donation_amount"
                                        placeholder="Type here donation amount"
                                        type="number"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="mt-6">
                                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                    Deadline
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        name="deadline"
                                        placeholder="Type here campaign title"
                                        type="date"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>




                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <button 
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        Add New Campaign
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCampaign;