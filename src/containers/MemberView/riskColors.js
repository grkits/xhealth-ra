export const riskColor = (type, value) => {
  if (type === "hccrisk") {
    if (value === 0) {
      return "none";
    } else if (value >= 1) {
      return "red";
    } else if (value > 0.5 && value < 1) {
      return "yellow";
    } else {
      return "green";
    }
  } else {
    if (value === 0) {
      return "none";
    } else if (value >= 30) {
      return "red";
    } else if (value > 10 && value < 30) {
      return "yellow";
    } else {
      return "green";
    }
  }
};