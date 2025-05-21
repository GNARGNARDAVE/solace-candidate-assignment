# Todo List

This was a fun simple project that I wanted to do more with. Here is a list of things I didn't get to do. Given the two hour window to complete this, I had to
sacrifice the other features, and present this existing MVP.

- Add tests for components with testing-library
- Add a component library like MUI
  - Wrap the components in a single location to use
    - Input
    - Table/Grid
    - Snackbar/Toast
    - Button
    - Icons
- Added a proper error handling flow
  - Utilize either Snackbar/Toast or set a standard on where errors are displayed
- Add the database migration/api
  - Add a migrations folder with the relevant sql by date
  - Add the proper logic to query the database (insert/ select)
- Did not apply the dependabot template
  - I did not pin versions of the dependencies, dependabot can now handle this
- Add specific filtering functionality by column, or ordering ASC/DESC
  - This would have required an extra query for sorting
  - Add pagination or infinite scroll on the table, but most likely pagination.
- Add an advanced filter on the search
  - Search specifically by column
- Styled a proper template
- Setup sass variables and a base for the customized styles for Solace
- Go back and fix the search/filtering code. I am not really happy with it.
  - I originally had it iterate through the array of keys, and use the 'find' prototype for the current record and then go to the next record. It was really
    simple but needed a few more iterations to get it dialed. The current one was to get it working and time ran out with trying all the typing and styling
    work.
