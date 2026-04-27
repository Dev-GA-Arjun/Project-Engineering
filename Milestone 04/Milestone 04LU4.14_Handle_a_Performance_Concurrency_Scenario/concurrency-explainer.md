# Concurrency Explainer

**Your name:**  
**Date:**

---

## The Root Cause — Why Check-Then-Insert Fails

The original implementation follows a check-then-insert pattern, where the system first queries the database using `findFirst()` to check if a booking already exists, and then proceeds to create a new booking if none is found. This approach appears logically correct in a single-user scenario but breaks under concurrent load due to a race condition.

A race condition occurs when two or more requests execute simultaneously and rely on shared state—in this case, the availability of a seat. If two booking requests for the same `seatId` and `showId` arrive at nearly the same time, both requests execute the `findFirst()` query before either has completed the `create()` operation. Since neither booking exists yet, both queries return “no result,” and both requests proceed to create a booking. This leads to duplicate bookings for the same seat.

The critical issue lies in the “gap” between the check (`findFirst`) and the insert (`create`). This gap is a window of time where another request can interleave and perform the same operations. Since these operations are not atomic (i.e., not executed as a single indivisible step), the system cannot guarantee correctness under concurrency.

---

## Why the Unique Constraint Fixes It

The unique constraint (`@@unique([seatId, showId])`) shifts the responsibility of enforcing data integrity from the application layer to the database layer. Unlike application code, which runs sequentially per request and cannot coordinate across concurrent executions, the database enforces constraints atomically at the storage level.

When multiple requests attempt to insert the same `(seatId, showId)` combination simultaneously, the database ensures that only one insert succeeds. All other conflicting inserts are rejected immediately. This works because the database engine applies locking and validation internally during the transaction, eliminating the timing gap present in the check-then-insert pattern.

No matter how fast application-level checks are, they cannot guarantee correctness because they operate outside the database’s atomic execution boundary. Only the database can reliably enforce uniqueness under concurrent access.

---

## Why Rate Limiting Alone Is Not Enough

Rate limiting controls how many requests a single client (IP address) can send within a given time window, but it does not guarantee data correctness. For example, consider two different users attempting to book the same seat at the same time. Each user sends only one request, which is well within the rate limit.

Without the unique constraint, both requests pass through the rate limiter and reach the application logic. Since the check-then-insert pattern is still in place, both requests may see the seat as available and proceed to create duplicate bookings. This shows that rate limiting reduces load but does not prevent race conditions between legitimate users.

---

## What P2002 Means and Why 409

P2002 is a Prisma error code that indicates a unique constraint violation in the database. It occurs when an insert or update operation attempts to create a record with a field combination that must be unique, but an existing record already has that combination.

Returning an HTTP 409 Conflict status is appropriate because the request is valid in structure and intent, but it conflicts with the current state of the resource (i.e., the seat is already booked). A 400 Bad Request would imply that the client sent invalid data, which is not true. A 500 Internal Server Error would suggest a server-side failure, but this situation is an expected and handled outcome of enforcing data integrity.

By catching the P2002 error and returning 409, the API clearly communicates that the booking could not be completed due to a conflict, allowing the client to respond appropriately.

---

**Total word count:** ~470 words
