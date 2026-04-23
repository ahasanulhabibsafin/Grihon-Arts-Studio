# Security Specification - Grihon Arts Studio

## Data Invariants
1. A Graphic asset must have a title, category, Cloudinary preview URL, and Google Drive download URL.
2. Only the designated admin (`safinbakshi013@gmail.com`) can create, update, or delete graphics.
3. All users can read the `graphics` collection.
4. `createdAt` must be a server-generated timestamp on creation and immutable thereafter.

## The Dirty Dozen Payloads (Rejection Targets)
1. **Unauthorized Create**: User with email `hacker@gmail.com` trying to add a graphic.
2. **Title Poisoning**: Graphic with a 1MB string title.
3. **ID Injection**: Trying to create a document with a junk-character ID like `../../secrets`.
4. **Link Spoofing**: Setting `previewUrl` to a non-URI string.
5. **State Skipping**: Trying to manually set `createdAt` from the client.
6. **Immutable Tampering**: Updating the `createdAt` field after the graphic is created.
7. **Schema Ghosting**: Adding an extra `isVerified: true` field to a graphic.
8. **Ownership Spoof**: Trying to change the record's metadata.
9. **Bulk Delete**: Unauthorized user attempting to wipe the `graphics` collection.
10. **Query Scraping**: Using a list query without a limit or index-efficient filters.
11. **ID Poisoning (Get)**: Fetching a document using a 2KB string ID.
12. **PII Leak**: Attempting to read unauthorized admin profile data (if any existed).

## Test Runner (Planned)
We will implement `firestore.rules` to reject all the above based on `request.auth.token.email`.
