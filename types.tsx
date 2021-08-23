/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  ShowDescription: { show: show };
  QRCodeScanner: { show: show };
  NotFound: undefined;
};

export type show = {
  genre: string[];
  releaseYear: string;
  title: string;
  rating: number;
  image: string;
};
