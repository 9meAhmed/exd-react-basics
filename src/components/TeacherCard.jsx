function TeacherCard({ student }){

    return <>
        <article className="student-card" onClick={() => alert(`Student Name: ${student.name}\nStudent Email: ${student.email}`)}>
            <img className="student-avatar" src={student.image} />
            <div className="student-info">
            <h2>{student.name}</h2>
            <a>{student.email}</a>
            </div>
        </article>
    </>
}

export default TeacherCard;