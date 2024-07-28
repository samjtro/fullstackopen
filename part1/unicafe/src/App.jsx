import { useState } from "react"

const Button = ({onClick, text}) => {
    return (
        <>
            <button onClick={onClick}>{text}</button>
        </>
    )
}

const StatisticLine = ({text, val}) => {
    if (text === "pos") {
        return (
            <><td>{text}: {val}%</td></>
        )
    }
    return (
        <><td>{text}: {val}</td></>
    )
}

const Statistics = ({feedback}) => {
    if((feedback.good + feedback.neutral + feedback.bad) === 0) {
        return (
            <>
                <h1>statistics</h1>
                <p>no feedback found...</p>
            </>
        )
    }
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tr><StatisticLine text="good" val={feedback.good} /></tr>
                <tr><StatisticLine text="neutral" val={feedback.neutral} /></tr>
                <tr><StatisticLine text="bad" val={feedback.bad} /></tr>
                <tr><StatisticLine text="all" val={feedback.good + feedback.bad + feedback.neutral} /></tr>
                <tr><StatisticLine text="avg" val={Math.round(((feedback.good - feedback.bad) / (feedback.good + feedback.neutral + feedback.bad) * 1) * 10) / 10} /></tr>
                <tr><StatisticLine text="pos" val={Math.round(((feedback.good) / (feedback.good + feedback.neutral + feedback.bad) * 100) * 10) / 10} /></tr>
            </table>
        </>
    )
}

const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0, neutral: 0, bad: 0
    })
    const handleGoodClick = () => setFeedback({...feedback, good: feedback.good + 1})
    const handleNeutralClick = () => setFeedback({...feedback, neutral: feedback.neutral + 1})
    const handleBadClick = () => setFeedback({...feedback, bad: feedback.bad + 1})
    return (
        <>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="neutral" />
            <Button onClick={handleBadClick} text="bad" />
            <Statistics feedback={feedback} />
        </>
    )
}

export default App