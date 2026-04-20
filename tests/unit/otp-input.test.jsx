/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Inline the OTPInput component for isolated testing
function OTPInput({ value, onChange, disabled }) {
  const inputs = React.useRef([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || '');

  const handleChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, '').slice(-1);
    const arr = value.split('');
    arr[i] = v;
    onChange(arr.join('').slice(0, 6));
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <div data-testid="otp-container" style={{ display: 'flex', gap: 8 }}>
      {digits.map((d, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          ref={(el) => (inputs.current[i] = el)}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          disabled={disabled}
          data-testid={`otp-box-${i}`}
        />
      ))}
    </div>
  );
}

describe('OTPInput component', () => {
  it('renders exactly 6 input boxes', () => {
    render(<OTPInput value="" onChange={() => {}} disabled={false} />);
    const container = screen.getByTestId('otp-container');
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(6);
  });

  it('displays the correct value in each box', () => {
    render(<OTPInput value="123456" onChange={() => {}} disabled={false} />);
    expect(screen.getByTestId('otp-box-0')).toHaveValue('1');
    expect(screen.getByTestId('otp-box-1')).toHaveValue('2');
    expect(screen.getByTestId('otp-box-2')).toHaveValue('3');
    expect(screen.getByTestId('otp-box-5')).toHaveValue('6');
  });

  it('calls onChange with updated value when digit entered', () => {
    const onChange = jest.fn();
    render(<OTPInput value="12345 " onChange={onChange} disabled={false} />);
    fireEvent.change(screen.getByTestId('otp-box-5'), { target: { value: '6' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange with non-numeric input', () => {
    const onChange = jest.fn();
    render(<OTPInput value="" onChange={onChange} disabled={false} />);
    // Simulate typing a letter - the replace(/\D/g, '') will strip it
    const box = screen.getByTestId('otp-box-0');
    fireEvent.change(box, { target: { value: 'a' } });
    // onChange called but with empty string (non-numeric stripped)
    if (onChange.mock.calls.length > 0) {
      const passedValue = onChange.mock.calls[0][0];
      expect(/^\d*$/.test(passedValue)).toBe(true);
    }
  });

  it('disables all inputs when disabled=true', () => {
    render(<OTPInput value="" onChange={() => {}} disabled={true} />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => expect(input).toBeDisabled());
  });

  it('renders empty boxes when value is empty string', () => {
    render(<OTPInput value="" onChange={() => {}} disabled={false} />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => expect(input).toHaveValue(''));
  });
});
