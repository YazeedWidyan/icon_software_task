import React from "react";
import { useNavigate } from "react-router-dom";

const PersonDetails = ({ person, onEdit, onDelete, personId }) => {
  const navigate = useNavigate();

  return (
    <li
      className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer text-gray-100"
      onClick={() => navigate(`/person/${personId}`)}
    >
      <div>
        <p className="text-lg font-semibold">
          {person.first_name} {person.last_name}
        </p>
        <p className="text-gray-400">{person.email}</p>
        <p className="text-gray-400">{person.dob}</p>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default PersonDetails;
