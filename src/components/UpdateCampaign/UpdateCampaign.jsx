import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const UpdateCampaign = () => {
  const singleCampaignData = useLoaderData();
  const { photoURL, campaign_title, campaign_type, description, donation_amount, deadline } = singleCampaignData;
  


  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [photo, setPhoto] = useState(photoURL);
  const [title, setTitle] = useState(campaign_title);
  const [type, setType] = useState(campaign_type);
  const [newDescription, setNewDescription] = useState(description);
  const [amount, setAmount] = useState(donation_amount);
  const [newDeadline, setNewDeadline] = useState(deadline);

  const handleUpdateCampaign = e => {
    e.preventDefault();

    const form = e.target;

    const updatedCampaign = {
      userName: user.displayName,
      email: user.email,
      photoURL: form.photo.value,
      campaign_title: form.campaign_title.value,
      campaign_type: form.campaign_type.value,
      description: form.description.value,
      donation_amount: form.donation_amount.value,
      deadline: form.deadline.value
    };

    fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCampaign)
    })
      .then(data => {
        if (data.matchedCount === 0) {
          toast.error("Campaign not found.");
        } else if (data.modifiedCount === 0) {
          toast("No changes detected.");
        } else {
          toast.success("Campaign updated successfully!");
          navigate("/campaigns");
        }
      })
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Campaign
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleUpdateCampaign}>

              {/* Photo URL */}
              <div className="mt-4">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Campaign Title */}
              <div className="mt-4">
                <label htmlFor="campaign_title" className="block text-sm font-medium text-gray-700">
                  Campaign Title
                </label>
                <input
                  id="campaign_title"
                  name="campaign_title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Campaign Type */}
              <div className="mt-4">
                <label htmlFor="campaign_type" className="block text-sm font-medium text-gray-700">
                  Campaign Type
                </label>
                <select
                  id="campaign_type"
                  name="campaign_type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">-- Select Type --</option>
                  <option value="personal issue">Personal Issue</option>
                  <option value="startup">Startup</option>
                  <option value="business">Business</option>
                  <option value="creative ideas">Creative Ideas</option>
                </select>
              </div>

              {/* Description */}
              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  maxLength={600}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                ></textarea>
              </div>

              {/* Donation Amount */}
              <div className="mt-4">
                <label htmlFor="donation_amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount
                </label>
                <input
                  id="donation_amount"
                  name="donation_amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Deadline */}
              <div className="mt-4">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 transition"
                >
                  Update Campaign
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCampaign;
