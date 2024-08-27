import People from "../models/People.js";
import APIFeatures from "../utils/apiFeatures.js";

// Create a new person
async function createPerson(req, res) {
  try {
    // Ensure conditional fields are provided
    if (req.body.nature === "WORKER_UNDER_CONTRACTOR" && !req.body.contractorId) {
      return res.status(400).json({ message: "contractorId is required for WORKER_UNDER_CONTRACTOR." });
    }
    if (req.body.nature === "EMPLOYEE" && !req.body.employeeId) {
      return res.status(400).json({ message: "employeeId is required for EMPLOYEE." });
    }

    const person = new People(req.body);
    const result = await person.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all people
const getPeople = async (req, res, next) => {
  try {
    const features = new APIFeatures(People.find(), req.query)
      // .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const people = await features.query;

    res.status(200).json({
      status: "success",
      results: people.length,
      data: {
        people,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    // Fetch the current person data
    const currentPerson = await People.findById(req.params.id);
    if (!currentPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    if (req.body.nature) {
      if (req.body.nature === "WORKER_UNDER_CONTRACTOR" && !req.body.contractorId) {
        return res.status(400).json({ message: "contractorId is required for WORKER_UNDER_CONTRACTOR." });
      }
      if (req.body.nature === "EMPLOYEE" && !req.body.employeeId) {
        return res.status(400).json({ message: "employeeId is required for EMPLOYEE." });
      }
    }

    const person = await People.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
