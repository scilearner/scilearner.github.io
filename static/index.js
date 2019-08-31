var container = document.getElementById('mytimeline');
var global_data = null;
var global_items = [];
var timeline = null;
var current_index = -1;
var play_audio = false;
currentTimeTimer = null;
start_point = null;
end_point = null;

function stop() {
    if (this.currentTimeTimer !== undefined) {
        clearTimeout(this.currentTimeTimer);
        delete this.currentTimeTimer;
    }
}

function update() {
    stop();
    // determine interval to refresh
    current_time = timeline.customTimes[0].getCustomTime();
    if (current_time.getTime() > end_point.getTime()) return;
    var i = 0
    for (i = 0; i < global_items.length - 1; i++) {
        var item = new Date(global_items[i][0]);
        var next_item = new Date(global_items[i + 1][0]);
        
        if (item > current_time) {
            break;
        }
        
        if (next_item < current_time) {
            continue;
        }
        
        if (item < current_time && current_time < next_item && document.getElementById("china").src != global_items[i][2]) {
            console.log(current_time + " " + item + " " + global_items[i][1]);
            $("#china").attr("src", global_items[i][2]);
            break;
        }
    }

    let interval = 40;
    const scale = (end_point.getTime() - start_point.getTime()) / interval / $("#time").val();
    timeline.customTimes[0].setCustomTime(new Date(current_time.getTime() + scale));
    timeline.moveTo(new Date(current_time.getTime() + scale), {animation: false});

    // start a renderTimer to adjust for the new time
    currentTimeTimer = setTimeout(update, interval);
}

function update_one() {
    stop();
    // determine interval to refresh
    current_time = timeline.customTimes[0].getCustomTime();
    if (current_time.getTime() > end_point.getTime()) return;
    var i = 0;
    for (i = 0; i < global_items.length - 1; i++) {
        var item = new Date(global_items[i][0]);
        var next_item = new Date(global_items[i + 1][0]);

        if (item > current_time) {
            break;
        }
        if (next_item < current_time) {
            continue;
        }
        
        if (item < current_time && current_time < next_item &&  current_index != i) {
            $("#china").attr("src", global_items[i][2]);
            play_audio = false;
            if (global_items[i][4]) {
                var temp = '<audio autoplay controls="controls"><source src="' + global_items[i][4] + '" type="audio/mp3"></audio>'
                console.log(temp);
                $("#bgm").html(temp);
                play_audio = true;
            }
            current_index = i;
            break;
        }
    }

    let interval = 40;
    var l = $("#time").val();
    if (play_audio == true) {
        l = 1800;
    }
    const scale = (end_point.getTime() - start_point.getTime()) / interval / l;
    timeline.customTimes[0].setCustomTime(new Date(current_time.getTime() + scale));
    timeline.moveTo(new Date(current_time.getTime() + scale), {animation: false});

    // start a renderTimer to adjust for the new time
    currentTimeTimer = setTimeout(update_one, interval);
}
