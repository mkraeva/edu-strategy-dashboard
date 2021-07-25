import React from 'react';
import './App.css';
import { BudgetChart } from './budget-chart';
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
        <BudgetChart budgetData={moduleData}></BudgetChart>
      </div>
    );
  }
}

export default App;
