import {StudentCard} from "./StudentCard";
import { useState } from "react";

function StudentList(){

    const [students, setStudents] = useState([
        {
            name: "John Doe",
            email: "john.doe@example.com",
            image: "https://i.pravatar.cc/150?img=36"
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            image: "https://i.pravatar.cc/150?img=37"
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            image: "https://i.pravatar.cc/150?img=37"
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            image: "https://i.pravatar.cc/150?img=37"
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            image: "https://i.pravatar.cc/150?img=37"
        }
    ]);

    const removeStudent = (index) => {
        let studentData = [...students];
        studentData.splice(index, 1);
        setStudents(studentData);
    }

    return (<>
        <div className="student-grid">
            {students.map((student, index) => 
                <StudentCard key={index} aaa={index} student={student} removeStudent={removeStudent} />
            )}
        </div>
    </>);
}



export default StudentList;