import React, { useState, useEffect } from 'react';

const Header = ({ searchValue, setSearchValue, setStudents, students, studentToEdit, setStudentToEdit  }) => {
    const [ showAddForm, setShowAddForm ] = useState(false)

    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ birthDate, setBirthDate ] = useState("")
    const [ email, setEmail ] = useState("")

    useEffect(() => {
        if(studentToEdit){
            setFirstName(studentToEdit.first_name)
            setLastName(studentToEdit.last_name)
            setBirthDate(studentToEdit.birth_date)
            setEmail(studentToEdit.email)
            setShowAddForm(true)
        }
    }, [studentToEdit])


    const addStudent = async (ev) => {
        ev.preventDefault()

        if( firstName === "" || lastName === "" || birthDate === "" || email === "" ) return ;

        if( !email.toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) 
        ) {
            console.log("email not valid");
            return
        }

        let date = new Date(birthDate).getTime()
        let todayDate = new Date().getTime()

        if( 
            date > todayDate
        ) {
            console.log("date not valid");
            return
        }

        try {
            if(studentToEdit){
                const res = await fetch(`http://localhost:5000/students/${studentToEdit._id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ first_name: firstName, last_name: lastName, birth_date: birthDate, email })
                })

                const data = await res.json()

                const newStudents = students.map( st => {
                    if( st._id === data.student._id ){
                       return data.student
                    } else {
                        return st
                    }
                })

                setStudents( newStudents )
            } else {
                const res = await fetch('http://localhost:5000/students', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ first_name: firstName, last_name: lastName, birth_date: birthDate, email })
                })

                const data = await res.json()

                setStudents([ data.student, ...students ])
            }
        } catch (error) {
            console.log("STUDENT NOT CREATED:", error);
        }
    }

    const toggleAddForm = () => {

        setStudentToEdit(null)
        setFirstName("")
        setLastName("")
        setBirthDate("")
        setEmail("")
 
        setShowAddForm(!showAddForm)
    }

    return (
        <header className="app-header">
            <div className="head">
                <form>
                    <input
                        type="text"
                        placeholder="Search a student"
                        value={searchValue} 
                        onChange={ ev => setSearchValue(ev.target.value) }

                     />
                </form>

                <button onClick={toggleAddForm} >
                    { !showAddForm ? "Add a new student" : "cancel" }
                </button>
            </div>

            { showAddForm && (
                <form className="add-student-form" onSubmit={ (ev) => addStudent(ev) }>
                    <div>
                        <label>Firstname</label>
                        <input 
                            type="text" 
                            placeholder="Firstname" 
                            value={firstName} 
                            onChange={ev => setFirstName(ev.target.value)}  
                        />
                    </div>
                    <div>
                        <label>Lastname</label>
                        <input type="text" 
                            placeholder="Lastname" 
                            value={lastName} 
                            onChange={ev => setLastName(ev.target.value)}  
                        />
                    </div>
                    <div>
                        <label>Birth Date</label>
                        <input 
                            type="date" 
                            placeholder="Birth date" 
                            value={birthDate} 
                            onChange={ev => setBirthDate(ev.target.value)}  
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input 
                            type="text" 
                            placeholder="Email"
                            value={email} 
                            onChange={ev => setEmail(ev.target.value) }  
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            )}
        </header>
    );
};

export default Header;
