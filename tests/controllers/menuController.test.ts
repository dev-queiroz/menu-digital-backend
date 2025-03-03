import { Request, Response } from "express";
import { getMenuItems } from "../../src/controllers/menuController";
import { supabase } from "../../src/config/database";

jest.mock("../../src/config/database"); // Mock do Supabase

describe("MenuController", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should retrieve menu items successfully", async () => {
    const mockMenuData = {
      items: [{ id: 1, name: "Burger" }],
      variants: [{ id: 1, item_id: 1, price: 1000 }],
    };
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest
        .fn()
        .mockResolvedValue({ data: mockMenuData.items, error: null }),
    });
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest
        .fn()
        .mockResolvedValue({ data: mockMenuData.variants, error: null }),
    });

    await getMenuItems(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: "Menu items retrieved successfully",
      data: mockMenuData,
    });
  });

  it("should handle errors", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValue({ data: null, error: new Error("DB Error") }),
    });

    await getMenuItems(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: "Error fetching menu items",
      error: expect.any(Error),
    });
  });
});
