import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import StudentsTable from './components/StudentsTable';

function App() {
  const [ pagesCount, setPagesCount ] = useState(null)
  const [ list, setList ] = useState(null)
  const [ students, setStudents ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ studentToEdit, setStudentToEdit ] = useState(null)
  const [ searchValue, setSearchValue ] = useState("")

  useEffect(() => {
    if(students){
      if(searchValue !== ""){
        const fliteredStudents = list.filter( student => {
          if( 
            student.first_name.includes(searchValue) 
            || student.last_name.includes(searchValue)
            || student.email.includes(searchValue)
          ){
            return student
          }
        })
    
        setStudents(fliteredStudents)
      } else {
        setStudents(list)
      }
    }
  },[searchValue])

  useEffect(() => {
    if(!students){
      (async function (){
        const res = await fetch('http://localhost:5000/students')
        const data = await res.json()
  
        setList(data.students)
        setStudents(data.students)
        setLoading(false)
      })()
    }
  }, [students])

  return (
    <div className="App">
      <Header 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
        setStudents={setStudents} 
        students={students} 
        studentToEdit={studentToEdit} 
        setStudentToEdit={setStudentToEdit}
      />

      <StudentsTable 
        students={students} 
        setStudents={setStudents}

        setStudentToEdit={setStudentToEdit}
      />
    </div>
  );
}

function paginate(list) {
  /* didn't have enough time :( */
}

export default App;
