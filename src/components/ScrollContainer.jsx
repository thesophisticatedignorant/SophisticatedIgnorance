import CardSlider from './CardSlider'
import CoordinateOverlay from './Debug/CoordinateOverlay'
import './ScrollContainer.css'

function ScrollContainer({ introComplete, onCycleComplete }) {
    return (
        <div className="scroll-container">
            <CardSlider isActive={introComplete} onCycleComplete={onCycleComplete} />
            <CoordinateOverlay />
        </div>
    )
}

export default ScrollContainer
