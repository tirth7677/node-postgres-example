const getAllStudents = "SELECT * FROM students;";
const getStudentById = "SELECT * FROM students WHERE id = $1;"; //$1 is a parameter
const checkEmailExist = "SELECT * FROM students WHERE email = $1;";
const createNewStudent =
  "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4) RETURNING *;";
const deleteStudentById = "DELETE FROM students WHERE id = $1;";
const updateStudentById =
  "UPDATE students SET name = $1 WHERE id = $2 RETURNING *;";

module.exports = {
  getAllStudents,
  getStudentById,
  checkEmailExist,
  createNewStudent,
  deleteStudentById,
  updateStudentById,
};
