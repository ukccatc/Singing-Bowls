# Zoho Mail Setup for Himalayan Sound

Free Zoho Mail for custom domain **himalayan-sound.com**.

## 1. Create Zoho Mail account

1. Go to [https://www.zoho.com/mail/zohomail-pricing.html](https://www.zoho.com/mail/zohomail-pricing.html)
2. Choose **Mail Lite** (free for up to 5 users)
3. Sign up and select **Add your existing domain**
4. Enter: `himalayan-sound.com`

## 2. Verify domain ownership

Zoho will ask you to add a **TXT** record to your DNS (where the domain is registered — Vercel, Namecheap, Cloudflare, etc.):

| Type | Host | Value |
|------|------|-------|
| TXT | `@` | *(copy from Zoho admin panel)* |

Wait 15–60 minutes, then click **Verify** in Zoho.

## 3. Add MX records (incoming mail)

Remove any old MX records, then add:

| Type | Host | Priority | Value |
|------|------|----------|-------|
| MX | `@` | 10 | `mx.zoho.com` |
| MX | `@` | 20 | `mx2.zoho.com` |
| MX | `@` | 50 | `mx3.zoho.com` |

## 4. SPF record (deliverability)

| Type | Host | Value |
|------|------|-------|
| TXT | `@` | `v=spf1 include:zoho.com ~all` |

## 5. DKIM (recommended)

In Zoho Mail Admin → **Email Configuration** → **DKIM**, generate keys and add the TXT record Zoho provides.

## 6. Create mailbox

1. Zoho Admin → **Users** → **Add User**
2. Create: `info@himalayan-sound.com`
3. Set a strong password
4. Optional: add `orders@himalayan-sound.com`

## 7. App password for the website (SMTP)

If 2FA is enabled on Zoho:

1. [Zoho Account](https://accounts.zoho.com) → **Security** → **App Passwords**
2. Generate password for "Himalayan Sound Website"
3. Copy the password — you won't see it again

## 8. Configure the website

Add to `.env.local` (dev) and **Vercel → Settings → Environment Variables** (production):

```bash
NEXT_PUBLIC_CONTACT_EMAIL=info@himalayan-sound.com
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
ZOHO_SMTP_USER=info@himalayan-sound.com
ZOHO_SMTP_PASS=your-app-password-here
EMAIL_FROM_NAME=Himalayan Sound
```

Redeploy on Vercel after adding env vars.

## 9. Test

1. Send a test email from Zoho webmail to your personal email
2. Submit the contact form at `https://himalayan-sound.com/uk/contact`
3. Check `info@himalayan-sound.com` inbox and customer auto-reply

## EU users

If your Zoho account is in the EU data center, use:

```bash
ZOHO_SMTP_HOST=smtp.zoho.eu
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Contact form returns 503 | `ZOHO_SMTP_*` not set on Vercel |
| Authentication failed | Use App Password, not login password |
| Emails go to spam | Complete DKIM + SPF; warm up mailbox |
| MX not working | DNS propagation can take up to 48h |

## What the site sends via Zoho

- **Contact form** → notification to `info@...` + auto-reply to customer
- **New order** → confirmation email to customer (when SMTP configured)

Incoming mail is read in [Zoho Mail](https://mail.zoho.com) or the Zoho Mail mobile app.
