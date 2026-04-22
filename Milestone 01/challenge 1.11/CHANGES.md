# Changes Made

| Old Name / Structure      | New Name / Structure          | Why                                                                  |
| ------------------------- | ----------------------------- | -------------------------------------------------------------------- |
| handleAll function        | Separate controller functions | One large function handling everything was hard to read and maintain |
| All logic in app.js       | routes + controllers folders  | Separation of concerns makes the code cleaner and scalable           |
| Inline route handlers     | Dedicated route files         | Keeps endpoints organized and easier to manage                       |
| Nested if-else validation | Simplified validation checks  | Reduces complexity and improves readability                          |
| Repeated category arrays  | Single constant (categories)  | Avoids duplication and makes updates easier                          |
| d                         | confessionData                | 'd' gave no information about what the variable held                 |
| r                         | requestParams                 | More descriptive and easier to understand                            |
| x                         | idCounter                     | Clearly shows it is used for generating IDs                          |
| tmp                       | newConfession                 | Describes the object being created                                   |
| arr                       | sortedConfessions             | Clearly indicates sorted list of confessions                         |
| stuff                     | filteredConfessions           | Describes filtered data based on category                            |
| res2                      | deletedItem                   | Makes it clear what the variable contains                            |
| Hardcoded delete token    | Config/environment variable   | Improves security and flexibility                                    |
| In-memory array           | Future database structure     | Prepares code for real-world scalability                             |
