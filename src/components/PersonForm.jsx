import React from "react";

const PersonForm = ({
  person,
  isEditing,
  handleChange,
  handleSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-gray-100">
      <div className="flex items-center justify-center gap-2">
        <div>
          <label className="block mb-1 font-semibold">First Name</label>
          <input
            type="text"
            name="first_name"
            value={person.first_name}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-gray-200 rounded w-full py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Middle Name</label>
          <input
            type="text"
            name="middle_name"
            value={person.middle_name}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-gray-200 rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={person.last_name}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-gray-200 rounded w-full py-2 px-3"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={person.email}
          onChange={handleChange}
          className="border border-gray-700 bg-gray-800 text-gray-200 rounded w-full py-2 px-3"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          value={person.description}
          onChange={handleChange}
          className="border border-gray-700 bg-gray-800 text-gray-200 rounded w-full py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={person.dob}
          onChange={handleChange}
          className="border border-gray-700 bg-gray-800 text-gray-200 rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="flex items-center text-gray-100">
        <input
          type="checkbox"
          name="is_male"
          checked={person.is_male || false}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="font-semibold">Is Male</label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {isEditing ? "Update Person" : "Add Person"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-600 text-white px-4 py-2 rounded w-full"
      >
        Cancel
      </button>
    </form>
  );
};

export default PersonForm;
