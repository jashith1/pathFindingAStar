function handleClick() {
	let i = Math.floor(mouseX / 25);
	let j = Math.floor(mouseY / 25);
	if (mouseY > 0 && mouseX > 0 && mouseY < height - 1 && mouseX < width - 1 && quadGrid[i][j] !== mouseLocation) {
		let tempCurrentButton;
		if (!currentButton) {
			if (!start) {
				tempCurrentButton = "start";
			} else if (!end) {
				tempCurrentButton = "end";
			} else {
				tempCurrentButton = "wall";
			}
		}
		if (currentButton === "start" || tempCurrentButton === "start") {
			if (quadGrid[i][j] === start) {
				start = null;
				removeFromArray(checkpoints, quadGrid[i][j]);
				startAlgorithm = false;
			} else if (quadGrid[i][j] !== end) {
				if (checkpoints.includes(quadGrid[i][j])) {
					removeFromArray(checkpoints, quadGrid[i][j]);
				}
				openSet = [];
				start = quadGrid[i][j];
				quadGrid[i][j].wall = false;
			}
		} else if (currentButton === "end" || tempCurrentButton === "end") {
			if (quadGrid[i][j] === end) {
				end = null;
				removeFromArray(checkpoints, quadGrid[i][j]);
				startAlgorithm = false;
			} else if (quadGrid[i][j] !== start) {
				if (end) {
					removeFromArray(checkpoints, end);
				}
				if (checkpoints.includes(quadGrid[i][j])) {
					removeFromArray(checkpoints, quadGrid[i][j]);
				}
				end = quadGrid[i][j];
				quadGrid[i][j].wall = false;
			}
		} else if (currentButton === "wall" || tempCurrentButton === "wall") {
			if (quadGrid[i][j] === start || quadGrid[i][j] === end || checkpoints.includes(quadGrid[i][j])) {
				return;
			}
			if (quadGrid[i][j].wall === true) {
				quadGrid[i][j].wall = false;
				if (diagonalAllowed) {
					diagonalWallsFix(i, j, "add");
				}
			} else if (quadGrid[i][j].wall === false) {
				quadGrid[i][j].wall = true;
				if (diagonalAllowed) {
					diagonalWallsFix(i, j, "remove");
				}
				if (!finalPath.includes(quadGrid[i][j])) {
					quadGrid[i][j].show(0);
					mouseLocation = quadGrid[i][j];
					return;
				}
			}
		} else if (currentButton === "checkpoint") {
			if (quadGrid[i][j] === start || quadGrid[i][j] === end) {
				return;
			}
			if (checkpoints.includes(quadGrid[i][j])) {
				removeFromArray(checkpoints, quadGrid[i][j]);
			} else {
				checkpoints.push(quadGrid[i][j]);
				if (firstStart && checkpoints.length >= 3 && !startAlgorithm) {
					startAlgo(checkpoints.length - 2);
					for (var k = finalPath.length - 1; k >= 0; k--) {
						if (finalPath[k] === checkpoints[checkpoints.length - 3]) {
							finalPath.splice(k, finalPath.length - 1 - k);
							break;
						}
					}
					renderEssentials();
					mouseLocation = quadGrid[i][j];
					return;
				}
			}
			quadGrid[i][j].wall = false;
		}
		if (firstStart) {
			startAlgo();
		}
		renderEssentials();
		mouseLocation = quadGrid[i][j];
	}
}