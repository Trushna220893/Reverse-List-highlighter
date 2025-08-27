// Reverse List Highlighter – simple, beginner-friendly JavaScript
(function () {
	// How many squares to create. Change this number to scale the grid.
	var TOTAL_CELLS = 6; // 3x3 by default, but layout is responsive

	var grid = document.getElementById('grid');
	if (!grid) return; // guard if the grid is missing

	// Keep the order in which cells were checked
	var checkedOrder = [];

	// Create cells
	for (var i = 0; i < TOTAL_CELLS; i++) {
		var cell = document.createElement('button');
		cell.className = 'cell';
		cell.setAttribute('data-index', String(i));
		cell.setAttribute('aria-pressed', 'false');
		grid.appendChild(cell);
	}

	// Helper to check if all cells are selected
	function allChecked() {
		return checkedOrder.length === TOTAL_CELLS;
	}

	// Toggle logic for a single cell
	function toggleCell(cell) {
		var index = cell.getAttribute('data-index');
		var isChecked = cell.classList.contains('checked');

		if (isChecked) {
			cell.classList.remove('checked');
			cell.setAttribute('aria-pressed', 'false');
			// remove from checkedOrder
			var pos = checkedOrder.indexOf(index);
			if (pos !== -1) checkedOrder.splice(pos, 1);
		} else {
			cell.classList.add('checked');
			cell.setAttribute('aria-pressed', 'true');
			checkedOrder.push(index);
		}
	}

	// When all are checked, wait 2s then uncheck in reverse order
	function runReverseUncheck() {
		if (!allChecked()) return;
		setTimeout(function () {
			var interval = setInterval(function () {
				if (checkedOrder.length === 0) {
					clearInterval(interval);
					return;
				}
				var lastIndex = checkedOrder.pop();
				var lastCell = grid.querySelector('[data-index="' + lastIndex + '"]');
				if (lastCell) {
					lastCell.classList.remove('checked');
					lastCell.setAttribute('aria-pressed', 'false');
				}
			}, 250); // uncheck speed
		}, 2000); // 2 seconds wait
	}

	// Event delegation: attach one listener to the grid
	grid.addEventListener('click', function (e) {
		var cell = e.target;
		if (!cell || !cell.classList.contains('cell')) return;
		// If we are in the automatic reverse phase, ignore clicks
		// (We detect this by checking if all are selected and countdown started.)
		// Simpler: allow clicks anytime; the reverse will only start immediately after all are checked.
		toggleCell(cell);
		runReverseUncheck();
	});
})();