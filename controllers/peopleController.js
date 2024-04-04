import People from "../models/People.js";

// Create a new person
async function createPerson(req, res) {
  try {
    const person = new People(req.body);
    const result = await person.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all people
async function getPeople(req, res) {
  try {
    const people = await People.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a specific person by ID
async function getPersonById(req, res) {
  try {
    const person = await People.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a person by ID
async function updatePerson(req, res) {
  try {
    const person = await People.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a person by ID
async function deletePerson(req, res) {
  try {
    const person = await People.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createPerson, getPeople, getPersonById, updatePerson, deletePerson };
