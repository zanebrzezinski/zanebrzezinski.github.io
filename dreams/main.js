
var parseVideoInfo = function(obj) {

  var progressBar = document.getElementById('progress-bar-ctr');
  var len = obj.duration;
  var marker = document.getElementById('hidden-marker');

  var markers = [];

  // loop through markers array, create DOM markers,
  // set click handlers and data attribute.
  for (var i = 0; i < obj.markers.length; i++) {
    clone = marker.cloneNode(true);
    clone.removeAttribute('id');
    var progressInt = (obj.markers[i].timecode / len) * 100
    var progress = progressInt + "%"
    clone.querySelector('.marker').setAttribute('data-progress', progress)
    clone.style.left = progress;
    var bubble = clone.getElementsByClassName('marker-bubble')[0];
    bubble.textContent = obj.markers[i].label

    // this keeps bubbles from moving too close to edge of window.
    if (progressInt > 50) {
      bubble.style.right = "-50%";
    } else {
      bubble.style.left = "-50%";
    }

    clone.querySelector('.marker').addEventListener("click", setChapter);

    progressBar.appendChild(clone);
    markers.push(clone);
  }
}

var setChapter = function(e){
  var fillBar = document.getElementById('filled-bar')
  var target = e.target
  if (target.getAttribute('data-progress')) {
    var progress = target.getAttribute('data-progress')
  }
  if (progress) {
    fillBar.style.width = progress;
  }
}
