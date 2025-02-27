# Assignment 1: Google Sheets Mimic

This web application replicates the core UI and functionalities of Google Sheets. It features mathematical and data quality functions, data entry, and interactive UI elements.

## Files

- **index.html**: Main HTML file.
- **styles.css**: CSS styling.
- **app.js**: JavaScript logic for cell editing, formulas, and row/column management.

## How to Run

1. Open `index.html` in your web browser.
2. Use the toolbar buttons to apply bold/italic formatting, add/delete rows or columns.
3. Enter data or formulas in cells.
   - **Formulas** must start with an "=" (e.g., `=SUM(A1:A3)`).

## Features

- **Spreadsheet Interface**: Click to select cells, double-click to edit.
- **Mathematical Functions**: `SUM`, `AVERAGE`, `MAX`, `MIN`, `COUNT`.
- **Data Quality Functions**: `TRIM`, `UPPER`, `LOWER`.
- **Dynamic Row/Column Management**.
- **Drag Selection** for multiple cells.

## Testing

- Enter numbers or text into cells.
- Test formulas by entering expressions (e.g., `=SUM(A3:A5)`).
- Use formatting buttons (B for bold, I for italic).
