local ____exports = {}
local ____ECS = require("ecs.core.ECS")
local ecs = ____ECS.ecs
function ____exports.newCharEntity(pos)
    local gameObj = ecs.comps.create(
        "GO",
        {hash = factory.create(
            "/factories#" .. "character",
            vmath.vector3()
        )}
    )
    local comp = ecs.comps.create("PositionComponent", {x = pos.x, y = pos.y})
    local counter = ecs.comps.create("CounterComponent", {counter = 0})
    local e = ecs.newEntity()
    local velocity = ecs.comps.create("VelocityComponent", {x = 0, y = 0})
    local controller = ecs.comps.create(
        "InputComponent",
        {init = function(self, controller)
            controller.on(
                "W",
                function(isPressed)
                    local ____temp_0 = isPressed and 10 or 0
                    velocity.y = ____temp_0
                    return ____temp_0
                end
            )
            controller.on(
                "S",
                function(isPressed)
                    local ____temp_1 = isPressed and -10 or 0
                    velocity.y = ____temp_1
                    return ____temp_1
                end
            )
            controller.on(
                "A",
                function(isPressed)
                    local ____temp_2 = isPressed and -10 or 0
                    velocity.x = ____temp_2
                    return ____temp_2
                end
            )
            controller.on(
                "D",
                function(isPressed)
                    local ____temp_3 = isPressed and 10 or 0
                    velocity.x = ____temp_3
                    return ____temp_3
                end
            )
        end}
    )
    ecs.addComponent(e, comp)
    ecs.addComponent(e, counter)
    ecs.addComponent(e, gameObj)
    ecs.addComponent(e, velocity)
    ecs.addComponent(e, controller)
end
return ____exports
