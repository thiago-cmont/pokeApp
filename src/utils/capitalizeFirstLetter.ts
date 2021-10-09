const capitalizeFirstLetter = (string: string): string =>
  String(string).charAt(0).toUpperCase() + String(string).slice(1);

export default capitalizeFirstLetter;
