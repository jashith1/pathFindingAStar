function midPointStart(newStartCount, removeFrom) {
	for (var i = finalPath.length - 1; i >= 0; i--) {
		if (finalPath[i] === removeFrom) {
			finalPath.splice(i, finalPath.length - i);
			break;
		}
	}
	startAlgo(newStartCount);
}

function midPointEnd(newStartCount, removeFromIndex) {
	var removeUntilIndex;
	if (removeFromIndex !== start) {
		removeUntilIndex = finalPath.findIndex(elt => elt === checkpoints[removeFromIndex + 1]);
	} else {
		removeFromIndex = 0;
		removeUntilIndex = finalPath.findIndex(elt => elt === checkpoints[0]);
	}
	console.log(removeFromIndex, removeUntilIndex - removeFromIndex);
	finalPath.splice(removeFromIndex, removeUntilIndex - removeFromIndex);
	countLimit = 1;
	startAlgo(0, true);
}