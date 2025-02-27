document.addEventListener("DOMContentLoaded", function() {
  const numRows = 20;
  const numCols = 10;
  let sheetData = []; 
  let currentCell = null;
  let isMouseDown = false;
  let selectionStart = null;
  let selectedCells = new Set();

  const sheetTable = document.getElementById("sheetTable");
  const formulaInput = document.getElementById("formulaInput");
  const applyFormulaBtn = document.getElementById("applyFormulaBtn");
  const boldBtn = document.getElementById("boldBtn");
  const italicBtn = document.getElementById("italicBtn");
  const addRowBtn = document.getElementById("addRowBtn");
  const deleteRowBtn = document.getElementById("deleteRowBtn");
  const addColBtn = document.getElementById("addColBtn");
  const deleteColBtn = document.getElementById("deleteColBtn");

  // Initialize sheetData with empty strings
  for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
          row.push("");
      }
      sheetData.push(row);
  }

  // Generate table header (column letters)
  const thead = sheetTable.querySelector("thead tr");
  for (let j = 0; j < numCols; j++) {
      let th = document.createElement("th");
      th.textContent = String.fromCharCode(65 + j);
      thead.appendChild(th);
  }

  // Generate table body (rows)
  const tbody = sheetTable.querySelector("tbody");
  for (let i = 0; i < numRows; i++) {
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      th.textContent = i + 1;
      tr.appendChild(th);
      for (let j = 0; j < numCols; j++) {
          let td = document.createElement("td");
          td.setAttribute("data-row", i);
          td.setAttribute("data-col", j);
          td.contentEditable = false;
          td.addEventListener("click", cellClickHandler);
          td.addEventListener("dblclick", cellDblClickHandler);
          td.addEventListener("mousedown", cellMouseDownHandler);
          td.addEventListener("mouseenter", cellMouseEnterHandler);
          td.addEventListener("mouseup", cellMouseUpHandler);
          tr.appendChild(td);
      }
      tbody.appendChild(tr);
  }

  // Single click: select cell and load its content into the formula bar
  function cellClickHandler(e) {
      clearSelection();
      currentCell = e.target;
      e.target.classList.add("selected");
      const row = parseInt(currentCell.getAttribute("data-row"));
      const col = parseInt(currentCell.getAttribute("data-col"));
      formulaInput.value = sheetData[row][col];
  }

  // Double-click: enable direct editing
  function cellDblClickHandler(e) {
      e.target.contentEditable = true;
      e.target.focus();
  }

  // Mouse down: begin selection for drag functionality
  function cellMouseDownHandler(e) {
      isMouseDown = true;
      clearSelection();
      currentCell = e.target;
      e.target.classList.add("selected");
      selectionStart = e.target;
      selectedCells.add(e.target);
  }

  function cellMouseEnterHandler(e) {
      if (isMouseDown) {
          e.target.classList.add("selected");
          selectedCells.add(e.target);
      }
  }

  function cellMouseUpHandler(e) {
      isMouseDown = false;
  }

  function clearSelection() {
      document.querySelectorAll("td.selected").forEach(td => {
          td.classList.remove("selected");
      });
      selectedCells.clear();
  }


  // Apply value or formula from the formula bar to the current cell
  applyFormulaBtn.addEventListener("click", function() {
      if (currentCell) {
          const row = parseInt(currentCell.getAttribute("data-row"));
          const col = parseInt(currentCell.getAttribute("data-col"));
          const inputVal = formulaInput.value;
          sheetData[row][col] = inputVal;
          updateCell(currentCell, inputVal);
          recalcSheet();
      }
  });

  boldBtn.addEventListener("click", function() {
      if (currentCell) {
          currentCell.style.fontWeight = currentCell.style.fontWeight === "bold" ? "normal" : "bold";
      }
  });

  italicBtn.addEventListener("click", function() {
      if (currentCell) {
          currentCell.style.fontStyle = currentCell.style.fontStyle === "italic" ? "normal" : "italic";
      }
  });


  addRowBtn.addEventListener("click", function() {
      addRow();
  });

  deleteRowBtn.addEventListener("click", function() {
      deleteRow();
  });

  addColBtn.addEventListener("click", function() {
      addColumn();
  });

  deleteColBtn.addEventListener("click", function() {
      deleteColumn();
  });

  function addRow() {
      const tbody = sheetTable.querySelector("tbody");
      let rowIndex = sheetData.length;
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      th.textContent = rowIndex + 1;
      tr.appendChild(th);
      let newRow = [];
      for (let j = 0; j < sheetData[0].length; j++) {
          let td = document.createElement("td");
          td.setAttribute("data-row", rowIndex);
          td.setAttribute("data-col", j);
          td.contentEditable = false;
          td.addEventListener("click", cellClickHandler);
          td.addEventListener("dblclick", cellDblClickHandler);
          td.addEventListener("mousedown", cellMouseDownHandler);
          td.addEventListener("mouseenter", cellMouseEnterHandler);
          td.addEventListener("mouseup", cellMouseUpHandler);
          tr.appendChild(td);
          newRow.push("");
      }
      sheetData.push(newRow);
      tbody.appendChild(tr);
  }

  function deleteRow() {
      if (sheetData.length > 1) {
          sheetData.pop();
          const tbody = sheetTable.querySelector("tbody");
          tbody.removeChild(tbody.lastChild);
      }
  }

  function addColumn() {
      const numCols = sheetData[0].length;
      // Update header
      const theadRow = sheetTable.querySelector("thead tr");
      let th = document.createElement("th");
      th.textContent = String.fromCharCode(65 + numCols);
      theadRow.appendChild(th);
      // Update each row in tbody
      const tbodyRows = sheetTable.querySelectorAll("tbody tr");
      tbodyRows.forEach((tr, i) => {
          let td = document.createElement("td");
          td.setAttribute("data-row", i);
          td.setAttribute("data-col", numCols);
          td.contentEditable = false;
          td.addEventListener("click", cellClickHandler);
          td.addEventListener("dblclick", cellDblClickHandler);
          td.addEventListener("mousedown", cellMouseDownHandler);
          td.addEventListener("mouseenter", cellMouseEnterHandler);
          td.addEventListener("mouseup", cellMouseUpHandler);
          tr.appendChild(td);
          sheetData[i].push("");
      });
  }

  function deleteColumn() {
      if (sheetData[0].length > 1) {
          // Remove header
          const theadRow = sheetTable.querySelector("thead tr");
          theadRow.removeChild(theadRow.lastChild);
          // Remove each cell in every row
          const tbodyRows = sheetTable.querySelectorAll("tbody tr");
          tbodyRows.forEach((tr, i) => {
              tr.removeChild(tr.lastChild);
              sheetData[i].pop();
          });
      }
  }


  function updateCell(cell, value) {
      // If value is a formula, compute and display its result; otherwise, show the literal value.
      if (typeof value === "string" && value.startsWith("=")) {
          let result = evaluateFormula(value);
          cell.textContent = result;
      } else {
          cell.textContent = value;
      }
  }

  function recalcSheet() {
      // Recalculate all cells that contain formulas
      const tbodyRows = sheetTable.querySelectorAll("tbody tr");
      tbodyRows.forEach(tr => {
          const cells = tr.querySelectorAll("td");
          cells.forEach(td => {
              const row = parseInt(td.getAttribute("data-row"));
              const col = parseInt(td.getAttribute("data-col"));
              let val = sheetData[row][col];
              updateCell(td, val);
          });
      });
  }


  function evaluateFormula(formula) {
      // Remove the "=" from the formula string
      let expression = formula.substring(1).trim();
      // Check for a function call e.g., SUM, AVERAGE, etc.
      let match = expression.match(/^([A-Z_]+)\((.*)\)$/);
      if (match) {
          let func = match[1];
          let arg = match[2];
          // Handle range formulas (e.g., A1:A3 or A1:B2)
          if (arg.includes(':')) {
              let cells = getCellsFromRange(arg);
              let values = cells.map(val => parseFloat(val) || 0);
              switch (func) {
                  case 'SUM':
                      return values.reduce((a, b) => a + b, 0);
                  case 'AVERAGE':
                      return values.reduce((a, b) => a + b, 0) / values.length;
                  case 'MAX':
                      return Math.max(...values);
                  case 'MIN':
                      return Math.min(...values);
                  case 'COUNT':
                      return values.filter(v => !isNaN(v)).length;
                  default:
                      return "Error: Unknown function";
              }
          } else { // Single cell reference or text manipulation
              let cellVal = getCellFromRef(arg);
              switch (func) {
                  case 'TRIM':
                      return cellVal.trim();
                  case 'UPPER':
                      return cellVal.toUpperCase();
                  case 'LOWER':
                      return cellVal.toLowerCase();
                  default:
                      return "Error: Unknown function";
              }
          }
      } else {
          // Replace any cell references (e.g., A1, B2) with their current values
          expression = expression.replace(/([A-Z]+[0-9]+)/g, function(ref) {
              return getCellFromRef(ref) || 0;
          });
          try {
              return eval(expression);
          } catch (e) {
              return "Error";
          }
      }
  }

  function getCellFromRef(ref) {
      // Convert a cell reference (e.g., A1) to its value from sheetData
      let colLetter = ref.match(/[A-Z]+/)[0];
      let rowNumber = parseInt(ref.match(/[0-9]+/)[0]) - 1;
      let colNumber = colLetter.charCodeAt(0) - 65;
      if (sheetData[rowNumber] && sheetData[rowNumber][colNumber] !== undefined) {
          let val = sheetData[rowNumber][colNumber];
          if (typeof val === "string" && val.startsWith("=")) {
              return evaluateFormula(val);
          }
          return val;
      }
      return "";
  }

  function getCellsFromRange(rangeStr) {
      // Support ranges like A1:A3 or A1:B2
      let parts = rangeStr.split(':');
      if (parts.length !== 2) return [];
      let start = parts[0];
      let end = parts[1];
      let startCol = start.match(/[A-Z]+/)[0];
      let startRow = parseInt(start.match(/[0-9]+/)[0]);
      let endCol = end.match(/[A-Z]+/)[0];
      let endRow = parseInt(end.match(/[0-9]+/)[0]);
      let cells = [];
      for (let i = startRow; i <= endRow; i++) {
          for (let j = startCol.charCodeAt(0); j <= endCol.charCodeAt(0); j++) {
              let cellRef = String.fromCharCode(j) + i;
              cells.push(getCellFromRef(cellRef));
          }
      }
      return cells;
  }

  // Update sheetData when a cell is edited directly (via double-click)
  sheetTable.addEventListener("input", function(e) {
      if (e.target.tagName === "TD" && e.target.isContentEditable) {
          const row = parseInt(e.target.getAttribute("data-row"));
          const col = parseInt(e.target.getAttribute("data-col"));
          sheetData[row][col] = e.target.textContent;
          recalcSheet();
      }
  });
});
