import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";



const DonationForm = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://crowdfunding-server-beta.vercel.app/campaign/${id}`)
      .then(res => res.json())
      .then(data => {
        setCampaign(data);
        setLoading(false);
      });
  }, [id]);


  const isGoalReached = campaign?.total_donation_gained >= campaign?.donation_amount;



  const handleDonationForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = user.displayName;
    const email = user.email;
    const donation_amount = e.target.donation.value;
    const campaign_id = id;



    const newDonation = { name, email, donation_amount, campaign_id, date: new Date() };
    // console.log(newCampaign)
    fetch('https://crowdfunding-server-beta.vercel.app/myDonations', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDonation)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success("Your donation sent successfully!")
          navigate("/myDonations");


        }
      })


    //clear the form after the submission
    form.reset();

  };

  return (
    <div className="w-11/12 mx-auto bg-gray-100 min-h-screen flex items-center justify-center relative">
      {/* Background and other parts... */}
      <div className="relative z-10 bg-white p-8 rounded-md shadow-lg w-11/12 max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Donate Now!</h1>

        {isGoalReached ? (
          <p className="text-red-500 font-semibold text-center mb-4">
            Fundraising goal reached! 💖
          </p>
        ) : null}

        {!loading && (
          <form onSubmit={handleDonationForm}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="donation">
                Donation Amount (Taka)
              </label>
              <input
                id="donation"
                type="number"
                placeholder="Type your amount"
                name="donation"
                className=" border rounded-md py-2 px-3  w-full"
                required
                disabled={isGoalReached}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isGoalReached}
                className={`${isGoalReached ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-700"
                  } text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline`}
              >
                {isGoalReached ? "Goal Reached" : "Donate"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DonationForm;
