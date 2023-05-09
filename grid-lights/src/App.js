import "./styles.css";
import { useState } from "react";

function Cell({ activated, handleCellClick }) {
  return (
    <div
      className={activated ? "cell activated" : "cell"}
      onClick={handleCellClick}
    ></div>
  );
}

export default function App() {
  const gridConfig = [1, 1, 1, 1, 0, 1, 1, 1, 1];
  const [clickOrder, setClickOrder] = useState([]);

  const handleCellClick = (index) => {
    setClickOrder([...clickOrder, index]);

    if (clickOrder.length === gridConfig.length - 2) {
      const timer = setInterval(() => {
        setClickOrder((origOrder) => {
          const newOrder = origOrder.slice();
          newOrder.pop();
          if (newOrder.length === 0) {
            clearInterval(timer);
          }

          return newOrder;
        });
      }, 300);
    }
  };

  return (
    <div className="App">
      <div className="grid">
        {gridConfig.map((value, index) =>
          value ? (
            <Cell
              key={index}
              activated={clickOrder.includes(index)}
              handleCellClick={() => handleCellClick(index)}
            />
          ) : (
            <span key={index}></span>
          )
        )}
      </div>
      <pre>order array : {clickOrder.join("")}</pre>
    </div>
  );
}
