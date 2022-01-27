import React, {createContext, useState} from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}
interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setMainColors: (colors: ImageColors) => void;
  setPrevMainColors: (colors: ImageColors) => void;
}

// eslint-disable-next-line prettier/prettier
export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({children}: any) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setMainColors = (colors: ImageColors) => {
    setColors(colors);
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setPrevMainColors = (colors: ImageColors) => {
    setPrevColors(colors);
  };

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
      }}>
      {children}
    </GradientContext.Provider>
  );
};
