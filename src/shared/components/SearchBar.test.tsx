import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";



describe('SearchBar', () => {

    test('should render searbar correctly', () => {

        const { container } = render(<SearchBar onQuery={() => { }} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });

    test('should call onQuery with the correct value after 700ms', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test2' } });

        // screen.debug();
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test2');
        });
    });

    test('should call only one with the last value (debounce)', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'tes' } });
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.change(input, { target: { value: 'test3' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test3');
        });
    });

    test('should call onQuery when button cliend with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test4' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test4');

    });

    test('should the input has the correct placeholder value', () => {
        const inputValue = 'Buscar gif';
        render(<SearchBar onQuery={() => { }} placeholder={inputValue} />);

        // screen.debug();

        expect(screen.getByPlaceholderText(inputValue)).toBeDefined();
    })

});