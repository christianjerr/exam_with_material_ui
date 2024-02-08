import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as model from "../../redux/models";
import * as actions from "../../redux/actions";
import { itemRes, itemStates } from "../../redux/selectors";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const WarningTextTypography = withStyles({
  root: {
    color: "white",
    background: "#6d4c41",
    padding: "10px",
    width: "300px",
    margin: "0 auto",
  },
})(Typography);

const Main = () => {
  const [initialStates, setInitialStates] = useState("");
  const [initialCountry, setInitialCountry] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getItem.request({}));
  }, [dispatch]);

  const initial = useSelector((state: model.InitialStateTypes) =>
    itemRes(state)
  );

  const statesSelector = useSelector((state: model.InitialStateTypes) =>
    itemStates(state)
  );

  const handleStateChange = useCallback((e: any) => {
    setInitialStates("");
    setInitialStates(e.target.value);
  }, []);
  const handleCountryChange = useCallback((e: any) => {
    setInitialCountry("");
    setInitialCountry(e.target.value);
  }, []);

  const memoizeCountries = useMemo(() => {
    return initial.map((item) => (
      <FormControl fullWidth key={item.id}>
        <InputLabel>Country</InputLabel>
        <Select
          label="countries"
          value={initialCountry}
          onChange={handleCountryChange}
        >
          <MenuItem key={item.code} value={item.name}>
            {item.name}
          </MenuItem>
        </Select>
      </FormControl>
    ));
  }, [handleCountryChange, initial, initialCountry]);

  const memoizeState = useMemo(() => {
    return initial.map((item) => (
      <FormControl fullWidth>
        <InputLabel>States</InputLabel>
        <Select
          value={initialStates}
          label="states"
          onChange={handleStateChange}
        >
          {item.states.map((state) => (
            <MenuItem key={state.code} value={state.name}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ));
  }, [handleStateChange, initial, initialStates]);

  const memoizedCities = useMemo(() => {
    const selected = statesSelector.map((item) =>
      item.filter((s) => s.name === initialStates)
    );

    return (
      initialCountry &&
      selected[0].map((item) => (
        <Grid container spacing={3}>
          {item.cities.map((ci) => (
            <Grid item xs={6} md={3}>
              <Box
                component="section"
                sx={{
                  p: 2,
                  bgcolor: "#795548",
                  color: "white",
                }}
                key={ci.name}
              >
                <p>{ci.name}</p>
                <br />
                <p>
                  {ci.population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                <p>Citizens</p>
                <br />
              </Box>
            </Grid>
          ))}
        </Grid>
      ))
    );
  }, [initialCountry, initialStates, statesSelector]);

  const memoizeTotalCitizens = useMemo(() => {
    const selected = statesSelector.map((item) =>
      item.filter((s) => s.name === initialStates)
    );
    const cities = selected[0].map((item) => item.cities);

    var sum = cities[0]?.reduce((a: any, b: any) => {
      return a + b.population;
    }, 0);
    return sum;
  }, [initialStates, statesSelector]);

  const memoizeWelcomePage = useMemo(() => {
    return initialStates && initialCountry ? (
      <>
        <Typography align="left">
          Total Citizen:{" "}
          {memoizeTotalCitizens
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
        <Typography align="left">Cities:</Typography>
      </>
    ) : (
      <WarningTextTypography align="center">
        Please choose country and state
      </WarningTextTypography>
    );
  }, [initialCountry, initialStates, memoizeTotalCitizens]);

  return (
    <Box sx={{ padding: 40 }}>
      <Box sx={{ paddingBottom: 30 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            {memoizeCountries}
          </Grid>
          <Grid item xs={6}>
            {memoizeState}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ paddingBottom: 30 }}>{memoizeWelcomePage}</Box>
      {memoizedCities}
    </Box>
  );
};
export default Main;
