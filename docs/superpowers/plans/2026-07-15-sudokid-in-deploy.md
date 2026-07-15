# Publish Little Logic Lab on sudokid.in Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy Little Logic Lab to Vercel and make it live at **https://sudokid.in** (and www) with automatic HTTPS.

**Architecture:** GitHub `main` builds on Vercel; GoDaddy DNS A/CNAME records point `sudokid.in` / `www.sudokid.in` at Vercel; Vercel issues SSL and redirects HTTP→HTTPS.

**Tech Stack:** Next.js 16, Vercel, GoDaddy DNS, GitHub (`RuchikaSingh2828/little-logic-lab`)

## Global Constraints

- Hosting: Vercel project already linked — name `little-logic-lab` (see `.vercel/project.json`)
- Domains: apex `sudokid.in` + `www.sudokid.in`
- DNS provider: GoDaddy (do not move nameservers unless blocked)
- Prefer sharing **https://** URLs only
- No app feature/branding changes in this plan
- No required production env vars (app runs without secrets)
- Spec: `docs/superpowers/specs/2026-07-15-sudokid-in-deploy-design.md`

## File structure

| Path | Responsibility |
|------|----------------|
| `README.md` | Add live site URL after verification |
| `docs/superpowers/plans/2026-07-15-sudokid-in-deploy.md` | This plan |
| `docs/deploy-sudokid-in.md` | Operator runbook: Vercel domains + exact GoDaddy DNS records used |

No application source under `app/`, `features/`, or `components/` is changed.

---

### Task 1: Confirm production build locally

**Files:**
- Verify only (no code changes expected): `package.json`, `next.config.ts`
- Test: local shell commands below

**Interfaces:**
- Consumes: existing Next.js app
- Produces: confirmed `npm run build` success before deploy

- [ ] **Step 1: Install dependencies**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/little-logic-lab"
npm install
```

Expected: exits 0; `node_modules` present.

- [ ] **Step 2: Run unit tests**

```bash
npm test
```

Expected: Vitest exits 0 (all tests pass).

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Next.js build completes with exit 0 (no TypeScript/ESLint build errors that fail the build).

- [ ] **Step 4: Commit only if build required code fixes**

If Steps 2–3 fail and you must change source to fix the build:

```bash
git add <fixed-files>
git commit -m "fix: unblock production build for sudokid.in deploy"
```

If build already passes, skip commit.

---

### Task 2: Push repo state and deploy on Vercel

**Files:**
- Modify (git only): push commits on `main`
- Create: none required if Vercel Git integration already works
- Fallback: use Vercel CLI deploy from `little-logic-lab/`

**Interfaces:**
- Consumes: green local build from Task 1; remote `origin` = `https://github.com/RuchikaSingh2828/little-logic-lab.git`
- Produces: a Production deployment reachable on the project’s `*.vercel.app` URL

- [ ] **Step 1: Confirm git remotes and unpushed commits**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/little-logic-lab"
git status -sb
git remote -v
git log origin/main..HEAD --oneline
```

Expected: `origin` points at `RuchikaSingh2828/little-logic-lab.git`; list any local commits not on remote.

- [ ] **Step 2: Push `main` to GitHub**

```bash
git push -u origin HEAD
```

Expected: push succeeds; `main` on GitHub includes the deploy design commit(s).

- [ ] **Step 3: Trigger or confirm Vercel production deploy**

Preferred (Git integration): open [Vercel dashboard](https://vercel.com/dashboard) → project **little-logic-lab** → Deployments. Confirm a Production deployment for the latest `main` commit is Building/Ready.

Fallback (CLI), if no auto-deploy appears within a few minutes:

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/little-logic-lab"
npx vercel login
npx vercel link --yes
npx vercel --prod
```

Expected: CLI prints a Production URL like `https://little-logic-lab-….vercel.app`.

- [ ] **Step 4: Smoke-test the Vercel URL**

```bash
curl -sI "https://<production-vercel-url>/" | head -20
```

Expected: HTTP `200` (or `308`/`307` to a working path); body/HTML of the app loads in a browser.

