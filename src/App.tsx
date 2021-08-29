import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { BudgetChart } from "./budget-chart";
import PriorityArea from "./components/priority-area/priority-area";
import IndicatorChartSelector from "./components/priority-area/indicator-chart";
import SelectedYearContext from "./selected-year-context";
import {
  ActivityData,
  ExpenditureData,
  fetchDataPerActivity,
  fetchDataPerAreaIndicator,
  fetchDataPerModule,
  fetchExpenditureData,
  IndicatorData,
  ModuleData,
} from "./services/data";
import packageJson from '../package.json';
const IMAGES_PREFIX = packageJson.assetsPrefix || process.env.PUBLIC_URL;

interface AppProps {}
interface AppState {
  moduleData: ModuleData[];
  activityData: ActivityData[];
  indicatorData: IndicatorData[];
  expenditureData: ExpenditureData[];
  selectedYear: number;
  isLoading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      moduleData: [],
      activityData: [],
      indicatorData: [],
      expenditureData: [],
      selectedYear: 0,
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const moduleData = await fetchDataPerModule();
      const activityData = await fetchDataPerActivity();
      const indicatorData = await fetchDataPerAreaIndicator();
      const expenditureData = await fetchExpenditureData();
      let selectedYear = 0;

      const allYears = Array.from(
        new Set(moduleData.map((d) => d.year))
      ).sort();

      if (allYears.length > 0) {
        selectedYear = allYears[allYears.length - 1];
      }
      this.setState({
        moduleData, activityData, indicatorData, expenditureData,
        selectedYear, isLoading: false,
      });
    } catch (e) {
      console.error(e);
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
    const {
      moduleData, activityData, expenditureData, indicatorData,
      selectedYear,
      isLoading,
    } = this.state;
    if (isLoading) {
      // TODO: pretty loading indicator?
      return <div>Зареждане на данните...</div>
    }

    const [yearModuleData, yearActivityData, yearExpenditureData] = [
      this.filterByYear(moduleData),
      this.filterByYear(activityData),
      this.filterByYear(expenditureData),
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
          {/*<img id="rhomb" src={`${IMAGES_PREFIX}/rhomb.svg`} alt=""></img>*/}
          <Switch>
            <Route path="/all-areas">
              <BudgetChart budgetData={yearModuleData} />
              <IndicatorChartSelector indicatorData={indicatorData} mainArea={true} />
            </Route>
            <Route path="/priority-area/:id/:activity?">
              <PriorityArea
                budgetData={yearModuleData}
                activityData={yearActivityData}
                expenditureData={yearExpenditureData}
                indicatorData={indicatorData}
              />
            </Route>
            <Route path="/priority-area">
              <Redirect to="/priority-area/0"/>
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
