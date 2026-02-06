## Writings by snehasish

---

My blog and writing website. I post random writings in here. Completely open-sourced.

### Making your own writings website

#### 1. Clone this repo

```
git clone https://github.com/snxhasish/writings
```

#### 2. Install all dependencies
```
pnpm i
```

or `npm i` if using npm.

#### 3. Add environment variables
Add this to your `.env` file

```
NEXT_PUBLIC_SANITY_PROJECT_ID="--your-sanity-project-id--"
NEXT_PUBLIC_SANITY_DATASET="production"
```

#### 4. Push to your own repo and deploy on Vercel