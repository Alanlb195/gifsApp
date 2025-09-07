import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";


describe('CustomHeader', () => {

    const title = 'test title';

    test('should render the title correctly', () => {
        render(<CustomHeader title={title} />);
        expect(screen.getByText(title)).toBeInTheDocument();
    });


    test('should render the description when provided', () => {
        const description = 'test description';
        render(<CustomHeader title={title} description={description} />);

        // screen.debug();

        const descriptionElement = screen.getByText(description);
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement.tagName).toBe('P');

    });

    test('should not render description when not provided', () => {
        const { container } = render(<CustomHeader title={title} />);

        const divElement = container.querySelector('.content-center');

        const p = divElement?.querySelector('p');
        // console.log(p?.innerHTML);
        // console.log(container.innerHTML);

        expect(p?.innerHTML).toBeUndefined();
    });


});
