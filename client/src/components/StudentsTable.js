import React from 'react'
import StudentCard from './StudentCard';

const StudentsTable = ({ students, setStudentToEdit, setStudents }) => {
    if(!students){
        return (
            <div className="empty-students-list">
                <p>no students</p>
            </div>
        )
    } else {
        return (
            <div className="students-list">
                { students.map( student => 
                    <StudentCard 
                        student={student} 
                        key={student._id} 
                        
                        setStudentToEdit={setStudentToEdit}

                        students={students}
                        setStudents={setStudents}
                    />
                )}
            </div>
        )
    }
};

export default StudentsTable;
