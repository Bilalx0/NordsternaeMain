import { useState, useEffect } from 'react';

//Currency management function
const useMetric = () => {
  const sqftosqm = 0.092903;
  const [userUnits, setUserUnits] = useState('american');

  useEffect(() => {
    const userUnit = window.localStorage.getItem("userUnits");
    if (!userUnit) {
      window.localStorage.setItem("userUnits", "american");
      setUserUnits('american');
    }
    else {
      setUserUnits(userUnit);
    }
  }, []);

  const getAreaInUserUnits = (value) => {
    if (userUnits === "american") {
      return value;
    }
    else return Math.round(value*sqftosqm);
  };

  return { userUnits, setUserUnits, getAreaInUserUnits };
};

export default useMetric;
