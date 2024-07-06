local ____exports = {}
function ____exports.UILabel(url)
    return {
        url = url,
        set_text = function(text)
            label.set_text(url, text)
        end,
        get_text = function()
            return label.get_text(url)
        end,
        set_visible = function(visible)
            local to = go.get(url, "color")
            to.w = visible and 1 or 0
            go.set(url, "color", to)
        end,
        set_scale = function(scale)
            go.set(
                url,
                "scale",
                vmath.vector3(scale, scale, 1)
            )
        end
    }
end
return ____exports
