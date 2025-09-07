import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";

import * as gifActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {

    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());

        // console.log(result.current.gifs);
        // console.log(result.current.previousTerms);

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);

        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClick).toBeDefined();
    });

    test('should return a list of gifs', async () => {

        const { result } = renderHook(() => useGifs())

        await act(async () => {
            await result.current.handleSearch('saitama');
        })

        expect(result.current.gifs.length).toBe(15);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {

        const { result } = renderHook(() => useGifs());

        // before
        expect(result.current.gifs.length).toBe(0)

        await act(async () => {
            await result.current.handleTermClick('Violet Evergarden');
        });

        // after
        expect(result.current.gifs.length).toBe(15)
    });

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClick('Violet Evergarden');
        });

        expect(result.current.gifs.length).toBe(15);

        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
            new Error('This is a custom error')
        );

        await act(async () => {
            await result.current.handleTermClick('Violet Evergarden');
        });

        expect(result.current.gifs.length).toBe(15);
    });

    test('should return no more than eight terms', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 1');
        });
        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 2');
        });
        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 3');
        });
        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 4');
        });
        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 5');
        });
        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 6');
        });
        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 7');
        });
        await act(async () => {
            await result.current.handleSearch('Violet Evergarden 8');
        });

        // console.log(result.current.previousTerms);
        expect(result.current.previousTerms).toStrictEqual(
            [
                'violet evergarden 8',
                'violet evergarden 7',
                'violet evergarden 6',
                'violet evergarden 5',
                'violet evergarden 4',
                'violet evergarden 3',
                'violet evergarden 2',
                'violet evergarden 1'
            ]
        )
        expect(result.current.previousTerms.length).toBe(8);
    });

});