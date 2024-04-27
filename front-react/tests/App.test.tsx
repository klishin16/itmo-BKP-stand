import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from "../src/App";

describe('App', () => {
    it('renders headline', () => {
        render(<App />);
        const headline = screen.getByText(/Render/i);
        expect(headline).toBeInTheDocument();
    });

    it('render performance 1', async() => {
        render(<App p_n={64} />)

        // Fire render
        fireEvent(
            screen.getByText('Render'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        await waitFor(() => {}, { timeout: 1000 })
    })

    it('render performance 2', async() => {
        render(<App p_n={256} />)

        // Fire render
        fireEvent(
            screen.getByText('Render'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        await waitFor(() => {}, { timeout: 1000 })
    })

    it('render performance 3', async() => {
        render(<App p_n={512} />)

        console.log('render')
        // Fire render
        fireEvent(
            screen.getByText('Render'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        await waitFor(() => {}, { timeout: 1000 })
    })
});
