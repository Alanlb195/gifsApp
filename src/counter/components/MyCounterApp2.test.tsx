import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";


const handleAddMock = vi.fn();
const handleSubtract = vi.fn();
const handleReset = vi.fn();

vi.mock('../hooks/useCounter.tsx', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleReset: handleSubtract,
        handleSubtract: handleReset,
    }),
}));

describe('MyCounterApp2', () => {


    test('should render the component', () => {
        render(<MyCounterApp />)
        // screen.debug();

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(`Counter: 20`);

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();

    });


    test('should call handleAdd if button is clicked', () => {
        render(<MyCounterApp />)
        const button = screen.getByRole('button', { name: '+1' });

        fireEvent.click(button);

        expect(handleAddMock).toHaveBeenCalled();
        expect(handleAddMock).toHaveBeenCalledTimes(1);


        expect(handleSubtract).not.toHaveBeenCalled();
        expect(handleReset).not.toHaveBeenCalled();

    });



});