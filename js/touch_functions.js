/* INCLUDED HERE:
    - Every function related handling a touch event.
*/

document.addEventListener("touchstart", function(e) {
  //gain.gain.cancelScheduledValues(0);
  e.preventDefault();
  if (!firstTouchEver) {
    setUp();
    firstTouchEver = true;
  }
}, false);

function setTouchListeners (){

  // When the user touches the screen, we simulate a mouse click
  drawCanvas.addEventListener("touchstart", function(e) {
    e.preventDefault();

    if (nFingers<MAXFINGERS){
      let mouseEvent;
      touch = e.touches;
      nFingers = touch.length;
      if (nFingers>MAXFINGERS){
        nFingers = MAXFINGERS;
      }

      if (mode=="pure"){
        for (let j=0; j<nFingers; j++){
          finger = j;
          mouseEvent = new MouseEvent("mousedown", {
            clientX: touch[j].clientX,
            clientY: touch[j].clientY
          });
          drawCanvas.dispatchEvent(mouseEvent);
        }
      } else {
        for (let j=0; j<1; j++){
          finger = j;
          mouseEvent = new MouseEvent("mousedown", {
            clientX: touch[j].clientX,
            clientY: touch[j].clientY
          });
          drawCanvas.dispatchEvent(mouseEvent);
        }
      }

      if (!isStarted){
        isStarted = true;
        start();
      } else {
        renderCanvas();
      }
      firstDown = false;
    }
  }, false);

  // When the user stops touching the screen, we simulate a mouse unclick
  drawCanvas.addEventListener("touchend", function(e) {
    e.preventDefault();
    if (mode==="pure"){
      let indexFingerUp;
      auxTouch = [];
      for (let z=0; z<touch.length; z++){
        auxTouch[z] = touch [z];
      }
      for (let z=0; z<e.changedTouches.length; z++){
        for (let j=0; j<auxTouch.length; j++){
          if(auxTouch[j] && e.changedTouches[z]){
            if (auxTouch[j].clientX === e.changedTouches[z].clientX && auxTouch[j].clientY === e.changedTouches[z].clientY){
              indexFingerUp = j;
            }
          }
        }
        if (indexFingerUp<MAXFINGERS && nFingers<=MAXFINGERS && indexFingerUp<nFingers){
          nFingers--;


          deleteFinger (indexFingerUp);
        }
      }
      touch = auxTouch;
      auxTouch = [];
      if (nFingers<=0){
        setToZero();
        releaseSynths();
      } else {
        draw();
      }
    } else {
      if(touch[0] && e.changedTouches[0]){
        if (touch[0].clientX === e.changedTouches[0].clientX && touch[0].clientY === e.changedTouches[0].clientY && pureOn){
          setToZero();
          releaseSynths();
        }
      }
    }
  }, false);

  // When the user moves its fingers in the screen, we simulate a mouse move
  drawCanvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    if (nFingers<= MAXFINGERS){
        let mouseEvent;
        touch = e.touches;
        if (mode=="pure"){
          for (let j=0; j<touch.length; j++){
            finger = j;
            mouseEvent = new MouseEvent("mousemove", {
              clientX: touch[j].clientX,
              clientY: touch[j].clientY
            });
            document.dispatchEvent(mouseEvent);
          }
        } else{
          for (let j=0; j<1; j++){
            finger = j;
            mouseEvent = new MouseEvent("mousemove", {
              clientX: touch[j].clientX,
              clientY: touch[j].clientY
            });
            document.dispatchEvent(mouseEvent);
          }
        }
        renderCanvas();
    }
  }, false);

}
