import React from "react";
import { Link } from "react-router-dom";
import styles from "./activity.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPage, createActivity } from "../../redux/actions";
import { getAllCountries } from "../../redux/actions";

export default function CreateActivity() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const countryToAdd = useSelector((state) => state.allCountries);

  ////////////////LOCALSTATES////////////////////////////////////////////////////////////////////////
  const [input, setInput] = useState({
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState("");

  //////VALIDATIONS, HOW TO MODULE?/////////////////////////////////////////////////////////
  function validateNameInput(value) {
    var textPattern = /^[A-Za-z0-9\s]+$/g;

    if (!textPattern.test(value) && value.length > 0) {
      setError("");
      setError("Don't use special characters!");
    } else {
      setError("");
    }
  }
  function validateDurationInput(value) {
    var textPattern = /^[A-Za-z0-9\s]+$/g;

    if (!textPattern.test(value) && value.length > 0) {
      setError("");
      setError("Don't use special characters!");
    } else {
      setError("");
    }
  }
  function validateNumberInput(value) {
    value > 5 ? setError("Difficulty must be between 1 and 5") : setError("");
  }
  function validateSeasonInput(value) {
    if (value === "Select") {
      setError("Select a Season");
    }
  }
  /////////THE SUPER-HANDLE/////////////////////////////////////////////////////////////////////////
  function handleChange(e) {
    const { value, name } = e.target;
    e.preventDefault();
    switch (name) {
      case "name":
        validateNameInput(input.name);
        setInput({
          ...input,
          [name]: value,
        });
        break;
      case "duration":
        validateDurationInput(input.duration);
        setInput({
          ...input,
          [name]: value,
        });
        break;
      case "difficulty":
        validateNumberInput(input.difficulty);
        setInput({
          ...input,
          [name]: value,
        });
        break;
      case "season":
        validateSeasonInput(input.season);
        setInput({
          ...input,
          [name]: value[0],
        });
      case "countries":
        validateNameInput(input.countries);
        setInput({
          ...input,
          [name]: [value],
        });
        break;

      default:
        break;
    }
  }

  ////////MIX INFORMATION/////////////////////////////////////////////////////////////////
  function handleClick(e) {
    // e.preventDefault();

    dispatch(createActivity(input));

    setInput({
      ...input,
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    alert("Activity Added to Countries");
  }

  //////////////////////////Countries////////////////////////////
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = async () => {
    setArr((s) => {
      const lastId = s[s.length - 1].id;
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };
  const handleChangeCountries = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      const addCountries = newArr.map((input) => input.value);
      setInput({
        ...input,
        countries: [...addCountries],
      });

      console.log(newArr, "ITEMAGREGADO");
      return newArr;
    });
  };
  /////////RENDER////////////////////////////////////
  return (
    <div>
      <Link to={"/countries"} /*onClick={() => handleClick()}*/>
        <button className="filterbutton">Home</button>
      </Link>

      <label className="infolabel" htmlFor="">
        Here you can create activities, add'em to countries and make the
        Activities Atlas Bigger
      </label>
      {/* 
      <div>{!error ? null : <div>{error}</div>}</div> */}

      <form className="formActivity">
        <div className="formstructure">
          <div className="transparentdiv">
            <div className="firstColumn">
              <div className="namediv">
                <div className="labelinputdiv">
                  <label htmlFor="name">Name:</label>
                  <input
                    size="50px"
                    className="filterbutton"
                    id="name"
                    name="name"
                    // value={input.name}
                    required={true}
                    placeholder="Activity..."
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="durationdiv">
                {" "}
                <div className="labelinputdiv">
                  <label htmlFor="duration">Duration:</label>
                  <input
                    className="filterbutton"
                    id="duration"
                    name="duration"
                    // value={input.duration}
                    required={true}
                    placeholder="All Day..."
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="difficultydiv">
                <div className="labelinputdiv">
                  <label htmlFor="difficulty">Difficulty:</label>
                  <input
                    className="filterbutton"
                    id="difficulty"
                    name="difficulty"
                    min="1"
                    max="5"
                    // value={input.difficulty}
                    required={true}
                    placeholder="1 to 5"
                    type="number"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="seasonDiv">
                <div className="labelinputdiv">
                  <label htmlFor="season">Season: </label>

                  <select
                    className="filterbutton"
                    name="season"
                    required={true}
                    placeholder="Select..."
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="Select">Select...</option>
                    <option value="All Year">All Year</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                  </select>
                </div>
                <label className="error">{error}</label>
              </div>
            </div>
          </div>

          <div className="transparentdiv">
            <div className="thirdcolumn">
              <label className="infolabel" htmlFor="countries">
                Add Countries:{" "}
              </label>
              {arr.map((item, i) => {
                return (
                  <div>
                    <input
                      className="addbutton"
                      list="Country"
                      onChange={handleChangeCountries}
                      value={item.value}
                      id={i}
                      type="text"
                      name="countries"
                      required={true}
                      placeholder="Search a Country..."
                    />

                    <datalist id="Country">
                      {countryToAdd.map((country) => {
                        return (
                          <option
                            value={
                              country.name === undefined
                                ? countryToAdd
                                : country.name
                            }
                          />
                        );
                      })}
                    </datalist>
                  </div>
                );
              })}
            </div>
            <button className="filterbutton" onClick={addInput}>
              <h2>Add more countries...</h2>
            </button>
          </div>
        </div>
        <br />

        <button
          className="filterbutton"
          type="submit"
          value="Create Now"
          onClick={(e) => handleClick(e)}
        >
          <h1 className="activitybuttonh1">CREATE ACTIVITY NOW</h1>
        </button>
      </form>

      <footer>Made with love By Tablonimus</footer>
    </div>
  );
}
