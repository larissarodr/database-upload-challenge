# Challenge: database upload with Node.JS

This challenge is part of the [RocketSeat](https://rocketseat.com.br/) GoStack Bootcamp.

This is a small application using Node.JS and TypeScript, using ```typeorm``` to handle database manipulation and ```multer``` to deal with file import.

The application stores inbound and outbound financial transactions, allowing the user to create new transactions, list them all and import them via CSV file.

## Routes

- **`POST /transactions`**: This route receives `title`, `value`, `type` and `category` in the request body.
`type` is the type of transaction (income or outcome) and `category` is the title of the category (a separate table must be created to store the details of a category, such as `id`, `title`, `created_at` and `updated_at`).

**Note**: Before creating a new transaction, the app checks if there is already a category with the same title. If positive, the `id` of the specific category is used.

**Note 2**: Before creating a new transaction, the app checks if there's a valid balance for an outcome transaction. If not, the new transaction is not created.


```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income",
  "category": "Alimentação"
}
```

- **`GET /transactions`**: This route returns a list with all transactions stored up until the moment, including the total value of income, outcome and a balance. The object returned must follow the format below:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salary",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freelancer",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Invoice payment",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
  ],
  "balance": {
    "income": 6000,
    "outcome": 4000,
    "total": 2000
  }
}
```

- **`DELETE /transactions/:id`**: This route deletes a transaction which `id` must be sent in the route params.

* **`POST /transactions/import`**: This route allows a `.csv` file with transactions to be imported. Each line in the `.csv` file represents a new transaction to be created in the database. This route returns an array with all added transactions.

## Tests

Before running the tests, a database named "gostack_desafio06_tests" must be created. ⚠️

- **`should be able to create a new transaction`**: In order to pass this test, the application must allow the creation of a new transaction, returning the json object of the new transaction.

* **`should create tags when inserting new transactions`**: In order to pass this test, the application must create a new category whenever a transaction with a new category title is created. `category_id` in the transaction must match the category `id` that was inserted.

- **`should not create tags when they already exists`**: In order to pass this test, the application must not create a new category if there is already one with the same title stored in the database. The `category_id` of the transaction must match the `id` of the existent category.

* **`should be able to list the transactions`**: In order to pass this test, the application must return a json object containing a list of all transactions stored and the balance details.

- **`should not be able to create outcome transaction without a valid balance`**: In order to pass this test, the application must not allow that a new transaction with the type `outcome` extrapolate the available balance. The application must return a response with HTTP code 400 and an error message like `{ error: string }` .

* **`should be able to delete a transaction`**: In order to pass this test, the application must allow the deletion of a transactions, returning an empty response with HTTP code 204.

- **`should be able to import transactions`**: In order to pass this test, the application must import a `.csv` file with transactions details. The new records must be included in the database, following the category rule, where categories are only inserted in the database in case the title differs from all other categories from the database.
