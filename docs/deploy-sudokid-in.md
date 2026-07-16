# Deploy / DNS — sudokid.in

## Live URLs

- https://sudokid.in (preferred once SSL is Valid)
- http://sudokid.in (works; redirects to HTTPS after certificate issues)
- https://www.sudokid.in
- Fallback: https://little-logic-lab-eta.vercel.app

## Hosting

- Platform: Vercel
- Project: little-logic-lab
- GitHub: https://github.com/RuchikaSingh2828/little-logic-lab

## GoDaddy DNS (as configured 2026-07-16)

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

Nameservers stay on GoDaddy (`ns51` / `ns52.domaincontrol.com`).

## Notes

- SSL is automatic on Vercel after DNS is valid; first issue can take minutes to a few hours.
- Prefer sharing https:// URLs.
- Optional: in Vercel → Settings → Domains, set `www.sudokid.in` to redirect to `sudokid.in`.
- Do not reconnect the domain to GoDaddy Website Builder — that parks DNS again.
