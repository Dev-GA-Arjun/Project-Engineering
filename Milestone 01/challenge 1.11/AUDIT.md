# Audit Report

## Overview

The backend is built using Express and stores data in memory using an array. All logic is written inside a single function `handleAll`, which makes the code hard to read and maintain.

## Issues Found

1. Poor Structure

- All operations (create, read, delete) are handled in one function.
- No separation into routes, controllers, or services.

2. Readability Problems

- Nested if-else conditions make the code difficult to understand.
- Variable names like `d`, `r`, `x`, `tmp` are unclear.

3. Hardcoded Values

- Categories and delete token are hardcoded inside the function.
- This reduces flexibility and scalability.

4. Validation Issues

- Input validation is repetitive and not reusable.
- Some checks are unnecessary or overly complex.

5. Data Storage Limitation

- Data is stored in memory (`confessions` array), so it resets when the server restarts.
- Not suitable for real-world applications.

6. Security Concern

- Delete route uses a simple hardcoded token.
- Not secure for production use.

7. Code Duplication

- Category list is repeated in multiple places.

## Summary

The code works for a basic prototype but is not scalable or maintainable. It needs proper structure and separation of concerns.
