import { useState } from "react";
import "./styles.css";

const calculateTopRow = ["AC", "+/-", "%"];
const calculateNumbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];
const calculateBottomRow = [0, "."];
const calculateOperations = ["/", "*", "-", "+", "="];

// Still to do:
//  * include error logic using getInputType()
//  * have inputs update as calcString without resetting calcString
//  * include functionality for +/-, %, .

const App = () => {
  const [total, setTotal] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedOperation, setOperation] = useState(null);
  const [selectedFunction, setFunction] = useState(null);
  const [calcString, setCalcString] = useState("");


  let stringTypes = [];

  const updateString = (e, inputType) => {
    setCalcString(calcString + e);
    console.log("calcString", calcString + e);
  };

  const calculateTotal = () => {
    console.log("evaluate");

    let newTotal;
    if (total === 0) {
      newTotal = eval(calcString);
    } else if (total !== 0) {
      const totalString = total.toString();
      newTotal = eval(`${totalString}${calcString}`);
    }

    stringTypes = [];
    setSelectedNumber(null);
    setOperation(null);
    setFunction(null);
    setTotal(newTotal);
    setCalcString("");
  };

  const resetTotal = () => {
    console.log("reset");
    stringTypes = [];
    setSelectedNumber(null);
    setOperation(null);
    setFunction(null);
    setTotal(0);
    setCalcString("");
  };

  return (
    <div className="App">
      <h6 className="inputs">{calcString}</h6>
      <h1 className="total">{total}</h1>
      <div className="buttonsWrapper">
        <div className="nonoperationsWrapper">
          <div className="topWrapper">
            {calculateTopRow.map((element) => {
              return (
                <button
                  onClick={() => {
                    if (element === "AC") {
                      resetTotal();
                    } else {
                      updateString(element, "function");
                    }
                  }}
                >
                  {element}
                </button>
              );
            })}
          </div>
          <div className="numbersWrapper">
            {calculateNumbers.map((number) => {
              return (
                <button
                  onClick={() => {
                    updateString(number, "number");
                  }}
                >
                  {number}
                </button>
              );
            })}
          </div>
          <div className="bottomWrapper">
            <button
              onClick={() => {
                updateString(0, "zero");
              }}
              className="zero"
            >
              <div className="text">0</div>
            </button>
            <button
              onClick={() => {
                updateString(".", "decimalPoint");
              }}
              className="dot"
            >
              .
            </button>
          </div>
        </div>
        <div className="operationsWrapper">
          {calculateOperations.map((operation) => {
            return (
              <button
                onClick={() => {
                  if (operation !== "=") {
                    updateString(operation, "operation");
                  } else if (operation === "=") {
                    calculateTotal();
                  }
                }}
              >
                {operation}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
