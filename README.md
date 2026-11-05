# Lanka Stayz: accommodation booking prototype

Practical technical assessment for the **Full-Stack Web Developer** role at Xero Lanka / Lanka Stayz.
Author: **Lonitha Perera** (loniperera2005@gmail.com)

A working sample website for a Sri Lankan accommodation platform: homepage with search, filterable listings, property details with gallery, and a validated booking-request form. It is a prototype, so there is no backend, payment or login.

**Live demo:** https://lonithaperera.github.io/lanka-stayz/
**Source:** https://github.com/LonithaPerera/lanka-stayz

## Run it locally

No build step or dependencies. ES modules need an HTTP server (opening `index.html` by double-click will not load them), so use any static server:

```bash
npx serve .
```

or

```bash
python -m http.server 5173
```

then open the printed address (for example http://localhost:5173).

To publish, drag the project folder onto Netlify Drop, or enable GitHub Pages / Vercel on the repository. It is plain static files, so no configuration is needed.

## What is built (mapped to the brief)

| Task | Where | Notes |
| --- | --- | --- |
| 1. Homepage | `index.html`, `js/home.js` | Text + SVG brand, nav (Home, Explore Stays, About Us, Contact), full-width banner, "Discover Your Perfect Stay in Sri Lanka", search (destination, check-in, check-out, guests), six featured stays, destinations, footer with contact info and social links |
| 2. Listings | `stays.html`, `js/stays.js` | 8 sample properties. Filter by **destination** (chips), plus type, group size and sort. Filters are kept in the URL, so views are shareable and the homepage search feeds in |
| 3. Details | `property.html`, `js/property.js` | `?id=` routing, 4 photos with keyboard-friendly lightbox, description, amenities, capacity, price, check-in/out dates with live total, **Request Booking** button, "not found" state |
| 4. Booking form | `js/booking.js` | Modal form: name, email, phone, dates, guests. Inline validation (required, email/phone format, no past dates, check-out after check-in, guests not above capacity), then a confirmation panel with a reference number. The request is saved to `localStorage` only |
| 5. Responsive | `css/*.css` | Mobile-first; checked at 375, 768 and 1280 px. Hamburger menu, stacking search bar, reflowing cards and gallery |

Extra: About and Contact pages (contact form reuses the same validator), skip link, focus styles, semantic HTML and ARIA, reduced-motion support, SEO meta tags and structured data.

## Technologies

- HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (ES modules)
- Fonts: Gloock and Schibsted Grotesk (Google Fonts)
- Native `<dialog>` for the booking form and lightbox
- No frameworks or build tools, by choice: the scope is small, and it keeps the code easy to read and explain

## Project structure

```
index.html  stays.html  property.html  about.html  contact.html
css/   base.css (tokens, type) · components.css · pages.css
js/    data.js (sample properties) · ui.js (header/footer, cards, icons, date helpers)
       home.js · search.js · stays.js · property.js · booking.js
assets/  img/ (photos) · favicon.svg
```

All property content lives in `js/data.js`; replacing it with an API call is the only change the pages need.

## Incomplete / simulated features

- Booking requests are not emailed or stored on a server (only `localStorage` in the visitor's browser).
- Check-in/out dates in the search are carried to the listing and details pages but do not filter by availability (there is no availability data).
- Prices and guest numbers are sample data. All properties, reviews and the address are fictional.
- The social links point to each network's home page.
- Photos show the real locations but are not photos of the fictional properties themselves.

## AI-assistance disclosure

As permitted by the assessment brief, this project was built with AI assistance (Claude Code). I reviewed the code, tested it in the browser, and can explain and modify any part of it in the technical interview.

## Photo credits

All photos are from Wikimedia Commons under free licences (attribution below). Resized and compressed for the web.

| File | Source | Author | Licence |
| --- | --- | --- | --- |
| hero.jpg | [Thiranagama Sri Lanka Riff Hotel 5-star resort Presidential Suite view.jpg](https://commons.wikimedia.org/wiki/File:Thiranagama_Sri_Lanka_Riff_Hotel_5-star_resort_Presidential_Suite_view.jpg) | Xandrium | CC0 |
| about.jpg | [Sri Lanka, Tea plantations, Nuwara Eliya, Picking tea leaves.jpg](https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Tea_plantations,_Nuwara_Eliya,_Picking_tea_leaves.jpg) | Vyacheslav Argenberg | CC BY 4.0 |
| cinnamon-ridge-villa-1.jpg | [Infinity pool -Duwili Ella Knuckles.jpg](https://commons.wikimedia.org/wiki/File:Infinity_pool_-Duwili_Ella_Knuckles.jpg) | Gayan Rajapakshe | CC BY-SA 4.0 |
| cinnamon-ridge-villa-2.jpg | [Ella Gap (Valley), Sri Lanka.jpg](https://commons.wikimedia.org/wiki/File:Ella_Gap_(Valley),_Sri_Lanka.jpg) | Vyacheslav Argenberg | CC BY 4.0 |
| cinnamon-ridge-villa-3.jpg | [Misty Tea Plantation Scenery - Outside Ella - Sri Lanka - 01 (14110130712).jpg](https://commons.wikimedia.org/wiki/File:Misty_Tea_Plantation_Scenery_-_Outside_Ella_-_Sri_Lanka_-_01_(14110130712).jpg) | Adam Jones from Kelowna, BC, Canada | CC BY-SA 2.0 |
| cinnamon-ridge-villa-4.jpg | [Tea Teefarm Ella Sri Lanka (29446625573).jpg](https://commons.wikimedia.org/wiki/File:Tea_Teefarm_Ella_Sri_Lanka_(29446625573).jpg) | dronepicr | CC BY 2.0 |
| lakeview-heritage-kandy-1.jpg | [Kandy Lake - Central Province.jpg](https://commons.wikimedia.org/wiki/File:Kandy_Lake_-_Central_Province.jpg) | Amal Balasooriya | CC BY-SA 4.0 |
| lakeview-heritage-kandy-2.jpg | [The Kandy Lake at dawn.jpg](https://commons.wikimedia.org/wiki/File:The_Kandy_Lake_at_dawn.jpg) | Sleepyartz | CC BY-SA 4.0 |
| lakeview-heritage-kandy-3.jpg | [Serene Garden Hotel ^ 189, Rajapihilla Mawatha, Kandy, Sri Lanka - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Serene_Garden_Hotel_%5E_189,_Rajapihilla_Mawatha,_Kandy,_Sri_Lanka_-_panoramio.jpg) | Николай Максимович | CC BY 3.0 |
| lakeview-heritage-kandy-4.jpg | [Kandy lake in the morning.jpg](https://commons.wikimedia.org/wiki/File:Kandy_lake_in_the_morning.jpg) | Pamuditha2000 | CC BY-SA 4.0 |
| fort-courtyard-galle-1.jpg | [Galle Fort Hotel (entrance).jpg](https://commons.wikimedia.org/wiki/File:Galle_Fort_Hotel_(entrance).jpg) | Dan arndt | CC BY-SA 4.0 |
| fort-courtyard-galle-2.jpg | [Dutch Galle Fort, Sri Lanka.jpg](https://commons.wikimedia.org/wiki/File:Dutch_Galle_Fort,_Sri_Lanka.jpg) | Icaptures84 | CC BY-SA 4.0 |
| fort-courtyard-galle-3.jpg | [IMG GalleFort.jpg](https://commons.wikimedia.org/wiki/File:IMG_GalleFort.jpg) | DeeBFFTC | CC BY-SA 4.0 |
| fort-courtyard-galle-4.jpg | [02012 08224 Zwart Bastion, Galle Fort.jpg](https://commons.wikimedia.org/wiki/File:02012_08224_Zwart_Bastion,_Galle_Fort.jpg) | Silar | CC BY-SA 4.0 |
| coral-bay-mirissa-1.jpg | [Mirissa Beach.jpg](https://commons.wikimedia.org/wiki/File:Mirissa_Beach.jpg) | Dan arndt | CC BY-SA 4.0 |
| coral-bay-mirissa-2.jpg | [Mirissa-Plage (3).jpg](https://commons.wikimedia.org/wiki/File:Mirissa-Plage_(3).jpg) | Ji-Elle | CC BY-SA 3.0 |
| coral-bay-mirissa-3.jpg | [Marakolliya Beach Scene - Ganesh Garden Beach Cabanas - Tangalla - Sri Lanka - 01 (13893245638).jpg](https://commons.wikimedia.org/wiki/File:Marakolliya_Beach_Scene_-_Ganesh_Garden_Beach_Cabanas_-_Tangalla_-_Sri_Lanka_-_01_(13893245638).jpg) | Adam Jones from Kelowna, BC, Canada | CC BY-SA 2.0 |
| coral-bay-mirissa-4.jpg | [Mirissa - surfboards.jpg](https://commons.wikimedia.org/wiki/File:Mirissa_-_surfboards.jpg) | Dan arndt | CC BY-SA 4.0 |
| pine-hill-bungalow-1.jpg | [Gregory Lake Nuwara Eliya 02.jpg](https://commons.wikimedia.org/wiki/File:Gregory_Lake_Nuwara_Eliya_02.jpg) | Kalana Jayatilake | CC BY-SA 4.0 |
| pine-hill-bungalow-2.jpg | [Garden of Colonial-Era Bandarawela Hotel - Bandarawela - Hill Country - Sri Lanka - 01 (14141591473).jpg](https://commons.wikimedia.org/wiki/File:Garden_of_Colonial-Era_Bandarawela_Hotel_-_Bandarawela_-_Hill_Country_-_Sri_Lanka_-_01_(14141591473).jpg) | Adam Jones from Kelowna, BC, Canada | CC BY-SA 2.0 |
| pine-hill-bungalow-3.jpg | [Sri Lanka, Tea plantations, Nuwara Eliya.jpg](https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Tea_plantations,_Nuwara_Eliya.jpg) | Vyacheslav Argenberg | CC BY 4.0 |
| pine-hill-bungalow-4.jpg | [Nuwara Eliya Gregory Lake.jpg](https://commons.wikimedia.org/wiki/File:Nuwara_Eliya_Gregory_Lake.jpg) | Chamixth | CC BY-SA 4.0 |
| galle-face-suites-1.jpg | [Infinity Pool Colombo (29446044664).jpg](https://commons.wikimedia.org/wiki/File:Infinity_Pool_Colombo_(29446044664).jpg) | dronepicr | CC BY 2.0 |
| galle-face-suites-2.jpg | [View of Colombo galle face.JPG](https://commons.wikimedia.org/wiki/File:View_of_Colombo_galle_face.JPG) | Saqib Qayyum | CC BY-SA 3.0 |
| galle-face-suites-3.jpg | [Thiranagama Sri Lanka Riff Hotel 5-star resort Suite bedroom.jpg](https://commons.wikimedia.org/wiki/File:Thiranagama_Sri_Lanka_Riff_Hotel_5-star_resort_Suite_bedroom.jpg) | Xandrium | CC0 |
| galle-face-suites-4.jpg | [Negombo Beach resort pool (Unsplash).jpg](https://commons.wikimedia.org/wiki/File:Negombo_Beach_resort_pool_(Unsplash).jpg) | Recal Media recalmedia | CC0 |
| rock-view-sigiriya-1.jpg | [Sigiriya rock from a distance.jpg](https://commons.wikimedia.org/wiki/File:Sigiriya_rock_from_a_distance.jpg) | Yourusernamewillbepublic2 | CC0 |
| rock-view-sigiriya-2.jpg | [Sigirîya Lion Rock (36231936082).jpg](https://commons.wikimedia.org/wiki/File:Sigir%C3%AEya_Lion_Rock_(36231936082).jpg) | V. Epiney | CC BY-SA 2.0 |
| rock-view-sigiriya-3.jpg | [SriLanka Sigiriya gardens.jpg](https://commons.wikimedia.org/wiki/File:SriLanka_Sigiriya_gardens.jpg) | Shoka at English Wikipedia | CC BY-SA 3.0 |
| rock-view-sigiriya-4.jpg | [Sigiriya Luftbild (29781064900).jpg](https://commons.wikimedia.org/wiki/File:Sigiriya_Luftbild_(29781064900).jpg) | dronepicr | CC BY 2.0 |
| unawatuna-bay-house-1.jpg | [Unawatuna Beach from above.jpg](https://commons.wikimedia.org/wiki/File:Unawatuna_Beach_from_above.jpg) | Kondephy | CC BY-SA 4.0 |
| unawatuna-bay-house-2.jpg | [Jungle Beach, Unawatuna, Sri Lanka.jpg](https://commons.wikimedia.org/wiki/File:Jungle_Beach,_Unawatuna,_Sri_Lanka.jpg) | Hirushini Dematagoda | CC BY-SA 4.0 |
| unawatuna-bay-house-3.jpg | [Unawatuna.jpg](https://commons.wikimedia.org/wiki/File:Unawatuna.jpg) | Bernard Gagnon | CC BY-SA 3.0 |
| unawatuna-bay-house-4.jpg | [Coconut trees and pool.jpg](https://commons.wikimedia.org/wiki/File:Coconut_trees_and_pool.jpg) | Itsnamina | CC BY-SA 4.0 |
