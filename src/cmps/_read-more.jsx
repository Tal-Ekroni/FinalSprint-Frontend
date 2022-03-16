export function ReadMore({txt, onToogleReadModal}) {
    return (
        <section className="read-more-popup-container">
            <div className="read-more-popup">
                <div className="close-btn"><p onClick={onToogleReadModal}> x </p></div>
                <div className="read-more-container">
                    <p>{txt}</p>
                </div>
                <div className="close-btn">
                    <p onClick={onToogleReadModal} >Close</p>
                </div>
            </div>
        </section>
    )
}