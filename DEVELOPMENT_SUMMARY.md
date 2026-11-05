# Development Summary

**Lanka Stayz prototype. Lonitha Perera**

## My approach

I read the brief as "a small product, not a page", so I started from the user journey: *search, browse, choose, request*. Each task maps to one page, and all of them read from one data module (`js/data.js`) so that the cards, filters, details and booking form can never disagree.

**Stack.** Plain HTML, CSS and JavaScript modules with no build step. For five pages and one data set a framework adds setup, and a reviewer can open the code and follow it straight away. The structure (data, UI helpers, one script per page) is the same split I would use in React or Next.js, so moving over later is mostly mechanical.

**Design.** I wanted something that feels like a travel magazine rather than a booking template: a warm paper background, tea-estate green and cinnamon accents, a serif display face with a clean grotesque for UI, and real photography. Prices are shown in LKR, and copy is written for a traveller.

**Quality choices.**
- Forms validate on blur and on submit, with specific messages and focus moved to the first error. The same validator drives the booking and contact forms.
- Listing filters live in the URL, so a filtered view can be shared or bookmarked, and the homepage search flows straight into it.
- Accessibility: semantic landmarks, skip link, visible focus, labelled controls, `aria-live` for results and errors, native `<dialog>` focus handling, `prefers-reduced-motion` respected.
- Responsive from 360 px upward using fluid type and CSS Grid; images are lazy-loaded and compressed (about 6 MB for all photos).
- Checked in the browser at phone, tablet and desktop widths with no console errors.

## Trade-offs I made knowingly

- No backend, so booking requests only go to `localStorage` and the confirmation says a person will follow up rather than pretending an email was sent.
- Photos show the real locations, not the fictional properties, because free interior photography of Sri Lankan stays is scarce.
- Search dates do not filter results, since there is no availability data yet.

## What I would do for the full commercial site

1. **Backend and data.** A relational database (PostgreSQL) for properties, rooms, hosts, rates, bookings and users, behind an API (Node/NestJS or Next.js route handlers). Admin dashboard for hosts and staff.
2. **Availability and pricing.** A real availability calendar with blocked dates, minimum stays, seasonal and weekend rates, taxes and service fees, and protection against double-booking (transactional holds).
3. **Booking and payments.** Request-to-book and instant-book flows, secure payment (PayHere / Stripe, LKR and USD), confirmation and reminder emails/SMS, cancellation policies and refunds.
4. **Accounts.** Guest login, saved stays, booking history, host onboarding and verification, reviews tied to completed stays.
5. **Search and discovery.** Server-side search with filters (price, amenities, rating, type), map view with clustering, date-aware results, and sorting by relevance.
6. **Media and CMS.** Image CDN with responsive formats (AVIF/WebP), host photo upload, and a CMS for destination guides and blog content to drive SEO.
7. **Performance and SEO.** Server-side rendering or static generation (Next.js), structured data for each listing, sitemaps, Core Web Vitals monitoring.
8. **Internationalisation.** English, Sinhala, Tamil and multi-currency display, plus accessibility audits (WCAG 2.2 AA).
9. **Quality and operations.** Automated tests (unit, component, end-to-end), CI/CD, error monitoring, analytics, backups, and security hardening (rate limiting, CSRF, input validation, GDPR/PDPA-aware data handling).
