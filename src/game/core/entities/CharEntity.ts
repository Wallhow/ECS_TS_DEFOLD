import { ecs } from "../../../ecs/core/ECS";

export function newCharEntity(pos: { x: number, y: number }) {
    const gameObj = ecs.comps.create('GO', { hash: factory.create("/factories#" + 'character', vmath.vector3()) });
    const comp = ecs.comps.create('PositionComponent', { x: pos.x, y: pos.y });
    const counter = ecs.comps.create('CounterComponent', { counter: 0 });

    const e = ecs.newEntity();
    const velocity = ecs.comps.create('VelocityComponent', { x: 0, y: 0 });
    const controller = ecs.comps.create('InputComponent', {
        init(controller) {
            controller.on('W', (isPressed) => velocity.y = isPressed ? 10 : 0);
            controller.on('S', (isPressed) => velocity.y = isPressed ? -10 : 0);
            controller.on('A', (isPressed) => velocity.x = isPressed ? -10 : 0);
            controller.on('D', (isPressed) => velocity.x = isPressed ? 10 : 0);
        }
    });


    ecs.addComponent(e, comp);
    ecs.addComponent(e, counter);
    ecs.addComponent(e, gameObj);
    ecs.addComponent(e, velocity);
    ecs.addComponent(e, controller);

}