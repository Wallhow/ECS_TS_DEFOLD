local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local ____exports = {}
function ____exports.SystemManager()
    local getEntities, ecs
    function getEntities(components)
        local entities = {}
        local res = ecs.getEntitiesWithComponents(components)
        if #res > 0 then
            local e = res
            if e ~= undefined then
                for ____, i in ipairs(e) do
                    local entity = ecs.getEntity(i)
                    if __TS__ArrayFind(
                        entities,
                        function(____, e) return e.id == i end
                    ) == undefined then
                        entities[#entities + 1] = {id = i, components = entity}
                    end
                end
            end
        end
        return entities
    end
    local systems = {}
    local systemsIDs = -1
    local function create(componentsFiltering, methods)
        local ____systemsIDs_0 = systemsIDs
        systemsIDs = ____systemsIDs_0 + 1
        local system = __TS__ObjectAssign({UUID = ____systemsIDs_0, isEnabled = true, components = componentsFiltering}, methods)
        systems[#systems + 1] = system
        return systemsIDs
    end
    local function update(dt)
        for ____, system in ipairs(systems) do
            if system.isEnabled then
                local entities = getEntities(system.components)
                if system.update ~= undefined then
                    system:update(entities, dt)
                end
            end
        end
    end
    local function setEnabled(descSystem, isEnabled)
        if systems[descSystem + 1] ~= undefined then
            systems[descSystem + 1].isEnabled = isEnabled
        else
            assert(
                false,
                ("system with descriptor " .. tostring(descSystem)) .. "not found"
            )
        end
    end
    local function input(action_id, action)
        local inputSystems = __TS__ArrayFilter(
            systems,
            function(____, system) return __TS__ArrayIncludes(system.components, "InputComponent") end
        )
        if #inputSystems > 0 then
            for ____, system in ipairs(inputSystems) do
                local entities = getEntities(system.components)
                if system.input ~= undefined then
                    system:input(entities, action_id, action)
                end
            end
        end
    end
    local function init(_ecs)
        ecs = _ecs
    end
    return {
        update = update,
        input = input,
        create = create,
        init = init,
        setEnabled = setEnabled
    }
end
return ____exports
