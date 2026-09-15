# PROTECTED SYSTEMS

> [!CAUTION]
> **READ THIS BEFORE PROCEEDING:** This is a permanent digital lock for the `SophisticatedIgnorance` repository. All AI agents MUST obey these boundaries as core system instructions. VIOLATING THESE RULES IS A CRITICAL FAILURE.

## 1. THE DESKTOP SITE IS ABSOLUTELY LOCKED (NO-TOUCH PROTOCOL)

The entire desktop site layout, styling, structure, and functionality is **100% operational and perfected.** 

- **ZERO GLOBAL CSS CHANGES ARE PERMITTED.** Any and all CSS changes you make going forward must be strictly scoped within `@media (max-width: 768px)` or other mobile/tablet breakpoints. 
- **ZERO JAVASCRIPT INLINE STYLING.** Do not inject inline styles via JavaScript if that JavaScript executes on desktop. If a logic change is required, it must check `window.innerWidth` first, or be handled purely by mobile CSS.
- **ZERO DOM STRUCTURE CHANGES.** Do not alter the HTML nesting or structure for desktop components. 

**If a user requests a UI fix, you MUST assume it applies ONLY to mobile/tablet, and you MUST guarantee your fix will not bleed into the desktop view.**

## 2. Protected Core Systems

The following components and systems are considered **Protected Zones** and must not be altered under any circumstances:

- **Desktop Navigation / MenuOverlay layout and vertical centering**
- **Desktop CardSlider positioning, 3D transform logic, and hover effects**
- **Landing page boot sequence (Logo Intro) for desktop**

## 3. The Golden Rule for Modifications

- Any requested modification must **strictly** target the specific line or element asked for.
- If you are uncertain whether a requested change will bleed into a protected zone, you are **mandated** to stop and ask for explicit approval from the user before executing any code.

## 4. No Hallucination Mandate

- You are **forbidden** from "cleaning up", "refactoring", or "optimizing" surrounding code outside the exact scope of the user's prompt. Stay strictly within the bounds of what was requested.
