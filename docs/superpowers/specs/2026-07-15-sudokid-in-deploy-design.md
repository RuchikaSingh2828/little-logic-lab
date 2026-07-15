# Deploy Little Logic Lab to sudokid.in

Date: 2026-07-15  
Status: Approved for planning

## Goal

Publish the Little Logic Lab Next.js app at **https://sudokid.in** (with `www` as well), using HTTPS via automatic SSL.

## Context

- App: Next.js 16 App Router (`little-logic-lab`)
- Repo: `https://github.com/RuchikaSingh2828/little-logic-lab.git`
- Already linked to Vercel project `little-logic-lab` (project id present in `.vercel/project.json`)
- No required env vars for production build
- Domain: `sudokid.in` owned by Ruchika; DNS managed at **GoDaddy**
- Current DNS: domain does not resolve publicly yet (NXDOMAIN) — records need to be created/updated

## Approach (chosen)

**Vercel hosting + GoDaddy DNS**

Rejected alternatives:

- GoDaddy website hosting — not suitable for Next.js
- Cloudflare in front of Vercel — unnecessary for initial launch

## Architecture

```
GitHub (main) → Vercel build/deploy → custom domains sudokid.in + www.sudokid.in
GoDaddy DNS → A/CNAME records pointing at Vercel → SSL via Vercel
```

HTTP requests to the domain will redirect to HTTPS once the certificate is active.

## Scope

In scope:

1. Confirm production build succeeds locally
2. Deploy (or re-deploy) the Vercel project from the GitHub repo
3. Add custom domains `sudokid.in` and `www.sudokid.in` in Vercel
4. Document exact GoDaddy DNS records to set (from Vercel’s domain UI)
5. Verify HTTPS and redirect from `http://` to `https://`

Out of scope:

- App feature changes, branding renames, or Google Analytics
- Moving DNS off GoDaddy
- Staging environment

## DNS (expected pattern)

Exact values come from the Vercel Domains UI after the domain is added. Typical pattern:

| Host | Type | Value |
|------|------|--------|
| `@` (apex / sudokid.in) | A | Vercel apex IP (shown in Vercel) |
| `www` | CNAME | `cname.vercel-dns.com` (or value shown in Vercel) |

Remove conflicting A/CNAME/parked-domain records in GoDaddy that would block resolution.

## Success criteria

- `https://sudokid.in` loads the app
- `https://www.sudokid.in` loads the app (or redirects to apex)
- `http://` redirects to `https://`
- Browser shows a valid certificate (no warnings)
- Future pushes to `main` auto-deploy (if Git integration is connected)

## Risks / notes

- DNS propagation can take minutes to 48 hours
- GoDaddy “Parked” or forwarding profiles can conflict — DNS must point at Vercel, not a parking page
- Prefer `https://` in docs and sharing; do not market the site as HTTP-only
