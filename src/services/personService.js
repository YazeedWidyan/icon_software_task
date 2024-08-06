// src/services/personService.js
const API_URL = "https://sendmail.iconsjo.space/REST/ppl";

export const fetchPeopleFromAPI = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};
export const fetchPersonById = async (id) => {
  const data = await fetchPeopleFromAPI();
  if (!Array.isArray(data.data)) throw new Error("API data is not an array");

  const person = data.data.find((p) => p.id === id);
  if (!person) throw new Error("Person not found");

  return person;
};
export const savePersonToAPI = async (person) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) throw new Error("Failed to save data");
  return response.json();
};

export const updatePersonInAPI = async (id, person) => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) throw new Error("Failed to update data");
  return response.json();
};

export const deletePersonFromAPI = async (id) => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete data");
};
