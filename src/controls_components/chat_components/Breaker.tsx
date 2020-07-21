import React from 'react';
import '../../css/chat.css';

interface BreakerProps {
    date: Date
}

function Breaker(props: BreakerProps) {
return(
<div className="breaker">{props.date.toLocaleDateString()}</div>
);
}

export default Breaker;