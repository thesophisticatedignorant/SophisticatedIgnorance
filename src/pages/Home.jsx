import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import MenuOverlay from '../components/MenuOverlay'
import ScrollContainer from '../components/ScrollContainer'
import LogoIntro from '../components/LogoIntro'
import NewsletterPopup from '../components/NewsletterPopup'
import './Home.css'

function Home() {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [introComplete, setIntroComplete] = useState(false)
    const [showNewsletter, setShowNewsletter] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const handleIntroComplete = () => {
        setIntroComplete(true)
    }

    const handleCycleComplete = () => {
        setShowNewsletter(true)
    }

    const handleNavigateToShop = (sectionId) => {
        if (sectionId) {
            navigate(`/shop#${sectionId}`)
        } else {
            navigate('/shop')
        }
    }

    return (
        <div className="home-page">
            {/* Marble Background with CSS */}
            <div className="marble-overlay"></div>

            {/* Vignette Lighting */}
            <div className="vignette-overlay"></div>

            {/* Gold Specs */}
            <div className="bg-specs"></div>

            {/* Startup Logo Animation */}
            {!introComplete && <LogoIntro onComplete={handleIntroComplete} />}

            {/* Main Content - visible after intro */}
            <Header onMenuClick={toggleMenu} />
            <MenuOverlay
                isOpen={menuOpen}
                onClose={toggleMenu}
                scrollToSection={handleNavigateToShop}
            />
            <ScrollContainer introComplete={introComplete} onCycleComplete={handleCycleComplete} />
            {showNewsletter && <NewsletterPopup onClose={() => setShowNewsletter(false)} />}
        </div>
    )
}

export default Home
