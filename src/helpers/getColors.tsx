import ImageColors from 'react-native-image-colors';

export const getImageColors = async (url: string) => {
  let primary;
  let secondary;
  const colors = await ImageColors.getColors(url, {});
  primary = colors.average;
  secondary = colors.dominant;
  return [primary, secondary];
};
