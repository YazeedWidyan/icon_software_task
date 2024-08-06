import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import PersonDetails from "./components/PersonDetails";
import PersonForm from "./components/PersonForm";
import {
  fetchPeopleFromAPI,
  savePersonToAPI,
  updatePersonInAPI,
  deletePersonFromAPI,
} from "./services/personService";
import "./App.css";

const App = () => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    description: "",
    dob: "",
    is_male: null,
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch people from API on component mount
  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await fetchPeopleFromAPI();
        if (Array.isArray(data.data)) {
          setPeople(data.data);
        } else {
          console.error("API data is not an array");
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadPeople();
  }, []);

  // Sync localStorage with people state on update
  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPerson({
      ...person,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = { ...person };
      delete requestData.id; // Ensure ID is not sent in the request

      if (isEditing) {
        await updatePersonInAPI(person.id, requestData);
      } else {
        await savePersonToAPI(person);
      }

      // Refetch people from API to get the latest data
      const data = await fetchPeopleFromAPI();
      if (Array.isArray(data.data)) {
        setPeople(data.data);
      }

      setPerson({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        description: "",
        dob: "",
        is_male: null,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save or update person:", error);
    }
  };

  const handleEdit = (index) => {
    setPerson(people[index]);
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      try {
        await deletePersonFromAPI(people[index].id);
        // Refetch people from API to get the latest data
        const data = await fetchPeopleFromAPI();
        if (Array.isArray(data.data)) {
          setPeople(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredPeople = people.filter(
    (p) =>
      p.first_name.toLowerCase().includes(search.toLowerCase()) ||
      p.last_name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">People Management</h1>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setIsEditing(false);
          setPerson({
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            description: "",
            dob: "",
            is_male: null,
          });
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Person
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-700 bg-gray-800 text-gray-200 rounded w-full py-2 px-3 mb-4"
      />
      <ul className="space-y-4">
        {filteredPeople.map((p, index) => (
          <PersonDetails
            key={p.id} // Use person ID for unique key
            personId={p.id}
            person={p}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PersonForm
          person={person}
          isEditing={isEditing}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default App;
