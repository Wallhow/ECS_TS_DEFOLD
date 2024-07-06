import { ecs } from "../../../ecs/core/ECS";

export function newCharEntity(pos: { x: number, y: number }) {
    const gameObj = ecs.comps.create('GO', { hash: factory.create("/factories#" + 'character', vmath.vector3()) });
    const comp = ecs.comps.create('PositionComponent', { x: pos.x, y: pos.y });


    const e = ecs.newEntity();
    const velocity = ecs.comps.create('VelocityComponent', { x: 0, y: 0 });
    const tint = ecs.comps.create('TintComponent', { x: 1, y: 1, z: 1, spriteUrl: msg.url(null, gameObj.hash, 'sprite') });
    const controller = ecs.comps.create('InputComponent', {
        init(controller) {
            controller.on('W', (isPressed) => {
                velocity.y = isPressed ? 10 : 0;
                tint.z = isPressed ? 0.5 : 1;
            });
            controller.on('S', (isPressed) => {
                velocity.y = isPressed ? -10 : 0;
                tint.z = isPressed ? 0 : 1;
            });
            controller.on('A', (isPressed) => velocity.x = isPressed ? -10 : 0);
            controller.on('D', (isPressed) => velocity.x = isPressed ? 10 : 0);
        }
    });




    ecs.addComponent(e, comp);
    ecs.addComponent(e, gameObj);
    ecs.addComponent(e, velocity);
    ecs.addComponent(e, controller);
    ecs.addComponent(e, tint);
}