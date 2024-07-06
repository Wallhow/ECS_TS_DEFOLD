local ____exports = {}
local ____ECS = require("ecs.core.ECS")
local ecs = ____ECS.ecs
function ____exports.GoSetPositionSystem()
    local tmp = vmath.vector3()
    return ecs.systems.create(
        {"PositionComponent", "GO"},
        {update = function(____, e)
            for ____, entity in ipairs(e) do
                local ____entity_components_0 = entity.components
                local PositionComponent = ____entity_components_0.PositionComponent
                local GO = ____entity_components_0.GO
                tmp.x = PositionComponent.x
                tmp.y = PositionComponent.y
                go.set_position(tmp, GO.hash)
            end
        end}
    )
end
return ____exports