- [ ] **Step 5: Record the Production URL**

Write the exact Production URL into the working notes for Task 5’s runbook (temporary: paste into chat or stash for `docs/deploy-sudokid-in.md`).

No commit required unless CLI added/changed tracked config files you intend to keep (do not commit secrets).

---

### Task 3: Add custom domains in Vercel

**Files:**
- Create: none (dashboard/CLI config on Vercel)
- Modify later in Task 5: `docs/deploy-sudokid-in.md` with the values Vercel shows

**Interfaces:**
- Consumes: live Vercel project from Task 2
- Produces: domains `sudokid.in` and `www.sudokid.in` attached to the project, with **required DNS records** displayed by Vercel

- [ ] **Step 1: Add apex domain**

Dashboard path: Project **little-logic-lab** → **Settings** → **Domains** → Add `sudokid.in`.

CLI alternative:

```bash
npx vercel domains add sudokid.in
```

Expected: domain appears on the project; status likely “Invalid Configuration” until GoDaddy DNS is updated.

- [ ] **Step 2: Add www and prefer apex**

In Domains UI, add `www.sudokid.in`. Choose the option to **redirect www → sudokid.in** (apex as primary) if Vercel offers it.

CLI (if needed):

```bash
npx vercel domains add www.sudokid.in
```

Expected: both domains listed on the project.

- [ ] **Step 3: Copy exact DNS instructions from Vercel**

Open each domain in the Domains UI (or run):

```bash
npx vercel domains inspect sudokid.in
npx vercel domains inspect www.sudokid.in
```

Copy **exactly** the Type / Name / Value rows Vercel shows. Do not invent values. Typical shape (verify against UI):

| Domain | Type | Name (GoDaddy) | Value (example only — use Vercel’s) |
|--------|------|----------------|-------------------------------------|
| `sudokid.in` | A | `@` | `76.76.21.21` |
| `www.sudokid.in` | CNAME | `www` | `cname.vercel-dns.com` or project-specific `….vercel-dns-….com` |

- [ ] **Step 4: Note conflicts to clear at GoDaddy**

Before editing DNS, list any existing GoDaddy records that conflict:

- A or AAAA on `@`
- CNAME on `www`
- Domain Forwarding / “Parked” / Website builder pointing elsewhere
- Stale `_acme-challenge` TXT from another host

These get removed or replaced in Task 4.

---

### Task 4: Configure GoDaddy DNS (user action + agent assist)

**Files:**
- No repo files yet (DNS lives in GoDaddy)
- User performs UI clicks; agent provides the checklist using Task 3 values

**Interfaces:**
- Consumes: exact DNS rows from Task 3
- Produces: public DNS resolving to Vercel (no longer NXDOMAIN)

- [ ] **Step 1: Open GoDaddy DNS for sudokid.in**

