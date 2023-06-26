# Tech Stacks used in this project

React + Redux-Toolkit+Tailwind CSS

# How is data shown in the table?

- In content of data.json file, key of the object is the table header, key of the sub-object is the sub-header.
- One object of the content is one row of table.

# What don't I implement?

This data.json file is the return value of some API request and I can know that there are other pages because there are the `totalPages`, `totalElements`, `size` fields in the json file.
Of course, if I get the data from API, then by using there three fields, I can implement pagination in the table but for now, it is just one page data and I can't get any more so I didn't implement pagination.
