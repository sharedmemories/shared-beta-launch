


## Changelog
### Auth
- Remove sign in by password and replace with EmailOTP
- Removed Avatar Nav from header, User clicks on Get Started / Subscribe & taken to dashboard after sign up
- Added rate limit middleware ie middleware.ts
- Used cache to cache session `await getCachedSession();`
- Used sooner toast instead of the deprecated shadcn toast
- Added `requireOrganizationRole` for business clients on the business layout route