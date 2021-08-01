import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { BudgetChart } from './budget-chart';
import PriorityArea from './priority-area';
import { fetchDataPerModule, ModuleData } from './services/data';

interface AppProps { }
interface AppState { 
  moduleData: ModuleData[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { moduleData: [] };
  }
  async componentDidMount() {
    try {
      const moduleData = await fetchDataPerModule();
      this.setState({ moduleData });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { moduleData } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route path="/all-areas">
            <BudgetChart budgetData={moduleData}></BudgetChart>
          </Route>
          <Route path="/priority-area/:id">
            <PriorityArea budgetData={moduleData} />
          </Route>
          <Route path="/">
            <Redirect to="/all-areas"></Redirect>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
