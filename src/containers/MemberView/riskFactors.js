export const riskFactors = (type, value) => {
    if (type === "hccrisk") {
      return "Aged, Medicare, No of Chronics, Disease Progression";
    } else if (type === "diabetesrisk") {
      return "High A1C, BMI, Foot, Eye, PCP visit gaps";
    } else if (type === "hypertensionrisk") {
      return "High BMI, LDL, HDL, Blood Pressure";
    } else {
      return "High BMI, LDL, HDL, Blood Pressure, Heart Disease Gaps ";
    }
  };