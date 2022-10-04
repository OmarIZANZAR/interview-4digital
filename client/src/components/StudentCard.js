import PropTypes from 'prop-types';

const StudentCard = ({ student, setStudentToEdit, students, setStudents }) => {

    const deleteStudent = async () => {
        try {
            const res = await fetch(`http://localhost:5000/students/${student._id}`, { method: "DELETE" })
            const data = await res.json()

            const newStudents = students.filter( st => st._id !== data.student._id )

            setStudents( newStudents )
        } catch (error) {
            console.log("STUDENT NOT DELETED:", error);
        }
    }

    const dateNow = new Date().getFullYear()
    const date = new Date(student.birth_date).getFullYear()
    console.log(dateNow - date)

    return (
        <div className="student-card">
            <div className="info">
                <p><strong>Lastname:</strong> { student.last_name }</p>
                <p><strong>Firsttname:</strong> { student.first_name }</p>
                <p><strong>Age:</strong> { student.birth_date }</p>
                <p><strong>Email:</strong> { student.email }</p>
            </div>
            <div className="controls">
                <button className="edit" onClick={() => setStudentToEdit(student)}>Edit</button>
                <button className="delete" onClick={deleteStudent}>Delete</button>
            </div>
        </div>
    );
};

StudentCard.propTypes = {};

export default StudentCard;
