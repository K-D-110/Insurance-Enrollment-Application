To effectively design the API endpoints for your enrollment management application, we'll outline a RESTful API structure. This structure will focus on handling CRUD (Create, Read, Update, Delete) operations for `Groups`, `Employees`, and `Enrollments`. Below, I’ll detail each endpoint with expected input and output formats, using JSON for data interchange.

### 1. **Groups API**

- **Create Group**

  - **Endpoint:** `POST /api/groups`
  - **Input:**
    ```json
    {
      "name": "Noyo Corporation"
    }
    ```
  - **Output:**
    ```json
    {
      "id": "1",
      "name": "Noyo Corporation"
    }
    ```

- **Get All Groups**

  - **Endpoint:** `GET /api/groups`
  - **Output:**
    ```json
    [
      {
        "id": "1",
        "name": "Noyo Corporation"
      }
    ]
    ```

- **Update Group**

  - **Endpoint:** `PUT /api/groups/{groupId}`
  - **Input:**
    ```json
    {
      "name": "Updated Noyo Corporation"
    }
    ```
  - **Output:**
    ```json
    {
      "id": "1",
      "name": "Updated Noyo Corporation"
    }
    ```

- **Delete Group**
  - **Endpoint:** `DELETE /api/groups/{groupId}`
  - **Output:**
    ```json
    {
      "success": true,
      "id": "1"
    }
    ```

### 2. **Employees API**

- **Create Employee**

  - **Endpoint:** `POST /api/employees`
  - **Input:**
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "groupId": "1"
    }
    ```
  - **Output:**
    ```json
    {
      "id": "101",
      "firstName": "John",
      "lastName": "Doe",
      "groupId": "1"
    }
    ```

- **Get All Employees**

  - **Endpoint:** `GET /api/employees`
  - **Output:**
    ```json
    [
      {
        "id": "101",
        "firstName": "John",
        "lastName": "Doe",
        "groupId": "1"
      }
    ]
    ```

- **Update Employee**

  - **Endpoint:** `PUT /api/employees/{employeeId}`
  - **Input:**
    ```json
    {
      "firstName": "Jane",
      "lastName": "Doe"
    }
    ```
  - **Output:**
    ```json
    {
      "id": "101",
      "firstName": "Jane",
      "lastName": "Doe",
      "groupId": "1"
    }
    ```

- **Delete Employee**
  - **Endpoint:** `DELETE /api/employees/{employeeId}`
  - **Output:**
    ```json
    {
      "success": true,
      "id": "101"
    }
    ```

### 3. **Enrollments API**

- **Create Enrollment**

  - **Endpoint:** `POST /api/enrollments`
  - **Input:**
    ```json
    {
      "employeeId": "101",
      "planType": "Medical",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
    ```
  - **Output:**
    ```json
    {
      "id": "201",
      "employeeId": "101",
      "planType": "Medical",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
    ```

- **Get Enrollments by Employee**

  - **Endpoint:** `GET /api/enrollments/employee/{employeeId}`
  - **Output:**
    ```json
    [
      {
        "id": "201",
        "employeeId": "101",
        "planType": "Medical",
        "startDate": "2024-01-01",
        "endDate": "2024-12-31"
      }
    ]
    ```

- **Update Enrollment**

  - **Endpoint:** `PUT /api/enrollments/{enrollmentId}`
  - **Input:**
    ```json
    {
      "planType": "Dental",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
    ```
  - **Output:**
    ```json
    {
      "id": "201",
      "employeeId": "101",
      "planType": "Dental",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
    ```

- **Delete Enrollment**
  - **Endpoint:** `DELETE /api/enrollments/{enrollmentId}`
  - **Output:**
    ```json
    {
      "success": true,
      "id": "201"
    }
    ```

These API endpoints will allow you to manage all aspects of groups, employees, and their enrollments within your application. They should be implemented using Next.js API routes to handle requests and interact with the database.
