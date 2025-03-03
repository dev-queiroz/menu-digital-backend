export const validator = {
  isValidEmail: (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  isPositiveNumber: (value: any): boolean => {
    return typeof value === "number" && value > 0;
  },
  isValidDate: (date: string): boolean => {
    return !isNaN(Date.parse(date));
  },
};
