export const PIE_CHART_LAYOUT: Partial<Plotly.Layout> | any = {
  // width: 480,
  // height: 420,
  dragmode: false,
  autosize: true,
  margin: {
    pad: 10,
    t: 10,
    b: 10,
    l: 0,
    r: 0
  }
};

export const CHART_CONFIG: Partial<Plotly.Config> = {
  displayModeBar: false,
  // responsive: true,
};

export const smallLogo = (width: number, height: number) => ({
  flexShrink: 0,
  flexGrow: 0,
  width: `${width}px`,
  height: `${height}px`,
});

export const COLORS = {
  nationalBudget: "#024B76",
  euBudget: '#078cc5', //#0678A9',
  nationalProgram: '#02618F',
};