1. Sign in at [https://www.godaddy.com](https://www.godaddy.com)
2. **My Products** → **Domains** → **sudokid.in** → **DNS** / **Manage DNS**

- [ ] **Step 2: Disable parking / forwarding**

If GoDaddy shows Domain Forwarding, Parking, or “Connected to GoDaddy Website”:

1. Turn **off** forwarding to any temporary page
2. Ensure DNS is managed by GoDaddy nameservers (default), not another provider unless intentional

- [ ] **Step 3: Remove conflicting records**

Delete (or edit away) conflicting:

- A `@` that is not Vercel’s IP
- AAAA `@` (remove; Vercel apex setup does not need a stray AAAA for third-party domains)
- CNAME `www` that is not Vercel’s target

Keep NS and SOA records GoDaddy manages.

- [ ] **Step 4: Add Vercel A record (apex)**

Add New Record:

- **Type:** A  
- **Name:** `@`  
- **Value:** *(exact IP from Vercel Task 3 — often `76.76.21.21`)*  
- **TTL:** 1 Hour (or default)

Save.

- [ ] **Step 5: Add Vercel CNAME (www)**

Add New Record:

- **Type:** CNAME  
- **Name:** `www`  
- **Value:** *(exact hostname from Vercel Task 3)*  
- **TTL:** 1 Hour (or default)

Save.

- [ ] **Step 6: Agent verifies DNS from the machine**

Wait 2–5 minutes, then:

```bash
dig +short sudokid.in A
dig +short www.sudokid.in CNAME
dig +short www.sudokid.in A
host sudokid.in
```

Expected:

- Apex `A` matches Vercel’s IP (e.g. `76.76.21.21`)
- `www` CNAME matches Vercel’s target (or resolves via that CNAME to Vercel)
- Not `NXDOMAIN`

If still NXDOMAIN or wrong values after 30+ minutes, re-check GoDaddy records and whether GoDaddy still has Forwarding enabled.

---

### Task 5: Verify HTTPS and write the deploy runbook

**Files:**
- Create: `docs/deploy-sudokid-in.md`
- Modify: `README.md` (add live URL under Getting Started or a short Live section)

**Interfaces:**
- Consumes: DNS from Task 4; Vercel SSL provisioning
- Produces: documented live URLs + verification evidence; README points at https://sudokid.in

- [ ] **Step 1: Wait for Vercel domain status Valid**

In Vercel Domains UI, wait until `sudokid.in` and `www.sudokid.in` show **Valid** (SSL issued). Can take minutes to hours (up to ~48h worst case).

Optionally:

```bash
npx vercel domains inspect sudokid.in
```

Expected: configuration valid / certificate ready.

- [ ] **Step 2: Verify HTTPS and HTTP→HTTPS redirect**

```bash
curl -sI https://sudokid.in/ | head -20
curl -sI http://sudokid.in/ | head -20
curl -sI https://www.sudokid.in/ | head -20
```

Expected:

- `https://sudokid.in/` → `200` (or app redirect that still serves the site)
- `http://sudokid.in/` → `301`/`308` to `https://sudokid.in/...`
- `https://www.sudokid.in/` → `200` or redirect to apex `https://sudokid.in/`
- No certificate warnings in a normal browser visit

- [ ] **Step 3: Create runbook `docs/deploy-sudokid-in.md`**

Write the file with the **actual** values used (replace placeholders with Task 3/4 facts):

```markdown
# Deploy / DNS — sudokid.in

## Live URLs

- https://sudokid.in
- https://www.sudokid.in (redirects to apex)

## Hosting

- Platform: Vercel
- Project: little-logic-lab
- GitHub: https://github.com/RuchikaSingh2828/little-logic-lab

## GoDaddy DNS (as configured)

| Type | Name | Value |
|------|------|-------|
| A | @ | <VERCEL_A_IP> |
| CNAME | www | <VERCEL_CNAME_TARGET> |

## Notes

- SSL is automatic on Vercel after DNS is valid.
- Prefer sharing https:// URLs.
- Future pushes to `main` should auto-deploy if the Git integration remains connected.
```

- [ ] **Step 4: Update README with live link**

In `README.md`, after the title or under **Getting Started**, add:

```markdown
## Live

Play at [https://sudokid.in](https://sudokid.in).
```

- [ ] **Step 5: Commit documentation**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/little-logic-lab"
git add docs/deploy-sudokid-in.md README.md
git commit -m "$(cat <<'EOF'
Document sudokid.in production deploy and GoDaddy DNS.

EOF
)"
git push origin HEAD
```

Expected: commit on `main`; Vercel may redeploy docs-only change harmlessly.

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Confirm production build | Task 1 |
| Deploy / re-deploy Vercel from GitHub | Task 2 |
| Add `sudokid.in` + `www.sudokid.in` | Task 3 |
| Document exact GoDaddy DNS records | Tasks 3–5 |
| Verify HTTPS + HTTP redirect | Task 5 |
| Prefer https in docs/sharing | Task 5 README + runbook |

## Self-review notes

- No app feature scope creep.
- DNS values must come from Vercel UI/CLI — examples in the plan are illustrative only.
- Task 4 depends on the human GoDaddy login; agent verifies with `dig`/`curl` after changes.
