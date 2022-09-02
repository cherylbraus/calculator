import { useState } from "react";
import "./styles.css";

const calculateTopRow = ["AC", "+/-", "%"];
const calculateNumbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];
const calculateBottomRow = [0, "."];
const calculateOperations = ["/", "*", "-", "+", "="];

const App = () => {
  const [total, setTotal] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedOperation, setOperation] = useState(null);
  const [selectedFunction, setFunction] = useState(null);
  const [inputs, setInputs] = useState(null);

  // to be used later for error checking logic
  const getInputType = (d) => {
    if (
      calculateNumbers.includes(d) ||
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(d)
    ) {
      return "nonZeroNumber";
    } else if (d === 0 || d === "0") {
      return "zeroNumber";
    } else if (d === "AC") {
      return "reset";
    } else if (d === "+/-") {
      return "changeSign";
    } else if (d === "%") {
      return "percentage";
    } else if (d === "/") {
      return "divide";
    } else if (d === "x") {
      return "multiply";
    } else if (d === "-") {
      return "subtract";
    } else if (d === "+") {
      return "add";
    } else if (d === "=") {
      return "equals";
    } else if (d === ".") {
      return "decimalPoint";
    }
  };

  let calcString = "";
  let stringTypes = [];

  const updateString = (e, inputType) => {
    const currType = getInputType(e);
    stringTypes.push(currType);

    const priorVal = calcString[calcString.length - 1];
    const priorType = getInputType(priorVal);

    calcString += e;
    // setInputs(calcString);
    // console.log("e", e);
    // console.log("inputType", inputType);
    // console.log(priorVal, priorType);
    // console.log(e, currType);
    console.log("calcString", calcString);
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

    calcString = "";
    stringTypes = [];
    setSelectedNumber(null);
    setOperation(null);
    setFunction(null);
    setTotal(newTotal);
  };

  const resetTotal = () => {
    console.log("reset");
    calcString = "";
    stringTypes = [];
    setSelectedNumber(null);
    setOperation(null);
    setFunction(null);
    setTotal(0);
  };

  return (
    <div className="App">
      <h6 className="inputs">{inputs}</h6>
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
