var table;

function calcTotalAvg() {
    var total_distance = 0.0;
    var total_time = 0.0;
    // Check if all fields are filled out to calc total avg time
    var isValid = true;
    var distances = document.querySelectorAll(".distance");
    var times = document.querySelectorAll(".time");
    var result = document.getElementById("result");
    for (let i = 0; i < distances.length; i++) {
        if (distances[i].value == "") {
            isValid = false;
        } else {
            total_distance += parseFloat(distances[i].value);
        }

    }
    for (let i = 0; i < times.length; i++) {
        if (times[i].value == "" && parseFloat(times[i].getAttribute("data-minutes")) <= 0.0) {
            isValid = false;
        } else {
            total_time += parseFloat(times[i].getAttribute("data-minutes"));
        }

    }
    if (isValid) {
        total_time /= 60;
        var avg = (total_distance / total_time).toFixed(2);

        result.innerHTML = "Total Average Speed: " + avg + "km/h";
    } else {
        result.innerHTML = "";
    }
}

function calcTime(e) {
    // Display time
    var tr = e.target.parentElement.parentElement;
    var dis = tr.querySelector(".distance");
    var spd = tr.querySelector(".speed");
    var tm = tr.querySelector(".time");
    if (dis.value != "" && spd.value != "" && !isNaN(dis.value) && !isNaN(spd.value)) {
        var minutes = dis.value / spd.value * 60;
        console.log(minutes);
        var mins = Math.round(minutes % 60);
        var fmins = ("0" + mins).slice(-2);
        var hrs = Math.floor(minutes / 60);
        var fhrs = hrs < 10 ? ("0" + hrs).slice(-2) : hrs;
        tm.value = fhrs + ":" + fmins;
        tm.setAttribute("data-minutes", minutes);
    } else {
        tm.value = "";
        tm.setAttribute("data-minutes", 0);
    }

    calcTotalAvg();

}


function addTrack() {
    // Find a <table> element with id="myTable":
    // var table = document.getElementById("data-table");

    // Create an empty <tr> element and add it to the last position of the table:
    var row = table.insertRow(table.rows.length);

    // Insert new cells (<td> elements)
    var trackName = row.insertCell(0);
    var distance = row.insertCell(1);
    var speed = row.insertCell(2);
    var time = row.insertCell(3);

    // Add input fields to the new cells:
    trackName.innerHTML = String.fromCharCode(row.rowIndex + 64);
    distance.innerHTML = '<input type="number" min="1" class="distance focus" onkeypress="return onlyNumberKey(this, event)" value="">';
    speed.innerHTML = '<input type="number" min="1" class="speed focus" onkeypress="return onlyNumberKey(this, event)" value="">';
    time.innerHTML = '<input type="text" class="time" value="" data-minutes="0" readonly>';
    distance.addEventListener('change', calcTime);
    speed.addEventListener('change', calcTime);

    // Check the total avg calculation requirements
    calcTotalAvg();
}

function removeTrack() {
    var len = table.rows.length;
    if (len <= 3) return;
    table.deleteRow(len - 1);

    calcTotalAvg();
}

function onlyNumberKey(obj, evt) {
    if (evt.keyCode == 13) {
        var ele = document.querySelectorAll("input.focus");
        for (var i = 0; i < ele.length; i++) {
            var q = (i == ele.length - 1) ? 0 : i + 1; // if last element : if any other 
            if (obj == ele[i]) {
                ele[q].focus();
                break
            }
        }
        return false;
    }

    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}



window.onload = function () {
    table = document.getElementById("data-table");

    addTrack();
    addTrack();

    document.addEventListener('keypress', function (e) {
        console.log(e.key);
    })

}