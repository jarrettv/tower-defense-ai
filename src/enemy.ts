import { Engine, Actor, CollisionType, Vector, Color } from 'excalibur';

export default class Enemy extends Actor {
  path: Vector[];
  speed: number;
  constructor(x: number, y: number, path: Vector[], speed: number) {
    super({
      pos: new Vector(x, y),
      radius: 10,
      color: Color.Green,
      collisionType: CollisionType.Active,
    });
    this.path = path;
    this.speed = speed;
  }

  onInitialize(): void {
    // spawn at start point
    this.pos = new Vector(this.path[0].x, this.path[0].y);
    this.actions.repeat(ctx => {
      // forward path (skip first spawn point)
      for (let i = 1; i < this.path.length; i++) {
        ctx.moveTo(this.path[i].x, this.path[i].y, this.speed);
      }
    });

    this.on('collisionstart', () => this.kill())
  }

}