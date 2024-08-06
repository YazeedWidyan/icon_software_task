import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPersonById } from "../services/personService";

const PersonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPerson = async () => {
      try {
        const foundPerson = await fetchPersonById(id);
        setPerson(foundPerson);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPerson();
  }, [id]);

  if (loading)
    return <p className="text-gray-100 bg-gray-900 h-screen">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (person === null) return <p className="text-gray-100">Person not found</p>;

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
            {/* Placeholder for profile picture */}
            <img
              src={`https://ui-avatars.com/api/?name=${person.first_name}+${person.last_name}&background=4a5568&color=white`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold mb-2">
              {person.first_name} {person.middle_name} {person.last_name}
            </h1>
            <p className="text-lg text-gray-400 mb-2">{person.email}</p>
            <p className="text-gray-400">{person.dob}</p>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-300">{person.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Gender</h2>
          <p className="text-gray-300">
            {person.is_male === null
              ? "Not Specified"
              : person.is_male
              ? "Male"
              : "Female"}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PersonDetailPage;
