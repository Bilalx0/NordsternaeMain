import { useState, useEffect } from 'react';
import useFirebaseCollection from "./useFirebaseCollection"

//Currency management function
const useCurrency = () => {
  const { rates, loadLatestRates } = useFirebaseCollection("currencyRates");
  const [localRates, setLocalRates] = useState({});
  const [rateSubset, setRateSubset] = useState({});
  const [userCurrency, setUserCurrency] = useState('AED');

  useEffect(() => {

    // Check if the rates were updated today
    const lastUpdate = window.localStorage.getItem("lastUpdate");
    const today = new Date().toDateString();
    const storedRates = JSON.parse(window.localStorage.getItem("localRates"));

    if (!storedRates || lastUpdate != today) {
      loadLatestRates();
      window.localStorage.setItem("lastUpdate", new Date().toDateString());
    } else {
      setLocalRates(storedRates);
      setRateSubset(JSON.parse(storedRates.rates));
      }
    }, []);

  useEffect(() => {
      if(rates.hasOwnProperty("rates")) {
        window.localStorage.setItem("localRates", JSON.stringify(rates));
        let localRates = JSON.parse(rates.rates);
        setRateSubset(localRates);
      }
    }, [rates]);

  useEffect(() => {
    const userCurrency = window.localStorage.getItem("userCurrency");
    if (!userCurrency) {
      window.localStorage.setItem("userCurrency", "AED");
      setUserCurrency('AED');
    }
    else {
      setUserCurrency(userCurrency);
    }
  }, []);

  const getPriceInUserCurrency = (value) => {
    if (userCurrency === "AED") {
      return value;
    }
    const currencyToFetch = "AED2" + userCurrency;
    const conversionRate = rateSubset[currencyToFetch];
    const convertedPrice = Math.round(value * conversionRate);
    return convertedPrice;
  };

  const getPriceInAED = (value, fromCurrency) => {
    if (fromCurrency === "AED") {
      return value;
    }
    const currencyToFetch = userCurrency + "2AED";
    const conversionRate = rateSubset[currencyToFetch];
    const convertedPrice = Math.round(value * conversionRate);
    return convertedPrice;
  };

  return { userCurrency, setUserCurrency, getPriceInUserCurrency, getPriceInAED };
};

export default useCurrency;
