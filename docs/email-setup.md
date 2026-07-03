# Email Setup: Gmail (Free)

**$0/month** — one address for everything: `himalayansound.info@gmail.com`

```
Клиент пишет на Gmail        → приходит в ваш inbox
Форма на сайте               → Gmail SMTP → клиенту (From: himalayansound.info@gmail.com)
Вы отвечаете из Gmail        → естественно From: himalayansound.info@gmail.com
```

Cloudflare Email Routing и Resend **не нужны** для этой схемы.

---

## Status checklist

| # | What | How |
|---|------|-----|
| 1 | Public contact email on site | `NEXT_PUBLIC_CONTACT_EMAIL` |
| 2 | Website sends mail | Gmail SMTP (`SMTP_USER` + App Password) |
| 3 | You reply to customers | Normal Gmail Reply |

---

## Step 1 — Gmail App Password

1. Sign in to **himalayansound.info@gmail.com**
2. Enable [2-Step Verification](https://myaccount.google.com/signinoptions/two-step-verification)
3. [App passwords](https://myaccount.google.com/apppasswords) → create one for **Mail**
4. Copy the 16-character password (e.g. `abcd efgh ijkl mnop`)

---

## Step 2 — Environment variables

**Local** (`.env.local`) and **Vercel** → Settings → Environment Variables:

```bash
NEXT_PUBLIC_CONTACT_EMAIL=himalayansound.info@gmail.com
EMAIL_FROM_NAME=Himalayan Sound

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=himalayansound.info@gmail.com
SMTP_PASS=your_16_char_app_password

# Optional — defaults to contact email if omitted
ADMIN_NOTIFICATION_EMAIL=himalayansound.info@gmail.com
```

Redeploy on Vercel after saving.

> **Note:** Resend (`RESEND_API_KEY`) cannot send **From** a `@gmail.com` address. Use Gmail SMTP instead. You may remove `RESEND_API_KEY` from Vercel if you no longer need it.

---

## Step 3 — Test

1. Submit https://himalayan-sound.com/uk/contact
2. Notification arrives in `himalayansound.info@gmail.com`
3. Customer auto-reply shows **From:** `himalayansound.info@gmail.com`
4. Click **Reply** on the notification — customer receives reply from the same Gmail

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Contact form 503 | Set `SMTP_USER` + `SMTP_PASS` (Gmail App Password) on Vercel |
| Gmail SMTP auth failed | Use App Password, not account password; 2FA must be on |
| Emails in spam | Normal for new Gmail; ask customers to check spam folder initially |
| Wrong From address | Check `NEXT_PUBLIC_CONTACT_EMAIL` and redeploy |

---

## Links

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Google 2-Step Verification](https://myaccount.google.com/signinoptions/two-step-verification)
