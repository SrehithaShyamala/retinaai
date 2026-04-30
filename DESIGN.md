# Design Brief: RetinaAI — Patient Self-Screening

## Tone & Purpose
Empowering, reassuring, non-technical patient education. Dark theme reduces eye strain during image viewing. Plain-language explanations guide patients through self-screening with confidence and clarity.

## Color Palette (OKLCH)

| Token | Dark | Role |
|:------|:----:|:-----|
| Primary (Teal) | `0.65 0.18 200` | Primary CTA, health detail entry, trust |
| Accent (Cyan) | `0.68 0.2 195` | Grad-CAM heatmap overlay, focus states |
| Chart-1 (Green) | `0.72 0.25 120` | Stage 0 (No DR) — healthy, reassuring |
| Chart-2 (Yellow) | `0.68 0.24 80` | Stage 1 (Mild NPDR) — mild changes |
| Chart-3 (Orange) | `0.62 0.26 45` | Stage 2 (Moderate NPDR) — monitor closely |
| Chart-4 (Red) | `0.64 0.28 18` | Stage 3 (Severe NPDR) — consult doctor |
| Chart-5 (Deep Red) | `0.58 0.32 10` | Stage 4 (Proliferative) — seek immediate care |
| Destructive (Red) | `0.62 0.3 28` | Alerts, warnings, critical status |

## Typography

**Display**: DM Sans 700, 28–32px — stage badge, result headline
**Body**: DM Sans 400/500, 16–18px — patient instructions, risk explanation, health detail labels
**Mono**: Geist Mono 400, 13–14px — confidence percentage, risk score, timestamps

## Structural Zones

| Zone | Treatment |
|:-----|:----------|
| Hero / Login | Centered layout, `zone-hero` bg-background, large welcome text (32px), teal CTA button |
| Header | `zone-header` gradient from card to background, fine border-b, brand logo + logout |
| Health Details Form | `zone-form` card-based sections, 48px input height, 20px gutters, teal focus ring |
| Upload Area | Large 200px drop zone icon, centered, generous padding, cyan accent on hover |
| Result Display | Fundus image + cyan heatmap overlay side-by-side; severity badge (traffic-light) + confidence score below |
| Risk Score | Color-coded badge (green/yellow/orange/red) + 1–2 sentence plain-language guidance |
| Scan History | Timeline card view, `result-card` styling, each showing date, stage badge, risk level |
| Footer | `zone-footer` border-t, help text, "Questions?" link, timestamp, muted foreground |

## Spacing & Rhythm
- Gutters: 20px (desktop), 16px (tablet), 12px (mobile)
- Form input height: 48px (touch-friendly)
- Card padding: 24px
- Type leading: 1.6 (relaxed reading, medical patience)
- Section separation: 40px

## Component Patterns

**DR Severity Badges**: 5-color traffic-light spectrum (chart tokens), each with patient-friendly label
- **Stage 0** (No DR): Green `0.72 0.25 120` — "Your eye looks healthy"
- **Stage 1** (Mild NPDR): Yellow `0.68 0.24 80` — "Mild changes detected"
- **Stage 2** (Moderate NPDR): Orange `0.62 0.26 45` — "Moderate changes – monitor closely"
- **Stage 3** (Severe NPDR): Red `0.64 0.28 18` — "Severe changes – consult your doctor"
- **Stage 4** (Proliferative): Deep Red `0.58 0.32 10` — "Critical – seek immediate care"

**Grad-CAM Overlay**: Cyan screen blend (opacity 0.75) on dark fundus image; highlights lesion regions with clinical precision
**Risk Level Display**: Color-coded badge (green=Low, orange=Moderate, red=High) + plain-language guidance below
**Confidence Score**: Monospace badge, e.g., "92% confidence", positioned below result
**Scan History Card**: Date, eye (Left/Right), stage, risk; link to view full result

## Motion & Animation

- **Image Load**: Smooth fade-in (0.3s) as fundus image loads
- **Heatmap Toggle**: Cross-fade between image and heatmap overlay (0.4s)
- **Risk Status**: Subtle glow pulse if High risk (3s ease-in-out, red 0.3 opacity)
- **Focus Ring**: Soft cyan outline on form inputs and buttons
- **Transitions**: All interactive elements use `transition-smooth` (0.3s cubic-bezier)

## Constraints

1. **Clarity first**: Minimal gradients (only zone transitions). No decorative glows beyond heatmap. Every pixel serves patient understanding.
2. **Accessibility**: Large text (18px+), high contrast (L diff ≥0.7), color + text + icon for severity.
3. **Heatmap precision**: Cyan overlay opacity 0.72, screen blend mode; does not obscure vessel anatomy on dark fundus images.
4. **Plain language**: No medical jargon; "changes" not "NPDR", "critical" not "PDR", "Your eye looks healthy" not "Grade 0".
5. **Reassurance**: Visual hierarchy guides patients step-by-step; no overwhelming medical detail or clinic-speak.
6. **Mobile-first**: Touch-friendly inputs (48px min height), 20px gutters, readable tap targets (44px+), responsive text scale.

## Differentiation & Signature Detail

**Grad-CAM heatmap overlay on patient's own eye image** — core educationl feature. Cyan screen-blend heatmap on dark retinal image; patients see exactly where AI flagged abnormalities. Builds agency and understanding.

**5-stage traffic-light spectrum** — green → yellow → orange → red → deep red. Intuitive severity escalation; patients internalize risk visually before reading text.

**Plain-language severity explanations** — each result shows 1–2 sentence guidance (e.g., "Your scan shows mild changes. Continue monitoring your blood sugar and schedule a follow-up with your eye doctor in 6 months.") instead of clinical codes or confidence percentages.
