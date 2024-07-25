import { render, screen, fireEvent } from "@testing-library/react";
import Payment from "./../components/Annonces/Payment";

describe("Payment Component", () => {
  const defaultProps = {
    price: 100,
    nights: 3,
    totalPrice: 315, // 100 * 3 + 20 + 15 + 12
    checkIn: null,
    checkOut: null,
    onCheckInChange: jest.fn(),
    onCheckOutChange: jest.fn(),
    onPriceChange: jest.fn(),
    onSubmit: jest.fn(),
    disabledDates: [],
  };

  test("renders correctly with default props", () => {
    render(<Payment {...defaultProps} />);
    expect(screen.getByText(/Prix total:/i)).toBeInTheDocument();
    expect(screen.getByText(/100 €/i)).toBeInTheDocument();
  });

  test("calls onCheckInChange when check-in date is changed", () => {
    render(<Payment {...defaultProps} />);
    const datePicker = screen.getByPlaceholderText("Date d'arrivée");
    fireEvent.change(datePicker, { target: { value: "2024-07-25" } });
    expect(defaultProps.onCheckInChange).toHaveBeenCalled();
  });

  test("calls onCheckOutChange when check-out date is changed", () => {
    render(<Payment {...defaultProps} />);
    const datePicker = screen.getByPlaceholderText("Date de départ");
    fireEvent.change(datePicker, { target: { value: "2024-07-26" } });
    expect(defaultProps.onCheckOutChange).toHaveBeenCalled();
  });

  test("calls onSubmit when Réserver button is clicked", () => {
    render(<Payment {...defaultProps} />);
    const button = screen.getByText(/Réserver/i);
    fireEvent.click(button);
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });
});
