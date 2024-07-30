const Header = ({title}) => {
    return <h1>{title}</h1>
}
const Content = ({part}) => {
    return <p>{part.name} {part.exercises}</p>
}
const Course = ({course}) => {
    var sum = 0
    course.parts.map((part) => {sum += part.exercises})
    return (
        <>
            <Header title={course.name} />
            {course.parts.map((part) => {
                return <Content key={part.id} part={part} />
            })}
            <p>total of {sum} exercises</p>
        </>
    )
}
const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
        },
        {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
        },
        {
            name: 'State of a component',
            exercises: 14,
            id: 3
        }
        ]
    }
    
    return <Course course={course} />
}
  
export default App