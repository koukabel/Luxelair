import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Payment from "@/components/Annonces/Payment";

jest.mock("react-datepicker", () => ({
  __esModule: true,
  default: ({
    onChange,
    selected,
  }: {
    onChange: (date: Date | null) => void;
    selected: Date | null;
  }) => (
    <input
      data-testid="mock-datepicker"
      type="text"
      onChange={(e) => onChange(new Date(e.target.value))}
      value={selected ? selected.toString() : ""}
    />
  ),
}));

describe("Payment Component", () => {
  const defaultProps = {
    price: 100,
    nights: 3,
    totalPrice: 315,
    checkIn: new Date("2024-08-01"),
    checkOut: new Date("2024-08-04"),
    onCheckInChange: jest.fn(),
    onCheckOutChange: jest.fn(),
    onPriceChange: jest.fn(),
    onSubmit: jest.fn(),
    disabledDates: [new Date("2024-08-02")],
  };

  it("renders correctly with initial props", () => {
    render(<Payment {...defaultProps} />);

    const totalPriceElement = screen.getByTestId("total-price");
    expect(totalPriceElement).toBeInTheDocument();
  });

  it("calls onCheckInChange and onCheckOutChange when dates are changed", () => {
    render(<Payment {...defaultProps} />);

    const datePickers = screen.getAllByTestId("mock-datepicker");
    fireEvent.change(datePickers[0], { target: { value: "2024-08-03" } });
    fireEvent.change(datePickers[1], { target: { value: "2024-08-05" } });

    expect(defaultProps.onCheckInChange).toHaveBeenCalledWith(
      new Date("2024-08-03")
    );
    expect(defaultProps.onCheckOutChange).toHaveBeenCalledWith(
      new Date("2024-08-05")
    );
  });

  it("calls onSubmit when the button is clicked", () => {
    render(<Payment {...defaultProps} />);

    const button = screen.getByText("Réserver");
    fireEvent.click(button);

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onPriceChange when the price input is changed", () => {
    render(<Payment {...defaultProps} />);
    const priceInput = screen.getByTestId("price-input");
    fireEvent.change(priceInput, { target: { value: "200" } });

    expect(defaultProps.onPriceChange).toHaveBeenCalledWith(200);
  });
});
