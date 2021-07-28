export interface PriorityArea {
  name: string;
  logo: string;
  color: string;
}

export const areaColors = [
  '#8A0464',
  '#EF4643',
  '#FAB316',
  '#82C44A',
  '#7EA4A4',
  '#3ABC95',
  '#12BCBF',
  '#02618F',
  '#024F7A',
];

export const priorityAreas: PriorityArea[] = [
  'Ранно детско развитие',
  'Компетентности и таланти',
  'Мотивирани и креативни учители',
  'Сплотени училищни общности и системна работа с родителите',
  'Ефективно включване, трайно приобщаване и образователна интеграция',
  'Образователни иновации, дигитална трансформация и устойчиво развитие',
  'Реализация в професиите на настоящето и бъдещето',
  'Учене през целия живот',
  'Ефикасно управление и участие в мрежи',
].map((area, idx) => ({
  name: area,
  logo: `${process.env.PUBLIC_URL}/area-logos/PR${idx + 1}.png`,
  color: areaColors[idx],
}));
