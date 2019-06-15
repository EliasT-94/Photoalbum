
  /**
   * Make every second album have sligtly different color
   * @param {number} item
   */
  export const setListBackground = (item: number) => {
    return item % 2 === 1 ? "#e6e6e6" : "#D9D9D9";
  };