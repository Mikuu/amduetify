/** the current mind-elixir-core has a bug that cannot return correct style value of root node, therefor it need
 * be checked if the style object can be stringify successfully. **/
export const checkAndReturnStyleObject = styleObject => {
  try {
    JSON.stringify(styleObject);
    return styleObject;
  } catch (e) {
    console.warn(`FBI --> style object cannot be stringify: ${e.toString()}`);
  }

  return {};
};
