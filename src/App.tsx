import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { BudgetChart } from "./budget-chart";
import PriorityArea from "./components/priority-area/priority-area";
import SelectedYearContext from "./selected-year-context";
import {
  ActivityData,
  fetchDataPerActivity,
  fetchDataPerAreaIndicator,
  fetchDataPerModule,
  IndicatorData,
  ModuleData,
} from "./services/data";

interface AppProps {}
interface AppState {
  moduleData: ModuleData[];
  activityData: ActivityData[];
  indicatorData: IndicatorData[];
  selectedYear: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      moduleData: [],
      activityData: [],
      indicatorData: [],
      selectedYear: 0,
    };
  }

  async componentDidMount() {
    try {
      const moduleData = await fetchDataPerModule();
      const activityData = await fetchDataPerActivity();
      const indicatorData = await fetchDataPerAreaIndicator();
      let selectedYear = 0;

      const allYears = Array.from(
        new Set(moduleData.map((d) => d.year))
      ).sort();

      if (allYears.length > 0) {
        selectedYear = allYears[allYears.length - 1];
      }
      this.setState({ moduleData, activityData, indicatorData, selectedYear });
    } catch (e) {
      console.log(e);
    }
  }

  setSelectedYear(year: number) {
    this.setState({ ...this.state, selectedYear: year });
  }

  filterByYear<T extends { year: number }>(data: T[]): T[] {
    return data.filter((d) => d.year === this.state.selectedYear);
  }

  getAvailableYears(): number[] {
    const { moduleData, activityData } = this.state;
    return Array.from(
      new Set(
        activityData.map((d) => d.year).concat(moduleData.map((d) => d.year))
      )
    ).sort();
  }

  render() {
    const { moduleData, activityData, indicatorData, selectedYear } = this.state;
    const [yearModuleData, yearActivityData] = [
      this.filterByYear(moduleData),
      this.filterByYear(activityData),
    ];
    return (
      <SelectedYearContext.Provider
        value={{
          selectedYear,
          availableYears: this.getAvailableYears(),
          setSelectedYear: (y) => this.setSelectedYear(y),
        }}
      >
        <div className="App">
          <Switch>
            <Route path="/all-areas">
              <BudgetChart budgetData={yearModuleData} />
            </Route>
            <Route path="/priority-area/:id">
              <PriorityArea
                budgetData={yearModuleData}
                activityData={yearActivityData}
                indicatorData={indicatorData}
              />
            </Route>
            <Route path="/">
              <Redirect to="/all-areas" />
            </Route>
          </Switch>
        </div>
      </SelectedYearContext.Provider>
    );
  }
}

export default App;
