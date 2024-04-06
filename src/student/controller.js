const pool = require("../../db");
const {
  getAllStudents,
  getStudentById,
  checkEmailExist,
  createNewStudent,
  deleteStudentById,
  updateStudentById,
} = require("./queries");

const getstudents = async (req, res) => {
  pool.query(getAllStudents, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getstudentsbyid = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(getStudentById, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createnewstudents = async (req, res) => {
  const { name, email, age, dob } = req.body;
  // Check if email exists
  pool.query(checkEmailExist, [email], (error, results) => {
    if (results.rows.length > 0) {
      res.status(400).send("Email already exists");
    }
    //add student to db
    pool.query(createNewStudent, [name, email, age, dob], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send("Student create succesfully");
    });
  });
};

const deleteStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(deleteStudentById, [id], (error, results) => {
    if (error) {
      // Handle any errors that occur during the query execution
      console.error("Error executing query:", error.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (results.rowCount === 0) {
      // If no rows were affected, it means no student was found with the provided id
      res.status(404).send("Student not found");
    } else {
      // If at least one row was affected, it means a student was successfully deleted
      res.status(200).send(`Student deleted with ID: ${id}`);
    }
  });
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  // Check if the student exists
  pool.query(getstudentsbyid, [id], (error, results) => {
    if (error) {
      // Handle any errors that occur during the query execution
      console.error("Error executing query:", error.stack);
      res.status(500).send("Internal Server Error");
      return;
    }

    // If no student is found with the provided id
    if (results.rows.length === 0) {
      res.status(404).send("Student not found");
      return;
    }

    // Update the student's name
    pool.query(updateStudentById, [name, id], (error, results) => {
      if (error) {
        // Handle any errors that occur during the query execution
        console.error("Error executing query:", error.stack);
        res.status(500).send("Internal Server Error");
        return;
      }

      // If the update was successful
      res.status(200).send(`Student modified with ID: ${id}`);
    });
  });
};

module.exports = {
  getstudents,
  getstudentsbyid,
  createnewstudents,
  deleteStudent,
  updateStudent,
};
