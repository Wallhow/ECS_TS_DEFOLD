local ____exports = {}
local ____fs = require("autogen.fs")
local writeFileSync = ____fs.writeFileSync
local ____componentRegistry = require("autogen.componentRegistry")
local getAllComponentNames = ____componentRegistry.getAllComponentNames
local names = getAllComponentNames()
local types = names:map(function(name) return ("'" .. tostring(name)) .. "'" end):join(" | ")
local content = ((("\nexport type ComponentType = " .. tostring(types)) .. ";\n\nexport type ComponentMap = {\n    ") .. tostring(names:map(function(name) return ((tostring(name) .. ": ") .. tostring(name)) .. "Component;" end):join("\n"))) .. "\n};\n"
writeFileSync("src/componentTypes.ts", content)
return ____exports
