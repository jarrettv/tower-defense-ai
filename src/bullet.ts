import { Engine, Actor, Vector, Color, CollisionType } from 'excalibur';

// Define a Bullet class
class Bullet extends Actor {
  target: Actor;

  constructor(x: number, y: number, target: Actor) {

    super({
      pos: new Vector(x, y),
      radius: 3,
      color: Color.Red,
      collisionType: CollisionType.Passive
    });

    this.target = target;
  }

  onInitialize(_engine: Engine): void {
    this.actions.repeat(ctx => {
      ctx.meet(this.target, 300);
    })
    this.on('collisionstart', () => {
      this.actions.clearActions();
      this.kill();
    });
  }

  update(e: Engine, d: number) {
    super.update(e, d);
    if (this.target.isKilled()) {
      //const dir = new Vector(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y);
      this.actions.clearActions();
      this.kill();
    }
  }
}

export default Bullet;