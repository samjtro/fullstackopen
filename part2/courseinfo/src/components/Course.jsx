const Header = ({title}) => {
    return <h1>{title}</h1>
}

const Content = ({part}) => {
    return <p>{part.name} {part.exercises}</p>
}

const Course = ({course}) => {
    return (
        <>
            <Header title={course.name} />
            {course.parts.map((part) => {
                return <Content key={part.id} part={part} />
            })}
            <p>total of {course.parts.reduce((acc, obj) => acc + obj.exercises, 0)} exercises</p>
        </>
    )
}

export default Course