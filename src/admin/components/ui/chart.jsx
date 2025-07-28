import React from "react"
import * as Recharts from "recharts"
import { cn } from "../../lib/utils"

// Themes
const THEMES = { light: "", dark: ".dark" }

// Chart container to inject CSS vars based on config
export function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config || {}).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : ""
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

// -----------------------------
// TOOLTIP
// -----------------------------

export const ChartTooltip = Recharts.Tooltip

export const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const value = !labelKey && typeof label === "string" ? label : null

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      return value ? (
        <div className={cn("font-medium", labelClassName)}>{value}</div>
      ) : null
    }, [label, labelFormatter, payload, hideLabel, labelClassName, labelKey])

    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] gap-1.5 rounded-lg border bg-white px-3 py-2 text-xs shadow-lg",
          className
        )}
      >
        {tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const indicatorColor = color || item.payload?.fill || item.color

            return (
              <div key={index} className="flex items-center justify-between gap-2">
                {!hideIndicator && (
                  <div
                    className={cn(
                      "shrink-0 rounded-sm",
                      indicator === "dot" ? "h-2 w-2" :
                      indicator === "line" ? "w-4 h-0.5" :
                      indicator === "dashed" ? "w-4 h-0.5 border border-dashed" : ""
                    )}
                    style={{
                      backgroundColor: indicatorColor
                    }}
                  />
                )}
                <span className="text-muted-foreground">
                  {item.name}
                </span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {item.value?.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

// -----------------------------
// LEGEND
// -----------------------------

export const ChartLegend = Recharts.Legend

export const ChartLegendContent = React.forwardRef(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item, index) => {
          const indicatorColor = item.color || item.payload?.fill
          return (
            <div key={index} className="flex items-center gap-2">
              {!hideIcon && (
                <div
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <span className="text-sm">{item.value}</span>
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// -----------------------------
// Helper to extract config (stub)
// -----------------------------

function getPayloadConfigFromPayload(config, payload, key) {
  if (!payload) return undefined

  let configLabelKey = key
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key]
  } else if (payload.payload && typeof payload.payload[key] === "string") {
    configLabelKey = payload.payload[key]
  }

  return config?.[configLabelKey]
}
