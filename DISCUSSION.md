# Todo List

This was a fun simple project that I wanted to do more with. Here is a list of things I didn't get to do. Given the two hour window to complete this, I had to
sacrifice the other features, and present this existing MVP.

I worked on adding the API to create the database in docker and modified the code to filter and sort with the queries to the database (past the two hour mark). I 
didn't get a chance to complete more due to time constraints heading into the holiday weekend.

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
- Did not apply the dependabot template
  - I did not pin versions of the dependencies, dependabot can now handle this
- Add pagination or infinite scroll on the table, but most likely pagination.
- Styled a proper template in layout.tsx
- Setup sass variables and a base for the customized styles for Solace
- Add middleware to handle errors

I spent more time in the initial two hours to make the components generic so it could be re-used. My focus was to get a working
version up quickly, and to add iterations up to the time limit.  I typically wouldn't add a hook to fetch data, but so in this case
because of the simplicity of the project and the organization of the sorting/search logic made sense to combine in that hook.

Ideally, I'd use a generic API class (wrapping the fetch api), where I would call `AdvocatesAPI.getAll(), Advocates.getById(), Advocates.create(), Advocates.update(), Advocates.delete()`.
