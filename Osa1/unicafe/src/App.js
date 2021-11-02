import React, { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = (props) => {
    return (
                <tr>
                    <td>{props.text}</td>
                    <td>{props.value}</td>
                </tr>
    )        
}

const Statistics = (props) => {

    if (props.clicksG === 0 && props.clicksN === 0 && props.clicksB === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticsLine text="Good" value={props.clicksG} />
                    <StatisticsLine text="Neutral" value={props.clicksN} />
                    <StatisticsLine text="Bad" value={props.clicksB} />
                    <StatisticsLine text="All" value={props.clicksG + props.clicksN + props.clicksB} />
                    <StatisticsLine text="Average" value={(props.clicksG - props.clicksB) / (props.clicksG + props.clicksN + props.clicksB)} />
                    <StatisticsLine text="Positive" value={(props.clicksG / (props.clicksG + props.clicksN + props.clicksB)) * 100 + '%'} />
                </tbody>
            </table>
        </div>
    )
}
const App = () => {
    // tallenna napit omaan tilaansa
    const [clicks, setClicks] = useState({
        good: 0, neutral: 0, bad: 0
    })

    const handleGoodClick = () => 
        setClicks({ ...clicks, good: clicks.good + 1 })

    const handleNeutralClick = () =>
        setClicks({ ...clicks, neutral: clicks.neutral + 1 })

    const handleBadClick = () =>
        setClicks({ ...clicks, bad: clicks.bad + 1 })
        

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={handleGoodClick} text="Good" />
            <Button handleClick={handleNeutralClick} text="Neutral" />
            <Button handleClick={handleBadClick} text="Bad" />
            <Statistics clicksG={clicks.good} clicksN={clicks.neutral} clicksB={clicks.bad} />
        </div>
    )
}

export default App
