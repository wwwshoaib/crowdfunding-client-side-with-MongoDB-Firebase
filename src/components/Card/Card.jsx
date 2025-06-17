import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ campaign }) => {
  const { photoURL, campaign_title, campaign_type, description, donation_amount, deadline, _id } = campaign;

  // Function to get first 30 words
  const getShortDescription = (text) => {
    const words = text.split(" ");
    if (words.length <= 20) return text;
    return words.slice(0, 20).join(" ") + "...";
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-[600px] flex flex-col">
      <div>
        <img
          src={photoURL}
          alt={campaign_title}
          className="w-full h-72 object-cover rounded-md mb-4"
        />

        <h4 className="text-lg font-semibold mb-2">{campaign_title}</h4>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Campaign Type:</strong> {campaign_type}
        </p>

        <p className="text-sm text-gray-600 ">{getShortDescription(description)} &nbsp;
          {/* Link button to details page */}
          <Link
            to={`/campaign/${_id}`}
            className="font-bold"
          >
            See Details
          </Link>
        </p>
      </div>

      <div className="mt-auto">
        <p className="text-sm text-gray-500 mb-1">
          <strong>Target:</strong> Tk. {donation_amount}
        </p>
        <p className="text-sm text-gray-500 mb-3">
          <strong>Deadline:</strong> {deadline}
        </p>

        <div className="text-center">
          <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition">
           
              <Link
                to={`/campaign/${_id}`}
                className="font-bold"
              >
                See More
              </Link>
            

          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  campaign: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    campaign_title: PropTypes.string,
    campaign_type: PropTypes.string,
    description: PropTypes.string,
    donation_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deadline: PropTypes.string,
  }).isRequired,
};

export default Card;
