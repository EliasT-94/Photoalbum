/**
 * Make every second album have sligtly different color
 * @param {number} item
 */
export const setListBackground = (item: number) => {
  const rightStyle = {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "#ff8c28"
  }
  const leftStyle = {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor:"orange"
  }
  return item % 2 === 1 ? rightStyle : leftStyle;
};
