import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";



describe('useCounter', () => {


    test('should initialize with default value of 10', () => {

        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10)

    });

    test('should initialize with custom value of 20', () => {

        const initialValue = 20;

        const { result } = renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);

    });

    test('should increment counter when handleAdd is called', () => {

        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(11);

    });

    test('should decrement counter when handleSubtract is called', () => {

        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleSubtract();
        });

        expect(result.current.counter).toBe(9);

    });


    test('should reset counter when handleReset is called (useCounter with default value)', () => {

        const { result } = renderHook(() => useCounter());

        // 10 - 2 = 8
        act(() => {
            result.current.handleSubtract();
        });

        act(() => {
            result.current.handleSubtract();
        });

        expect(result.current.counter).toBe(8);

        // reset = 10
        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(10);

    });


    test('should not handleSubtrac when counter is cero', () => {

        const initialValue = 0;

        const { result } = renderHook(() => useCounter(initialValue));

        act(() => {
            result.current.handleSubtract(); // -1
            result.current.handleSubtract(); // -2
        });

        expect(result.current.counter).toBe(0); // expect 0, no -2

    });


    test('should reset after multiple operations', () => {
        const { result } = renderHook(() => useCounter(5));

        act(() => {
            result.current.handleAdd();      // 6
            result.current.handleAdd();      // 7
            result.current.handleSubtract(); // 6
            result.current.handleReset();    // 5
        });

        expect(result.current.counter).toBe(5);
    });


});