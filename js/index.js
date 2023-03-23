import { Application, Graphics, Rectangle } from './pixi.mjs';
import { TweenManager } from './Tween.js';
import { assestMap } from './assetsMap.js';
import { Tank } from './Tank.js';

const app = new Application({
  view: document.getElementById('canvas'),
  backgroundColor: 0xc2c2c2,
  width: 800,
  height: 800
});

const runGame = () => {
  const marker = new Graphics();
  marker.beginFill(0xff0000, 1);
  marker.drawCircle(0, 0, 5);
  marker.endFill();

  const tank = new Tank();
  app.stage.addChild(tank.view);
  app.stage.addChild(marker);
  app.stage.position.set(800/2, 800/2);
  window['TANK'] = tank;

  const tweenManager = new TweenManager(app.ticker);

  const moveTank = ({ data }) => {
    const distanceToCenter = data.getLocalPosition(app.stage);
    const distanceToTank = data.getLocalPosition(tank.view);
    const angle = Math.atan2(distanceToTank.y, distanceToTank.x);
    
    const move = () => {
      tweenManager.createTween(tank, 3000, { x: distanceToCenter.x, y: distanceToCenter.y }, {
        onStart: () => tank.startTracks(),
        onFinish: () =>  tank.stopTracks()
      });
    } 
    

    tweenManager.createTween(tank, 1000, { towerDirection: angle }, {
      onFinish: () => {}
    });
    tweenManager.createTween(tank, 2000, { bodyDirection: angle }, {
      onStart: () => tank.startTracks(),
      onFinish: () => {
        tank.stopTracks();
        move()
      }
    });
  };

  app.stage.on("pointerdown", moveTank);
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(-400, -400, 800, 800);
}

assestMap.sprites.forEach(sprite => {
  app.loader.add(sprite);
});

app.loader.load(runGame);
