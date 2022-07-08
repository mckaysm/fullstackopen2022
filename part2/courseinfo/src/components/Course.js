
const Course = ({course}) => 
<>
  <Header name={course.name}/>
  <Content parts={course.parts}/>
  <Total parts={course.parts}/>
</>

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) =>
<>
{parts && parts.length > 0 && parts.map(p => <Part key={p.id} part={p}/>)}
</>

const Part = ({ part }) => {
return (
<p>
  {part.name} {part.exercises}
</p>)
}

const Total = ({ parts }) => {
const total = parts.reduce((s, e) => {
  return s + e.exercises
}, 0) //Running total will be a number, can't take .exercises of it
return (<b><p>Number of exercises {total}</p></b>)
}

export default Course