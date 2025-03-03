import { createPaymentIntent } from "../../src/services/paymentService";
import { stripe } from "../../src/config/stripe";
import { createPayment } from "../../src/models/payment";
import { Order } from "../../src/models/order";

jest.mock("../../config");
jest.mock("../../models/payment");

describe("PaymentService", () => {
  it("should create a payment intent successfully", async () => {
    const mockOrder: Order = {
      id: 1,
      user_id: "user123",
      status: "pending",
      total_amount: 1000,
      created_at: new Date(),
      updated_at: null,
    };
    const mockAmount = 1000;
    const mockClientSecret = "pi_123_secret_456";

    (stripe.paymentIntents.create as jest.Mock).mockResolvedValue({
      id: "pi_123",
      client_secret: mockClientSecret,
    });

    (createPayment as jest.Mock).mockResolvedValue({ id: 1 });

    const clientSecret = await createPaymentIntent(mockOrder, mockAmount);

    expect(clientSecret).toBe(mockClientSecret);
    expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
      amount: mockAmount,
      currency: "usd",
      metadata: { order_id: "1" },
    });
  });

  it("should throw an error on failure", async () => {
    const mockOrder: Order = {
      id: 1,
      user_id: "user123",
      status: "pending",
      total_amount: 1000,
      created_at: new Date(),
      updated_at: null,
    };

    (stripe.paymentIntents.create as jest.Mock).mockRejectedValue(
      new Error("Stripe Error")
    );

    await expect(createPaymentIntent(mockOrder, 1000)).rejects.toThrow(
      "Stripe Error"
    );
  });
});
