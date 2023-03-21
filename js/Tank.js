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

    this._tracksLeft = createAnimatedSprite(["TrackCFrame1", "TrackCFrame2"], {x: 0,y: -80});
    this._tracksLeft.animationSpeed = 0.25;

    this._tracksRight = createAnimatedSprite(["TrackCFrame1", "TrackCFrame2"], {x: 0,y: 80});
    this._tracksRight.animationSpeed = 0.25;

    this._view.addChild(this._tracksLeft, this._tracksRight);

    this._view.addChild(createSprite("HeavyHullB"));
    this._view.addChild(createSprite("HeavyGunB", { x: 140, y: -27 }));
    this._view.addChild(createSprite("HeavyGunB", { x: 160, y: 29 }));

    this._view.addChild(createSprite("GunConnectorD", { x: 0, y: 80 }));
    this._view.addChild(createSprite("HeavyTowerB"));
  }
  
  get view() {
    return this._view
  }
}