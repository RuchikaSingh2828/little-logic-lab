# Deploy / DNS — sudokid.in

## Live URLs

- https://sudokid.in
- https://www.sudokid.in

## Hosting

- Platform: Vercel
- Project: little-logic-lab
- GitHub: https://github.com/RuchikaSingh2828/little-logic-lab
- Fallback Vercel URL: https://little-logic-lab-eta.vercel.app

## GoDaddy DNS (as configured)

Originally set for Vercel verification:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| A | www | `76.76.21.21` |

Public resolution as of 2026-07-16 (Vercel anycast / aliasing):

| Query | Result |
|-------|--------|
| `sudokid.in` A | `216.198.79.1` |
| `www.sudokid.in` | CNAME `79e6f6de1f2398c8.vercel-dns-017.com.` (also resolves to Vercel IPs) |

NS records remain on GoDaddy defaults.

## Verification (2026-07-16)

- `https://sudokid.in/` → HTTP 200, Server: Vercel, SSL OK (Let's Encrypt, CN=`sudokid.in`)
- `http://sudokid.in/` → HTTP 308 → `https://sudokid.in/`
- `https://www.sudokid.in/` → HTTP 200, SSL OK (CN=`www.sudokid.in`)
- Product name in app: **Sudokid**

## Notes

- SSL is automatic on Vercel after DNS is valid.
- Prefer sharing https:// URLs.
- Future pushes to `main` should auto-deploy if the Git integration remains connected.
- Optional: in Vercel → Project → Settings → Domains, set **www → apex** redirect if you want a single canonical host.
