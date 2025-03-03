export type UserRole = "customer" | "staff" | "admin";
export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "delivered"
  | "canceled";
export type PaymentStatus = "pending" | "succeeded" | "failed";
export type ReservationStatus = "pending" | "confirmed" | "canceled";
