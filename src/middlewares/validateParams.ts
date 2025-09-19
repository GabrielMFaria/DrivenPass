import { Request, Response, NextFunction } from "express";

export function validatePositiveNumberParam(paramName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = Number(req.params[paramName]);
    if (isNaN(value) || value <= 0) {
      return res.status(400).json({ message: `${paramName} must be a positive number` });
    }
    next();
  };
}
