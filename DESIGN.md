# Aruna Healthcare — Design System

## 1. Visual theme and atmosphere

An institutional, human hospital experience: calm, precise and image-led. The interface borrows Apollo-style information hierarchy—utility bar, clear navigation, clinical imagery and direct care actions—without copying its brand or UI.

Interaction tier: L2. Use short entrance/reveal transitions only; no decorative rotation, irregular borders, sticker effects or looping float animation.

## 2. Color palette and roles

```css
:root {
  --primary: #173B70;
  --primary-light: #3F77B8;
  --accent: #F28B27;
  --bg-white: #FFFFFF;
  --bg-soft: #F5F8FC;
  --surface: #EAF2FB;
  --text-dark: #102A4A;
  --text-mid: #52647B;
  --text-light: #7B8DA4;
  --border: #D7E1EE;
  --success: #16885D;
}
```

Primary blue anchors navigation, headings and primary buttons. Orange is reserved for a small number of status or emphasis moments; it is never a general card background.

## 3. Typography rules

Use `Berkeley Mono`, then `Berkeley Mono Variable`, then `IBM Plex Mono` as the fallback stack. Headings are 700; labels and body text are 400–600. Do not mix a display sans serif with the mono system. Use tight tracking only in headings and sufficient line-height in all paragraph text.

## 4. Component styling

- Cards: white surface, 1px `--border`, 14px radius, soft neutral shadow.
- Buttons: 44px minimum touch target; blue fill for primary actions; white outlined secondary state.
- Forms: one form per task; labels above inputs; no floating input card in the hero.
- Navigation: fixed utility strip plus white main bar; current action remains visible.
- Status: green dot and restrained text, never red/green as the sole meaning.

## 5. Layout principles

Use a 1180px content cap with a 24px minimum side gutter. The hero is a two-column layout at desktop and one column below 960px. Hero operation snapshot and appointment prompt stack in normal document flow, so their bounds expand the section instead of overlapping it.

## 6. Depth and elevation

Use only two elevations: `--shadow-sm` for standard cards and `--shadow-md` for the hero operation snapshot. No offset “paper” shadows, heavy outlines, clipping paths, or rotated card containers.

## 7. Animation and interaction

Use a 600–800ms ease-out entrance for the hero heading, image and operation snapshot. Card hover rises at most 3px. All animations respect `prefers-reduced-motion`. Do not animate layout dimensions, rotate content cards, or hide essential text while users wait.

## 8. Do and don’t

- Do keep public and CRM colors identical.
- Do use clinical photography with meaningful alt text when images are added to markup.
- Do keep patient record actions visually higher priority than analytics decoration.
- Do use the Aruna waveform-in-circle mark consistently.
- Don’t use generic stock icons as the logo.
- Don’t use uneven card radii, dashed accents, sticker labels or paper textures.
- Don’t layer forms over photographs.
- Don’t add a second booking form for the same flow.
- Don’t use more than one strong accent per screen.

## 9. Responsive behavior

At ≤960px, stack hero columns and keep the operation snapshot and appointment prompt in flow. At ≤560px, retain a 44px touch target, collapse the navigation, hide non-essential hero notes, and require zero horizontal overflow. Verify desktop and 390px layouts after every hero or card change.
