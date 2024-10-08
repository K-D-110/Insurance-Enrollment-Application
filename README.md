# Enrollment Management Application

This project is a full-stack coding challenge submission. The project contains both frontend and backend components. Below are the instructions on how to set up and run the project.

**Running the Project**

Run the development server: Start the Next.js development server:

```
npm run dev
```

The application will now be running at http://localhost:3000.

Accessing the API: Next.js API routes are located under the pages/api/ directory. These can be accessed via the /api endpoints, e.g., http://localhost:3000/api/some-endpoint

**Group** - A group is a collection of individuals covered under a single insurance policy.  
**Employee** - An employee is defined as an individual who works for an employer and is eligible to participate in the employer's group insurance plan.  
**Enrollment** - The start and end dates where a particular plan covers an employee.

**Demo**
https://www.loom.com/share/2ae1fe68bb4549caa6abdd942d67cd6e?sid=a0cc954f-83a3-4bea-9e97-e7b239eb3728


# Enrollment Management Application

Build a simple enrollment management application where users can create, update, delete, and view insurance enrollments for a group of employees. 

**Group** - A group is a collection of individuals covered under a single insurance policy.  
**Employee** - An employee is defined as an individual who works for an employer and is eligible to participate in the employer's group insurance plan.  
**Enrollment** - The start and end dates where a particular plan covers an employee.

## Requirements

### Front-End
**Stories**  
- As a Noyo admin, I want to create a group to add employees.
- As a Noyo admin, I want to create employees so I can enroll them in coverage
- As a Noyo admin, I want to update employee names to correct errors.
- As a Noyo admin, I want to delete employees in case I add one by mistake.
- As a Noyo admin, I want to delete enrollments if I accidentally add one.
- As a Noyo admin, I want to enroll an employee in Medical, Dental, or Vision coverage as offered by its group.
- As a Noyo admin, I want to see a list of all my groups.
- As a Noyo admin, I want to see an individual employee and their enrollments.

**Libraries**  
- React.js: Build the user interface using React.js v18.*.
- Next.js: Use Next.js to handle server-side rendering and routing.
- You can style and construct the UI however you see fit.

Below is simple wireframe for a single page app to get you started, feel free to use this for inspiration... or design something you like more.

![Simple UI](/simple-ui.png)

### Back-End

**API Routes:** Use Next.js API routes to create a RESTful API for managing all domain objects. Implement the CRUD operations (Create, Read, Update, Delete) for employees and enrollments.  
**Database:** Store data in a database (e.g., MongoDB, PostgreSQL, or a cloud solution like Firebase Firestore).  

## Data Modeling
- A group must have a name, for example, "Noyo Corporation."
- Each employee must have a first and last name.
- Each employee must be a member of a group.
- Each group can offer 1 - 3 types of plans. Medical, Dental, or Vision
- Each employee can enroll in any of the plans.
- Each plan has a start and end date.

**TypeScript**: Use TypeScript for type safety.  
**Code Quality**: Write clean, maintainable code following SOLID principles and best practices. Include comments where necessary and ensure the code is well-structured and extensible (you will have to extend it in your onsite)

![Data Model](/data.png)

# Deliverables
- Zip up your code and email it to **coding-challenge at noyo dot com** no later than 24 hrs before your interview.
- Deploy the application to a platform like Vercel, Netlify, or any cloud provider.


## Live Coding Extention
During your onsite, you will discuss and demo your take-home solution. As part of this, there will be a live coding extension where you will implement additional functionality at the discretion of the interviewer.


### Final Word!
We are looking for a functional app with excellent quality and an intuitive and responsive UI/UX. Your time is valuable, so you should be able to stand up and deploy a solution in a couple of hours using any one-stop-shop, free cloud platform, and related UI libraries. We are not asking, nor do we expect, you to spend days on this application, and we will evaluate your solution with that understanding.

Thank you for your time!