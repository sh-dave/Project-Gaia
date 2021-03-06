// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var audio, audioButton, body, controls, fn, fpsCounter, fpsCounterTime, fullscreenButton, gameLoop, i, lastFrameTime, len, onFullscreenChange, projectGaia, running, startButton, totalTime, worldButton, worldButtons, worlds;

  projectGaia = new ProjectGaia;

  totalTime = 0;

  lastFrameTime = null;

  fpsCounter = 0;

  fpsCounterTime = 0;

  running = false;

  audio = true;

  gameLoop = function(timestamp) {
    var elapsedTime, gameTime;
    if (lastFrameTime == null) {
      lastFrameTime = timestamp;
    }
    elapsedTime = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;
    elapsedTime = Math.min(1, elapsedTime);
    fpsCounter++;
    fpsCounterTime += elapsedTime;
    if (fpsCounterTime > 1) {
      console.log("Running at " + fpsCounter + " FPS");
      fpsCounter = 0;
      fpsCounterTime -= 1;
    }
    if (running) {
      totalTime += elapsedTime;
    }
    gameTime = {
      elapsedGameTime: elapsedTime,
      totalGameTime: totalTime
    };
    projectGaia.update(gameTime);
    projectGaia.draw(gameTime);
    return requestAnimationFrame(gameLoop);
  };

  requestAnimationFrame(gameLoop);

  worlds = document.getElementsByClassName('worlds')[0];

  worldButtons = document.getElementsByClassName('world-button');

  startButton = document.getElementsByClassName('start-button')[0];

  controls = document.getElementsByClassName('controls')[0];

  audioButton = document.getElementsByClassName('audio-button')[0];

  fullscreenButton = document.getElementsByClassName('fullscreen-button')[0];

  body = document.getElementsByTagName('body')[0];

  fn = (function(_this) {
    return function(worldButton) {
      return worldButton.onclick = function() {
        var urlParameters, worldIndex;
        urlParameters = new URLSearchParams(window.location.search);
        return worldIndex = urlParameters.get('world') || 0;
      };
    };
  })(this);
  for (i = 0, len = worldButtons.length; i < len; i++) {
    worldButton = worldButtons[i];
    fn(worldButton);
  }

  startButton.onclick = (function(_this) {
    return function() {
      running = true;
      projectGaia.start();
      startButton.classList.add('fade-out');
      startButton.innerText = '';
      worlds.classList.remove('start');
      controls.classList.remove('fade-out');
      return setTimeout(function() {
        return startButton.remove();
      }, 1000);
    };
  })(this);

  audioButton.onclick = (function(_this) {
    return function() {
      if (audio) {
        projectGaia.mute();
        audioButton.classList.add('off');
      } else {
        projectGaia.unmute();
        audioButton.classList.remove('off');
      }
      return audio = !audio;
    };
  })(this);

  fullscreenButton.onclick = (function(_this) {
    return function() {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (typeof document.exitFullscreen === "function") {
          document.exitFullscreen();
        }
        return typeof document.webkitExitFullscreen === "function" ? document.webkitExitFullscreen() : void 0;
      } else {
        if (body.requestFullscreen) {
          return body.requestFullscreen();
        } else if (body.webkitRequestFullscreen) {
          return body.webkitRequestFullscreen();
        }
      }
    };
  })(this);

  onFullscreenChange = (function(_this) {
    return function(event) {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        return worlds.classList.add('fade-out');
      } else {
        return worlds.classList.remove('fade-out');
      }
    };
  })(this);

  body.addEventListener('fullscreenchange', onFullscreenChange);

  body.addEventListener('webkitfullscreenchange', onFullscreenChange);

}).call(this);

//# sourceMappingURL=main.js.map
