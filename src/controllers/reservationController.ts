import { Request, Response } from "express";
import { createReservation } from "../models/reservation";
import { responseSuccess, responseError } from "../utils";

export const handlerCreateReservation = async (req: Request, res: Response) => {
  try {
    const { date, time, numberOfPeople } = req.body;
    if (!req.user) {
      return responseError(res, 401, "User not authenticated");
    }
    if (!date || !time || !numberOfPeople || numberOfPeople <= 0) {
      return responseError(res, 400, "Invalid reservation details");
    }

    const reservation = await createReservation(
      req.user.id,
      date,
      time,
      numberOfPeople
    );
    responseSuccess(res, 201, "Reservation created successfully", reservation);
  } catch (err) {
    responseError(res, 500, "Error creating reservation", err);
  }
};
