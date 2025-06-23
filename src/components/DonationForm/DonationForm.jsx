import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";


const DonationForm = () => {

    const { user} = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    console.log(id);
    

    

  

    const handleDonationForm = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = user.displayName;
        const email = user.email;
        const donation_amount = e.target.donation.value;
    
         const campaign_id = id;
        

         const newDonation = { name, email,  donation_amount, campaign_id };
       // console.log(newCampaign)
        fetch('http://localhost:5000/addDonations', {
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
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://source.unsplash.com/random/1920x1080"
                    alt="Background"
                    className="w-full h-full object-cover filter blur-lg brightness-50"
                />
            </div>

            {/* Donation Form */}
            <div className="relative z-10 bg-white p-8 rounded-md shadow-lg w-11/12 max-w-md">
                <h1 className="text-xl font-bold mb-4 text-center">Donate Now!</h1>
                <form onSubmit={handleDonationForm}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="donation"
                        >
                            Donation Amount (Taka)
                        </label>
                        <input
                            id="donation"
                            type="number"
                            placeholder="Type your amount"
                            name = "donation"
                            className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        >
                            Donate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonationForm;
