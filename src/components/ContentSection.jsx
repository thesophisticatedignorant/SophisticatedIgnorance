import './ContentSection.css'

function ContentSection({ type, title, subtitle, bgColor, image, isActive }) {
    return (
        <section
            className={`content-section ${isActive ? 'active' : ''}`}
            style={{ backgroundColor: bgColor || '#000' }}
        >
            {image && <img src={image} alt={title} className="section-image" />}
            <div className="section-content">
                <h2 className="section-title">{title}</h2>
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
            </div>
        </section>
    )
}

export default ContentSection
