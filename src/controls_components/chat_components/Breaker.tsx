import React from 'react';
import '../../css/chat.css';
import { weekDay } from '../../utils/weekDay'

interface BreakerProps {
    date: Date
}

function Breaker(props: BreakerProps) {
    return (
        <div className="breaker">{props.date.toLocaleDateString() === new Date().toLocaleDateString() ? "today" : weekDay[props.date.getDay()] + ", " + props.date.toLocaleDateString()}</div>
    );
}

export default Breaker;