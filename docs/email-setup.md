# Email Setup: Cloudflare + Resend (Free)

Set up `info@himalayan-sound.com` for **Himalayan Sound** at **$0/month**.

| Task | Service | Cost |
|------|---------|------|
| Receive emails (customers → you) | [Cloudflare Email Routing](https://www.cloudflare.com/developer-platform/products/email-routing/) | Free |
| Send emails (website → customers) | [Resend](https://resend.com/pricing) | Free (3,000 emails/month) |

**Official pricing pages:**
- Cloudflare: https://www.cloudflare.com/developer-platform/products/email-routing/ — *"Creating custom addresses and forwarding messages to your inbox is free."*
- Resend: https://resend.com/pricing — **Free: $0/mo, 3,000 emails/month**

---

## How it works

```
Customer writes to info@himalayan-sound.com
         ↓
  Cloudflare Email Routing (forward)
         ↓
    Your Gmail inbox

Website contact form / order confirmation
         ↓
      Resend SMTP
         ↓
    Customer inbox
```

The website uses `lib/email.ts` (Nodemailer + SMTP). No code changes needed — only environment variables.

---

## Prerequisites

- Domain **himalayan-sound.com** (registered at Vercel, Namecheap, GoDaddy, etc.)
- A [Cloudflare](https://dash.cloudflare.com/sign-up) account (free)
- A [Resend](https://resend.com/signup) account (free)
- A personal Gmail (or Outlook) inbox to receive forwarded mail
- Access to **Vercel** project env vars for production

**Time:** ~30–45 minutes (DNS propagation can take up to 24–48 hours).

---

## Part 1 — Move DNS to Cloudflare

Cloudflare Email Routing requires Cloudflare to manage your domain DNS.

### Already on Cloudflare? (skip to Part 2)

Check nameservers:

```bash
dig NS himalayan-sound.com +short
```

If you see `*.ns.cloudflare.com`, DNS is already on Cloudflare — go straight to **Part 2**.

Current `himalayan-sound.com` status (as of setup):
- Nameservers: Cloudflare ✅
- Apex A → `76.76.21.21` (Vercel) ✅
- `www` CNAME → `cname.vercel-dns.com` ✅
- MX records: not configured yet → enable Email Routing in Part 2

### If the domain is on Vercel

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → **Add a site** → enter `himalayan-sound.com`
2. Choose the **Free** plan
3. Cloudflare shows two nameservers, e.g.:
   - `ada.ns.cloudflare.com`
   - `bob.ns.cloudflare.com`
4. In **Vercel** → **Domains** → `himalayan-sound.com` → change nameservers to Cloudflare’s
5. Wait until Cloudflare shows the domain as **Active** (usually 15 min – 24 h)

### Import existing DNS records

Before switching nameservers, export or copy DNS from Vercel:

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | `@` | `76.76.21.21` | Vercel apex |
| CNAME | `www` | `cname.vercel-dns.com` | Vercel www |

In Cloudflare → **DNS** → **Records**, add the same records.  
For Vercel records set **Proxy status** to **DNS only** (grey cloud) if Vercel asks for it.

> **Important:** After migration, manage DNS only in Cloudflare (not Vercel DNS tab).

---

## Part 2 — Cloudflare Email Routing (receive)

Docs: https://developers.cloudflare.com/email-routing/

### Step 1 — Enable Email Routing

1. Cloudflare → select `himalayan-sound.com`
2. **Email** → **Email Routing** → **Get started**
3. Cloudflare adds MX records automatically — approve when prompted

Expected MX records (auto-created):

| Priority | Server |
|----------|--------|
| 1 | `route1.mx.cloudflare.net` |
| 2 | `route2.mx.cloudflare.net` |
| 3 | `route3.mx.cloudflare.net` |

### Step 2 — Verify destination address

1. **Email Routing** → **Destination addresses** → **Add**
2. Enter your Gmail, e.g. `you@gmail.com`
3. Open the verification email from Cloudflare and click the link

### Step 3 — Create routing rule

1. **Email Routing** → **Routing rules** → **Create address**
2. Custom address: `info` → full address `info@himalayan-sound.com`
3. Action: **Send to** → your verified Gmail
4. Save

Optional: add `orders@`, `support@` the same way (all free).

### Step 4 — Test receiving

From another email account, send a message to `info@himalayan-sound.com`.  
It should arrive in your Gmail within 1–2 minutes.

---

## Part 3 — Resend (send from website)

Docs: https://resend.com/docs/send-with-nodemailer-smtp

### Step 1 — Create account

1. Go to https://resend.com/signup
2. Sign up (no credit card on Free plan)

### Step 2 — Add and verify domain

1. Resend Dashboard → **Domains** → **Add Domain**
2. Enter: `himalayan-sound.com`
3. Resend shows DNS records — add them in **Cloudflare DNS**:

Typical records (copy exact values from Resend dashboard):

| Type | Name | Value |
|------|------|-------|
| TXT | `@` or `send` | SPF record from Resend |
| TXT | `resend._domainkey` | DKIM public key from Resend |
| TXT | `_dmarc` | DMARC policy (optional but recommended) |

4. In Cloudflare, set these records to **DNS only** (grey cloud)
5. Back in Resend → **Verify** — status should become **Verified**

### Step 3 — Create API key

1. Resend → **API Keys** → **Create API Key**
2. Name: `Himalayan Sound Website`
3. Permission: **Sending access**
4. Copy the key — it starts with `re_` (shown only once)

---

## Part 4 — Configure the website

### Local development (`.env.local`)

```bash
NEXT_PUBLIC_CONTACT_EMAIL=info@himalayan-sound.com

# Resend SMTP (reuses ZOHO_SMTP_* env names for historical reasons)
ZOHO_SMTP_HOST=smtp.resend.com
ZOHO_SMTP_PORT=465
ZOHO_SMTP_USER=resend
ZOHO_SMTP_PASS=re_your_api_key_here
EMAIL_FROM_NAME=Himalayan Sound
```

> **Note:** `ZOHO_SMTP_USER` must be `resend` (Resend’s SMTP username).  
> The visible **From** address is `info@himalayan-sound.com` from `NEXT_PUBLIC_CONTACT_EMAIL`.

### Production (Vercel)

1. Vercel → your project → **Settings** → **Environment Variables**
2. Add the same variables for **Production** (and Preview if needed)
3. **Deployments** → redeploy latest (or push a commit)

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | `info@himalayan-sound.com` |
| `ZOHO_SMTP_HOST` | `smtp.resend.com` |
| `ZOHO_SMTP_PORT` | `465` |
| `ZOHO_SMTP_USER` | `resend` |
| `ZOHO_SMTP_PASS` | `re_...` (API key) |
| `EMAIL_FROM_NAME` | `Himalayan Sound` |

---

## Part 5 — Reply as info@ from Gmail (optional)

When you receive forwarded mail in Gmail, replies still go from your personal address unless you configure **Send mail as**.

1. Gmail → **Settings** → **See all settings** → **Accounts and Import**
2. **Send mail as** → **Add another email address**
3. Name: `Himalayan Sound`
4. Email: `info@himalayan-sound.com`
5. SMTP server: `smtp.resend.com`, port **465**, SSL
6. Username: `resend`
7. Password: your Resend API key (`re_...`)
8. Gmail sends a confirmation to `info@` → arrives via Cloudflare forward → click confirm

Now you can reply to customers as `info@himalayan-sound.com`.

---

## Part 6 — Test everything

### Checklist

- [ ] Email to `info@himalayan-sound.com` arrives in Gmail
- [ ] Resend domain shows **Verified**
- [ ] Contact form at `/uk/contact` submits without error
- [ ] You receive admin notification in Gmail
- [ ] Customer receives auto-reply from `info@himalayan-sound.com`
- [ ] Resend Dashboard → **Emails** shows sent messages

### Quick SMTP test (local)

With `.env.local` configured:

```bash
npm run dev
```

Submit the contact form, or call the contact API from the browser network tab after form submit.

---

## What the site sends

| Event | To | From |
|-------|-----|------|
| Contact form | `info@himalayan-sound.com` (you) | `info@himalayan-sound.com` |
| Contact auto-reply | Customer | `info@himalayan-sound.com` |
| Order confirmation | Customer | `info@himalayan-sound.com` |

Code: `lib/email.ts`, `app/api/contact/route.ts`

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| Contact form returns 503 | SMTP env vars missing on Vercel | Add `ZOHO_SMTP_*`, redeploy |
| `Authentication failed` | Wrong API key | Regenerate Resend API key |
| Emails sent as `resend@...` | Old code / wrong env | Pull latest; ensure `NEXT_PUBLIC_CONTACT_EMAIL` is set |
| Incoming mail not arriving | MX not propagated | Check Cloudflare Email Routing status; wait up to 48 h |
| Emails go to spam | DKIM/SPF not verified | Complete Resend domain verification in Cloudflare DNS |
| Resend daily limit hit | Free = 100/day | Enough for normal shop traffic; upgrade if needed |
| Website down after DNS move | Missing Vercel records | Re-add A/CNAME records in Cloudflare |

### DNS propagation

Check MX records:

```bash
dig MX himalayan-sound.com +short
```

Should show `route1.mx.cloudflare.net` etc.

---

## Limits (free tier)

| Service | Limit |
|---------|-------|
| Cloudflare Email Routing | Unlimited forwards |
| Resend | 3,000 emails/month, 100/day |
| Resend domains | 1 domain |

For a small e-commerce shop this is more than enough.

---

## Alternative: paid Zoho Mail

If you prefer one provider for inbox + SMTP, see [docs/zoho-mail-setup.md](./zoho-mail-setup.md) (Mail Lite ~€0.90/month).

---

## Links

- [Cloudflare Email Routing product page](https://www.cloudflare.com/developer-platform/products/email-routing/)
- [Cloudflare Email Routing docs](https://developers.cloudflare.com/email-routing/)
- [Resend pricing](https://resend.com/pricing)
- [Resend + Nodemailer docs](https://resend.com/docs/send-with-nodemailer-smtp)
- [Vercel: email with your domain](https://vercel.com/kb/guide/using-email-with-your-vercel-domain)
