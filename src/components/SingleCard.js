import "./SingleCard.css";

function SingleCard({ cardData, handleChoice, flipped, disabled }) {
  const handleClickEvent = () => {
    if (!disabled) {
      handleChoice(cardData);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={cardData.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          alt="card back"
          onClick={handleClickEvent}
        />
      </div>
    </div>
  );
}

export default SingleCard;
