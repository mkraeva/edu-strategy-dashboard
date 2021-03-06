import packageJson from '../../package.json';

const IMAGES_PREFIX = packageJson.assetsPrefix || process.env.PUBLIC_URL;

export interface PriorityArea {
  id: number;
  name: string;
  logo: string;
}

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
  id: idx,
  name: area,
  logo: `${IMAGES_PREFIX}/area-logos/PR${idx + 1}.png`,
}));
