# CVMD Candy website

Static site for Central Valley Modest Delights (@cvmdcandy). No build step, no framework: `index.html`, `styles.css`, `app.js` and the `images` folder.

## Deploy on Vercel

Option A, GitHub: put this folder in a GitHub repo, then on vercel.com click Add New, Project, import the repo, and press Deploy. Framework preset: Other. No build command, output directory is the root.

Option B, CLI: from inside this folder run `npx vercel` and follow the prompts, then `npx vercel --prod`.

After it's live, change the `og:image` tag in `index.html` to the full URL (for example `https://yourdomain.com/images/og-cover.jpg`) so link previews show the image.

## Colors

Olive is the live palette. A second "candy" palette is also built in. `index.html` starts with `<html lang="en" data-theme="olive">`: the site uses `olive`; change it to `candy` only if the owner wants the pink and black look. Adding `data-palette-switch` to that same tag shows a small palette switch in the corner, which is handy for showing the client both options. Leave it off for the live site.

## Editing the menu

Everything on the menu lives in the MENU DATA block at the top of `app.js`:

- `PRODUCTS`: names, descriptions, sizes and prices. `price: null` shows "Price in chat".
- `FLAVORS`: sugar coat, candy dust and sauce lists, each with a swatch color.
- `SLIDES` (in the hero section of `app.js`): the treats in the hero carousel, with each one's background and text color.
- `FAVORITES`: the "Start from a fan favorite" buttons.
- `GALLERY`: photos and captions in the "Fresh off the counter" strip.
- `CONTACT`: Instagram handle, Facebook username and opening hours.

## Swapping photos

Every photo comes in three sizes so phones only download what they need: `name.webp` (full, up to 960px wide), `name-sm.webp` (480px) and `name-xs.webp` (200px). When you add or replace a photo, save all three sizes with those endings, point the product's `img` at the name (without size or extension), and add the full-size width and height to `IMG_SIZES` in `app.js`. Use a new file name when replacing a photo, because browsers keep images cached for a week.

## How ordering works

The cart is saved in the visitor's browser. "Send on Instagram" and "Send on Facebook" copy the written order to the clipboard and open the DM with @cvmdcandy, where the customer pastes and sends. Facebook Messenger links also carry the text in the link, which some versions of Messenger prefill.

## Photo credits

Four menu photos are free stock photos from Unsplash (free for commercial use, credit appreciated). Swap them for real CVMD photos when you have them:

- `stock-strawberries.webp`: https://unsplash.com/photos/candied-strawberries-and-grapes-on-skewers-GBAMz4o3l3U
- `stock-berries-mango.webp`: https://unsplash.com/photos/pink-ceramic-bowl-besides-spoon-MHHAQR24tzc
- `stock-rollups.webp`: https://unsplash.com/photos/a-pile-of-colorful-candy-sitting-on-top-of-a-white-table-xnOEo_KWICc
- `stock-sauce.webp`: https://unsplash.com/photos/condiments-and-ingredients-for-a-meal-eIOdJ2yv_8E

All other photos are from CVMD's own Instagram and Facebook.
