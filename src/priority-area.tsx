import { ThemeProvider } from 'react-jss';
import { useParams } from 'react-router-dom';
import { ModuleData } from './services/data';
import { priorityAreas } from './services/priority-areas';
import { getAreaTheme } from './themes';
export type PriorityAreaProps = {
  budgetData: ModuleData[];
}

const PriorityArea = (props: PriorityAreaProps) => {
  const params = useParams<{ id: string }>();
  const areaId = Number(params.id);
  const area = priorityAreas.find(({ id }) => id === areaId);
  const data = props.budgetData.filter(d => d.area === area?.name);
  const theme = getAreaTheme(area!.name);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div style={{color: theme.primaryColor}}>Area {areaId} Budget Chart goes here</div>
        <div>Area Spending by Activity goes here</div>
        <div>Area Indicators progress goes here</div>
      </div>
    </ThemeProvider>
  );
}

export default PriorityArea;