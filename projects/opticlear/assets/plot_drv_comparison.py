#!/usr/bin/env python3
"""Generate the OptiClear Table 1 true-DRV comparison figure.

The script intentionally uses only Pillow so it can run without a plotting
package. Tune the configuration block below, then run:

    python3 plot_drv_comparison.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


# ------------------------------- Configuration ----------------------------
OUTPUT_PATH = Path(__file__).with_name("opticlear-drv-comparison.png")
CANVAS_SIZE = (4600, 3000)
BACKGROUND = "#FFFFFF"

# Increase these values for larger labels in the exported figure.
factor = 1.7
TITLE_SIZE = 82 * factor
SUBTITLE_SIZE = 38 * factor
AXIS_TITLE_SIZE = 44 * factor
TICK_SIZE = 36 * factor
DEVICE_LABEL_SIZE = 34 * factor
VALUE_SIZE = 30 * factor
LEGEND_SIZE = 34 * factor
NOTE_SIZE = 32 * factor

# The larger left margin keeps the first bar and the y-axis labels separate.
PLOT_LEFT = 500
PLOT_RIGHT = 150
PLOT_TOP = 380
PLOT_BOTTOM = 460
Y_MAX = 850

# Muted, high-contrast colors. OptiClear methods are emphasized with the
# ASU maroon and a dark teal; baselines remain visually distinct but quieter.
COLORS = {
    "Original mask": "#AEB7BD",
    "Open / Close": "#6F9FB5",
    "Gap & Curvature": "#D59D3E",
    "OptiClear-R": "#0081CC",
    "OptiClear-D": "#EE6FEB",
}

DEVICES = ["Bending", "Crossing", "Optical\ndiode", "1×3\nSplitter", "MDM", "WDM", "TTS"]
DATA = {
    "Original mask": [586, 28, 562, 21, 108, 594, 799],
    "Open / Close": [532, 0, 513, 0, 100, 533, 624],
    "Gap & Curvature": [344, 0, 340, 15, 81, 430, 630],
    "OptiClear-R": [0, 0, 0, 0, 0, 0, 0],
    "OptiClear-D": [0, 0, 0, 0, 0, 0, 0],
}

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
FONT_REGULAR = FONT_DIR / "Arial.ttf"
FONT_BOLD = FONT_DIR / "Arial Bold.ttf"
FONT_ITALIC = FONT_DIR / "Arial Italic.ttf"


def make_font(path: Path, size: int):
    return ImageFont.truetype(str(path), size)


def centered_text(draw, xy, text, font, fill, anchor="mm"):
    draw.text(xy, text, font=font, fill=fill, anchor=anchor)


def y_for(value, y_top, y_bottom, y_max):
    return y_bottom - (value / y_max) * (y_bottom - y_top)


def draw_grid_and_axes(draw, x0, x1, y_top, y_bottom, y_max, tick_values, fonts):
    tick_font, axis_font = fonts
    for tick in tick_values:
        y = y_for(tick, y_top, y_bottom, y_max)
        draw.line((x0, y, x1, y), fill="#D8DDE0", width=3)
        label = str(tick)
        bbox = draw.textbbox((0, 0), label, font=tick_font)
        draw.text(
            (x0 - 28 - (bbox[2] - bbox[0]), y - (bbox[3] - bbox[1]) / 2),
            label,
            font=tick_font,
            fill="#3B4145",
        )
    draw.line((x0, y_top, x0, y_bottom), fill="#252A2D", width=5)
    draw.line((x0, y_bottom, x1, y_bottom), fill="#252A2D", width=5)
    centered_text(draw, (115, (y_top + y_bottom) / 2), "#DRV", axis_font, "#252A2D")


def draw_grouped_bars(draw, devices, series, x0, x1, y_top, y_bottom, y_max, fonts):
    label_font, value_font = fonts
    group_width = (x1 - x0) / len(devices)
    # Keep the complete first group to the right of the y-axis.
    bar_width = 72
    bar_gap = 14
    group_bars_width = len(series) * bar_width + (len(series) - 1) * bar_gap

    for device_index, device in enumerate(devices):
        center = x0 + group_width * (device_index + 0.5)
        start = center - group_bars_width / 2
        for series_index, name in enumerate(series):
            value = DATA[name][DEVICES.index(device)]
            bx0 = start + series_index * (bar_width + bar_gap)
            bx1 = bx0 + bar_width
            by0 = y_for(value, y_top, y_bottom, y_max) if value else y_bottom - 5
            draw.rectangle((bx0, by0, bx1, y_bottom), fill=COLORS[name], outline="#303538", width=2)
            if value == 0:
                draw.line((bx0 + 10, y_bottom - 4, bx1 - 10, y_bottom - 4), fill=COLORS[name], width=9)
            value_label = str(value)
            centered_text(draw, ((bx0 + bx1) / 2, by0 - 30), value_label, value_font, "#252A2D", anchor="mb")

        for line_index, line in enumerate(device.split("\n")):
            centered_text(
                draw,
                (center, y_bottom + 52 + line_index * 38),
                line,
                label_font,
                "#303538",
            )


def draw_legend(draw, series, x, y, font):
    item_gap = 62
    swatch = 38
    widths = []
    for name in series:
        bbox = draw.textbbox((0, 0), name, font=font)
        widths.append(bbox[2] - bbox[0])
    total_width = sum(swatch + 18 + width for width in widths) + item_gap * (len(series) - 1)
    x = (CANVAS_SIZE[0] - total_width) / 2
    for name, width in zip(series, widths):
        draw.rectangle((x, y - 25, x + swatch, y + 14), fill=COLORS[name], outline="#303538", width=2)
        draw.text((x + swatch + 18, y - 26), name, font=font, fill="#252A2D")
        x += swatch + 18 + width + item_gap


def main():
    img = Image.new("RGB", CANVAS_SIZE, BACKGROUND)
    draw = ImageDraw.Draw(img)
    title_font = make_font(FONT_BOLD, TITLE_SIZE)
    subtitle_font = make_font(FONT_REGULAR, SUBTITLE_SIZE)
    axis_font = make_font(FONT_REGULAR, AXIS_TITLE_SIZE)
    tick_font = make_font(FONT_REGULAR, TICK_SIZE)
    label_font = make_font(FONT_REGULAR, DEVICE_LABEL_SIZE)
    value_font = make_font(FONT_BOLD, VALUE_SIZE)
    legend_font = make_font(FONT_REGULAR, LEGEND_SIZE)
    note_font = make_font(FONT_ITALIC, NOTE_SIZE)
    left, right = PLOT_LEFT, CANVAS_SIZE[0] - PLOT_RIGHT
    top, bottom = PLOT_TOP, CANVAS_SIZE[1] - PLOT_BOTTOM
    draw.text((left, 62), "Design-rule legalization removes DRVs", font=title_font, fill="#1D2225")
    draw.text((left, 220), "Table 1 comparison across inverse-designed photonic devices", font=subtitle_font, fill="#5B6469")

    draw_grid_and_axes(draw, left, right, top, bottom, Y_MAX, [0, 200, 400, 600, 800], (tick_font, axis_font))
    draw_grouped_bars(draw, DEVICES, list(DATA), left, right, top, bottom, Y_MAX, (label_font, value_font))
    centered_text(draw, ((left + right) / 2, CANVAS_SIZE[1] - 210), "Inverse-designed photonic device", axis_font, "#252A2D")
    draw_legend(draw, list(DATA), 0, CANVAS_SIZE[1] - 100, legend_font)
    # draw.text(
    #     (left, CANVAS_SIZE[1] - 43),
    #     "Lower is better. OptiClear-R and OptiClear-D reduce true DRVs to zero for every evaluated device.",
    #     font=note_font,
    #     fill="#5B6469",
    # )
    img.save(OUTPUT_PATH, format="PNG", dpi=(300, 300), optimize=True)
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
