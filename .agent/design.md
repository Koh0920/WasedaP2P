# Waseda Design Guide — Swiss Notion Style

---

## Philosophy

**Swiss International Style + Notion Minimalism**

- Content-first: Every element serves a purpose
- No decorative borders, lines, or containers
- Use **font size hierarchy** and **spacing** to organize content
- Grayscale base with **orange accent** for actions and emphasis

---

## Colors

### Neutral Scale (Zinc)

| Token | Light | Dark |
|-------|-------|------|
| Background | `#FAFAFA` | `#09090B` |
| Card/Surface | `#FFFFFF` | `#18181B` |
| Primary Text | `#18181B` | `#FAFAFA` |
| Secondary Text | `#71717A` | `#A1A1AA` |
| Muted | `#F4F4F5` | `#27272A` |

### Orange Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#F97316` | Primary actions, links, highlights |
| `accent-hover` | `#EA580C` | Hover states |
| `accent-muted` | `#FFF7ED` | Subtle backgrounds |

### Semantic

| Purpose | Light | Dark |
|---------|-------|------|
| Success | `#22C55E` | Same |
| Warning | `#F59E0B` | Same |
| Error | `#EF4444` | Same |

---

## Typography

### Font: Geist

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | Labels, captions |
| `text-sm` | 14px | Secondary text |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Subheadings |
| `text-xl` | 20px | Section titles |
| `text-2xl` | 24px | Page titles |
| `text-3xl` | 30px | Hero text |
| `text-4xl` | 36px | Display |

**Line height:** `text-tight` (1.25) for headings, `text-normal` (1.5) for body.

---

## Spacing

**Base unit: 4px**

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |

---

## Layout Principles

### No Lines or Borders

- ❌ Avoid: `border`, `divider`, `separator`
- ✅ Use: **spacing** and **font hierarchy** to separate sections
- ✅ Cards: subtle shadow only `shadow-sm`, no border

### Content Separation

```
Page Title (text-2xl)
Spacing space-8

Section Title (text-lg) ← larger than body, smaller than page title
Spacing space-6

Body text (text-base)
Spacing space-4

Related content continues...
```

### Navigation

```jsx
<nav className="h-16 flex items-center justify-between border-0">
  <Logo />
  <NavLinks />
</nav>
```

**No bottom border** — use whitespace instead.

### Page Structure

```jsx
<main className="pt-8 pb-16">
  <h1 className="text-2xl font-medium">Page Title</h1>
  <p className="text-muted-foreground mt-2">Optional description</p>
  
  <section className="mt-12">
    <h2 className="text-lg font-medium">Section</h2>
    <div className="mt-4">Content</div>
  </section>
</main>
```

---

## Components

### Buttons

```jsx
// Primary — use orange accent
<Button className="bg-orange-500 text-white hover:bg-orange-600">
  Action
</Button>

// Ghost — no background, subtle hover
<Button variant="ghost" className="hover:bg-zinc-100">
  Secondary
</Button>
```

### Cards

**No border** — use shadow and background color only:

```jsx
<Card className="bg-white shadow-sm">
  <CardContent className="p-6">
    Content
  </CardContent>
</Card>
```

### Forms

```jsx
<Input className="border-0 bg-zinc-50 focus:bg-white focus:ring-orange-500" />
<Label className="text-sm font-medium">Label</Label>
```

### Badges

```jsx
<Badge className="bg-orange-50 text-orange-700">New</Badge>
```

---

## Visual Effects

### Shadows (No Borders)

```css
.shadow-sm  { box-shadow: 0 1px 2px rgb(0 0 0 / 0.05); }
.shadow-md  { box-shadow: 0 4px 6px rgb(0 0 0 / 0.1); }
```

### Transitions

```css
.transition-colors { transition: color 150ms, background-color 150ms; }
```

### Animations

Use sparingly — fade-in only:

```css
.animate-in { animation: fadeIn 0.2s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
```

---

## Accessibility

- **Focus rings**: Always visible, use orange `ring-orange-500`
- **Contrast**: Body text 4.5:1 minimum
- **Reduced motion**: Respect `prefers-reduced-motion`

---

## Logo

```jsx
<Logo className="h-8" />
```

Clear space: 16px minimum on all sides.

---

## Implementation

### CSS Variables

```css
:root {
  --accent: 24 95% 53%;        /* Orange-500 */
  --accent-foreground: 0 0% 100%;
  --accent-muted: 24 100% 97%; /* Orange-50 */
  
  --background: 0 0% 98%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --muted: 240 5% 96%;
}
```

### Tailwind

Use `border-0` and `ring-0` globally, rely on shadows and spacing.

---

## Quick Reference

| Do | Don't |
|----|-------|
| Use spacing to separate content | Add borders or dividers |
| Use font size for hierarchy | Use color alone for emphasis |
| Orange for actions | Use multiple accent colors |
| Clean, shadow-only cards | Border-heavy designs |
| Generous whitespace | Dense, cramped layouts |

---

*March 2026*
