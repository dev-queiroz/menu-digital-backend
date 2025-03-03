import { Request, Response, NextFunction } from "express";
import { responseError, validator } from "../utils";

interface ValidationRule {
  field: string;
  type: "string" | "number" | "email" | "date";
  required?: boolean;
  min?: number;
  max?: number;
}

export const validateRequest = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    rules.forEach((rule) => {
      const value =
        req.body[rule.field] ?? req.query[rule.field] ?? req.params[rule.field];

      if (rule.required && (value === undefined || value === null)) {
        errors.push(`${rule.field} is required`);
        return;
      }

      if (value !== undefined && value !== null) {
        switch (rule.type) {
          case "string":
            if (typeof value !== "string") {
              errors.push(`${rule.field} must be a string`);
            } else if (rule.min && value.length < rule.min) {
              errors.push(
                `${rule.field} must be at least ${rule.min} characters`
              );
            } else if (rule.max && value.length > rule.max) {
              errors.push(
                `${rule.field} must not exceed ${rule.max} characters`
              );
            }
            break;
          case "number":
            if (isNaN(Number(value))) {
              errors.push(`${rule.field} must be a number`);
            } else if (rule.min && Number(value) < rule.min) {
              errors.push(`${rule.field} must be at least ${rule.min}`);
            } else if (rule.max && Number(value) > rule.max) {
              errors.push(`${rule.field} must not exceed ${rule.max}`);
            }
            break;
          case "email":
            if (!validator.isValidEmail(value)) {
              errors.push(`${rule.field} must be a valid email`);
            }
            break;
          case "date":
            if (!validator.isValidDate(value)) {
              errors.push(`${rule.field} must be a valid date`);
            }
            break;
        }
      }
    });

    if (errors.length > 0) {
      return responseError(res, 400, "Validation failed", errors);
    }

    next();
  };
};
