import { AnimatedSprite, Container, Texture, Sprite } from "./pixi.mjs";

export const createAnimatedSprite = (textureNames, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
  const textures = textureNames.map(name => Texture.from(name));
  const animatedSprite = new AnimatedSprite(textures);
  animatedSprite.position.copyFrom(position);
  animatedSprite.anchor.copyFrom(anchor);
  return animatedSprite;
}

export const createSprite = (textureName, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
  const texture =  Texture.from(textureName);
  const sprite = new Sprite(texture);
  sprite.position.copyFrom(position);
  sprite.anchor.copyFrom(anchor);
  return sprite;
}

export class Tank {
  constructor() {
    this._view = new Container();
    this._bodyContainer = new Container();

    this._tracksLeft = createAnimatedSprite(["TrackCFrame1", "TrackCFrame2"], {x: 0,y: -80});
    this._tracksLeft.animationSpeed = 0.25;

    this._tracksRight = createAnimatedSprite(["TrackCFrame1", "TrackCFrame2"], {x: 0,y: 80});
    this._tracksRight.animationSpeed = 0.25;

    this._towerContainer = new Container();
    this._view.addChild(this._bodyContainer);
    this._view.addChild(this._towerContainer);

    this._bodyContainer.addChild(this._tracksLeft, this._tracksRight);
    this._bodyContainer.addChild(createSprite("HeavyHullB"));

    this._towerContainer.addChild(createSprite("HeavyGunB", { x: 140, y: -27 }));
    this._towerContainer.addChild(createSprite("HeavyGunB", { x: 160, y: 29 }));
    this._towerContainer.addChild(createSprite("GunConnectorD", { x: 80, y: 0 }));
    this._towerContainer.addChild(createSprite("HeavyTowerB"));
  }
  
  get view() {
    return this._view
  }

  set towerDirection(value) {
    this._towerContainer.rotation = value;
  }

  get towerDirection() {
    return this._towerContainer.rotation;
  }

  get bodyDirection() {
    return this._bodyContainer.rotation;
  }

  set bodyDirection(value) {
    this._bodyContainer.rotation = value;
  }

  get x() {
    return this._view.position.x;
  }

  set x(value) {
    this._view.position.x = value;
  }

  get y() {
    return this._view.position.y;
  }

  set y(value) {
    this._view.position.y = value;
  }

  rotateTowerBy(angle) {
    this._towerContainer.rotation += angle;
  }

  rotateBodyBy(angle) {
    this._bodyContainer.rotation += angle;
  }

  startTracks() {
    this._tracksLeft.play();
    this._tracksRight.play();
  }

  stopTracks() {
    this._tracksLeft.stop();
    this._tracksRight.stop();
  }
}