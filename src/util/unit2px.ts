let unit = 1;

export const setUnit = (newUnit: number) => unit = newUnit;

const unit2px = (px: number) => px * unit;

export default unit2px;