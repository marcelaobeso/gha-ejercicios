const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('index.js', () => {
    let getRandomColor;
    let button;

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        require('./index.js');
        getRandomColor = document.getRandomColor;
        button = document.querySelector('button');
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('button click changes background color', () => {
        const initialColor = document.body.style.backgroundColor;
        button.click();
        const newColor = document.body.style.backgroundColor;
        expect(newColor).not.toBe(initialColor);
    });

    it('getRandomColor returns a valid hex color', () => {
        const color = getRandomColor();
        expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
});
