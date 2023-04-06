
// --- variables ---

var array;
var rowCount = 15;
var colCount = 15;
var round = 0;
var points = 0;
var pointsClaimable = false;
var claimingPoints = false;


// --- functions ---

// updates array variable || claims points
// note : add try catch in case error deletes points entirely

function birdHit(rownum, colnum) {
	if(array[rownum][colnum] > 0) {

		if(!claimingPoints) {  // updates array variable

			currentPoints = array[rownum][colnum];

			var yNum = Math.floor(Math.random() * 3) - 1;
			
			if(yNum != 0) {
				var xNum = Math.floor(Math.random() * 3) - 1;
			}
			else {
				var xNum = Math.random() < 0.5 ? -1 : 1;
			}

			if(rownum+yNum>=0 && colnum+xNum>=0 && rownum+yNum+1<=rowCount && colnum+xNum+1<=15) {
				array[rownum+yNum][colnum+xNum] += currentPoints;
			}
			else {
				birdHit(rownum, colnum);
			}

			array[rownum][colnum] = 0;

			console.log(yNum);
			console.log(xNum);

			updateTable();
			updateRound();

		}
		else {  // claims points

			points += array[rownum][colnum];
			array[rownum][colnum] = 1;

			cannotClaim();
			updatePoints();
			updateTable();
			claimingPoints = false;
			$('#claim').css('color', 'var(--txtclr1)');

		}
	}
	else {
		// nothing.
	}
}

// gets coordinates of clicked td

function getCoordinates(td) {
	var rownum = td.closest('tr').rowIndex;
	var colnum = td.cellIndex;

	birdHit(rownum, colnum);
}

// DEPRECATED gets coordinates from input

function getCoordinatesDEP() {
	let rownum = Number($('#rownum').val());
	let colnum = Number($('#colnum').val());
	
	birdHit(rownum, colnum);
}

// updates round

function updateRound() {
	round++;
	$('#round').html('round<br><h2>' + round + '</h2>');

	if(round%10==0) {
		canClaim();
	}
	else {
		cannotClaim();
	}
}

// updates points

function updatePoints() {
	$('#points').html('points<br><h2>' + points + '</h2>');
}

// sets point claiming mode

function claimPoints() {
	if(pointsClaimable) {
		claimingPoints = true;
		$('#claim').css('color', 'gold');
	}
	else {
		// nothing :)
	}
}

// sets points claimable or not

function canClaim() {
	pointsClaimable = true;
	$('#claim').css('opacity', '1.0');

	$('#popup').css('height', '8%');
	$('#popup h3').css('opacity', '.8');
}

function cannotClaim() {
	pointsClaimable = false;
	$('#claim').css('opacity', '0.35');

	$('#popup').css('height', '0');
	$('#popup h3').css('opacity', '0');
}

// updates html table

function updateTable() {
	$('#board').html(returnHtmlTable());
}

// creates html from array variable

function returnHtmlTable() {
	let table = '';
	for(i=0; i<15; i++) {
		table += '<tr>';
		for(j=0; j<15; j++) {
			table += '<td onclick="getCoordinates(this)">' + array[i][j] + '</td>';
		}
		table += '</tr>';
	}

	return table;
}

// creates array variable

function createArray(rowCount, colCount) {
	array = new Array(rowCount);
	for(i=0; i<rowCount; i++) {
		array[i] = new Array(colCount);
	}

	for(i=0; i<rowCount; i++) {
		for(j=0; j<colCount; j++) {
			array[i][j] = 1;
		}
	}

	$('#board').append(returnHtmlTable());
}


// --- on document load ---

$(document).ready(function() {
	createArray(rowCount, colCount);
	$('#claim').click(function() {
		claimPoints();
	})
});