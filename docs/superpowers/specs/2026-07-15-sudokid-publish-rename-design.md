# Sudokid publish + rename

**Date:** 2026-07-15  
**Status:** Approved (pending user review of this written spec)

## Goal

Publish the app at **https://sudokid.in** and rename product text from “Little Logic Lab” to **Sudokid**, including the local project folder.

## Context

- App: Next.js 16 (App Router) educational games prototype
- Repo already linked to Vercel project `little-logic-lab` (`prj_h0kEtryXbQwKlizDWlVRHGqoUWzQ`)
- Domain: `sudokid.in` owned by user; DNS managed at **GoDaddy**
- At design time, `sudokid.in` returned NXDOMAIN (no public DNS records yet)
- No application env vars required for build/run
- Prefer HTTPS; Vercel issues SSL after domain + DNS are configured

## Scope

### In scope

1. **Text rename to Sudokid**
   - User-facing: browser title (`app/layout.tsx`), nav brand (`components/home/HomeTopNav.tsx`)
   - Project name alignment: `package.json` / `package-lock.json` `name` field
   - Docs headings that say “Little Logic Lab” (`README.md`, `docs/GameIdeas.md`)

2. **Folder rename**
   - Rename local directory `little-logic-lab` → `sudokid`
   - Re-open the project from the new path in Cursor after rename

3. **Publish on sudokid.in**
   - Production deploy on Vercel
   - Attach custom domains: `sudokid.in` and `www.sudokid.in`
   - Update GoDaddy DNS to Vercel’s required records (A / CNAME as shown in Vercel)
   - Confirm HTTPS works and `http://` redirects to `https://`

### Out of scope

- Visual rebrand (new logo, colors, layout)
- Renaming the GitHub repository
- Renaming the Vercel project id (optional later; display name can stay or be updated independently)
- Backend/database/auth changes
- Cloudflare or GoDaddy application hosting

## Architecture

```
GitHub (little-logic-lab repo)
        │
        ▼
   Vercel deploy  ──►  https://sudokid.in
        ▲
        │
GoDaddy DNS (A/CNAME for root + www)
```

HTTPS is provided by Vercel’s certificate once domain verification succeeds. No app code changes are required for SSL.

## Rename details

| Location | Change |
|----------|--------|
| `app/layout.tsx` metadata `title` | → `Sudokid` |
| `HomeTopNav.tsx` brand strings | → `Sudokid` |
| `package.json` `name` | → `sudokid` |
| `package-lock.json` name entries | → `sudokid` |
| `README.md` / `docs/GameIdeas.md` titles | → Sudokid |
| Folder `…/little-logic-lab` | → `…/sudokid` |

Search the codebase for remaining “Little Logic Lab” / `little-logic-lab` strings and update any missed user- or project-facing occurrences in the same pass. Do not rename Git remotes or force-push.

## Deploy details (Vercel + GoDaddy)

1. Ensure latest rename is committed/pushed (or deploy from CLI) so production build includes Sudokid text.
2. In Vercel project → Domains: add `sudokid.in` and `www.sudokid.in`.
3. In GoDaddy DNS for `sudokid.in`, set records exactly as Vercel instructs (typical pattern):
   - Root `@`: A record to Vercel IP (e.g. `76.76.21.21`) **or** their current recommended apex setup
   - `www`: CNAME to `cname.vercel-dns.com` (or value Vercel shows)
4. Remove conflicting GoDaddy parking/default A/CNAME records that block verification.
5. Wait for DNS propagation + certificate issuance; verify `https://sudokid.in` loads.

## Error handling / risks

- **NXDOMAIN / cert pending:** DNS not saved or wrong host → fix records; wait up to 48h if needed.
- **GoDaddy “forwarding” vs DNS:** use real DNS records, not domain forwarding only, so Vercel SSL works.
- **Folder rename breaks open workspace:** reopen folder `sudokid` after rename; Vercel/git remotes are path-independent.
- **Vercel CLI local permission issues:** prefer Vercel dashboard + GitHub deploy if CLI fails on this machine.

## Success criteria

- [ ] App UI and metadata show **Sudokid**, not Little Logic Lab
- [ ] Local project folder is named `sudokid`
- [ ] `https://sudokid.in` serves the production app
- [ ] `http://sudokid.in` redirects to HTTPS
- [ ] `www.sudokid.in` works (redirect or serve) as configured in Vercel

## Testing

- Local: `npm run build` succeeds after rename
- Manual: open production URL, check title/nav text, confirm lock icon (HTTPS)
- DNS: `dig sudokid.in A` / `dig www.sudokid.in CNAME` match Vercel guidance after updates
