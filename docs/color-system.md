# Color system

Ink backgrounds and cool layered surfaces retain the dark identity. Warm ivory carries primary text; slate secondary text stays readable. Periwinkle is reserved for navigation, interactive emphasis and focus. Deep indigo supports white button labels. Mint indicates completion in illustrative workflows; warm red identifies validation errors alongside text.

`app/colors.css` is the semantic palette and final component color layer, imported after existing styles. Tokens include background, surface, raised surface, text, muted text, separator, control border, accent, action hover, success, danger and focus. Artwork and supplied screenshots retain their own palettes.

Keep decoration on `--line`, control boundaries on `--border-control`, body copy on `--text` or `--muted`. Use `--accent-strong` with `--on-accent` for primary buttons. Never communicate status through color alone. Native controls use the dark color scheme; selection and focus have explicit contrasting colors.

Validation: production build passed; all 25 Edge accessibility tests passed across mobile/desktop routes and interactive states. Desktop hero and mobile contact were visually reviewed.
