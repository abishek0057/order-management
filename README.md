# Order Management System (OMS) API

> The Order Management System (OMS) API is a tool designed to facilitate order-taking for hotels using a touch screen device or any other system. Customers can conveniently visit the hotel, insert their details (with the name being compulsory), select the items they wish to buy, and place their orders. The API empowers the hotel staff with an efficient system to manage customer orders and act accordingly. 

**Note:** This project is purely for practice purposes and serves as a proof of concept for an Order Management System. It is not intended for production use.
## Overview

It supports the following functionalities:

- Register new customers with their contact details.
- List all available menu items for customers to choose from.
- Adding, updating, and deleting menu items.
- Placing customer orders with selected items and quantities.
- Retrieving orders based on their status (e.g., pending, complete, canceled).
- Updating the status of orders as they progress through the kitchen.

## Endpoints
| Endpoint               | Method | Description                                      | Request Data Structure                                 | Remark                                               |
|------------------------|--------|--------------------------------------------------|--------------------------------------------------------|------------------------------------------------------|
| `/admin/login`         | POST   | Authenticate administrator login.               | ```json { "username": "admin", "password": "admin" }``` | Default username and password are "admin" and "admin." |
| `/admin/logout`        | GET    | Logout the currently logged-in administrator.    | N/A                                                    | N/A                                                  |
| `/register`            | POST   | Register a new customer with their details.     | ```json { "id": "121", "name": "John Doe", "phone": "123-456-7890", "email": "john.doe@example.com", "address": "123 Main St, City" }``` | "name" and "id" are required, "id" is not auto given  |
| `/item`                | GET    | Retrieve a list of all available menu items.     | N/A                                                    | N/A                                                  |
| `/item/:id`            | GET    | Get details of a specific menu item by ID.      | N/A                                                    | "id" should be a Number.                             |
| `/item/additem`        | POST   | Add a new menu item.                            | ```json { "name": "Burger", "price": 10.99 }```         | Both "name" and "price" are required.                |
| `/item/updateitem/:id` | PATCH  | Update an existing menu item by ID.             | ```json { "name": "New Burger Name", "price": 12.99 }``` | N/A                                                  |
| `/item/delete/:id`     | DELETE | Delete a menu item by ID.                       | N/A                                                    | N/A                                                  |
| `/order/add`           | POST   | Place a new order with selected items and quantities. | ```json { "customerId": 121, "totalAmount": 500, "orderStatus": "pending", "orderItems": [ { "itemId": 1, "quantity": 2 }, { "itemId": 3, "quantity": 1 } ] }``` | "status" should be one of: "pending," "complete," or "canceled." |
| `/order/get/:status`   | GET    | Retrieve orders based on their status.          | N/A                                                    | "status" should be one of: "pending," "complete," or "canceled." |
| `/order/changestatus`  | PUT    | Update the status of an order by ID.           | ```json { "id": "250", "status": "complete" }```         | should use "order_id" generated while adding order    |


## Database Schema
![](https://pbs.twimg.com/media/F2TEfIPW0AARVzo?format=png&name=large)

## Getting Started 
To run this API locally or test it in your environment, follow the steps outlined:

 1. Clone the project to your local machine:
	 ```
	 
	 git clone https://github.com/abishek0057/order-management.git
	 
	```
2.	Open the terminal in the project root directory and install the required dependencies:
	```
	 
	 npm install
	 
	```
3.	Start the server using the following command:
	```
	 
	 npm run dev
	 
	```
4. Now you are ready to make requests to the API endpoints.
These steps will help you set up the API on your local machine for testing and development purposes. Feel free to explore and interact with the different endpoints using your preferred API testing tools.

## Contribution 
Contributions to improve this proof of concept project are welcome! If you find any issues or have suggestions for enhancements, please feel free to submit a pull request.
