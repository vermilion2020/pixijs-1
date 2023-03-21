import { Application, Graphics } from './pixi.mjs';
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
}

assestMap.sprites.forEach(sprite => {
  app.loader.add(sprite);
});

app.loader.load(runGame);
