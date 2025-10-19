Got it 😎 — here’s a beautifully styled and GitHub-optimized** `README.md` with emojis, modern formatting, proper headings, tables, and code blocks.
It’s clean, professional, and **impressive enough for reviewers or internship submissions.

---

 🍽️ Menu Management Backend


  Node.js + Express + MongoDB
  Hierarchical menu management system for Categories, Subcategories & Items


---

## 🚀 Overview

This project is a **Node.js backend server** built to manage a restaurant-style menu divided into three parts:

- 🗂️ **Category** — e.g., Fruits, Dairy, Snacks  
- 📁 **Subcategory** — e.g., Citrus, Milk Products  
- 🍔 **Item** — e.g., Orange, Cheese, Chips  

Each level supports **CRUD operations** and **item search by name**.  
The backend follows RESTful principles and integrates seamlessly with MongoDB.

---

## 🧠 Assignment Objectives

✅ Create, Read, Update (Edit) operations for:
- Category  
- Subcategory  
- Item  

✅ Search for items by name  
✅ Postman-ready endpoints  
✅ Clean and commented code  
✅ Clear documentation (this README!)

---

## 🧩 Tech Stack

| Component | Technology |
|------------|-------------|
| 🧱 Backend Framework | Node.js + Express.js |
| 🗄️ Database | MongoDB (Mongoose ODM) |
| 🧪 API Testing | Postman |
| ⚙️ Environment | dotenv |
| 🧰 Version Control | Git + GitHub |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/deveshpandey65/shop-assi.git
cd menu-management-backend
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root folder:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Start Server

```bash
npm start
```

Server runs on 👉 **[http://localhost:5000/api/v1](http://localhost:5000/api/v1)**

---

## 📁 Folder Structure

```
src/
│
├── models/
│   ├── Category.js
│   ├── SubCategory.js
│   └── Item.js
│
├── controllers/
│   ├── categoryController.js
│   ├── subCategoryController.js
│   └── itemController.js
│
├── routes/
│   ├── categoryRoutes.js
│   ├── subCategoryRoutes.js
│   └── itemRoutes.js
│

```

---

## 🌐 API Endpoints

### 🗂️ CATEGORY ROUTES

| Method   | Endpoint                      | Description            |
| -------- | ----------------------------- | ---------------------- |
| **POST** | `/api/v1/categories`            | Create a new category  |
| **GET**  | `/api/v1/categories`            | Get all categories     |
| **GET**  | `/api/v1/categories/:id`        | Get a category by ID   |
| **GET**  | `/api/v1/categories/name/:name` | Get a category by name |
| **PUT**  | `/api/v1/categories/:id`        | Update a category      |

---

### 📁 SUBCATEGORY ROUTES

| Method   | Endpoint                                   | Description                            |
| -------- | ------------------------------------------ | -------------------------------------- |
| **POST** | `/api/v1/subcategory`                      | Create a subcategory under a category  |
| **GET**  | `/api/v1/subcategory`                      | Get all subcategories                  |
| **GET**  | `/api/v1/subcategory/category/:categoryId` | Get all subcategories under a category |
| **GET**  | `/api/v1/subcategory/:id`                  | Get a subcategory by ID                |
| **GET**  | `/api/v1/subcategory/name/:name`           | Get a subcategory by name              |
| **PUT**  | `/api/v1/subcategory/:id`                  | Edit subcategory details               |

---

### 🍔 ITEM ROUTES

| Method   | Endpoint                                  | Description                   |
| -------- | ----------------------------------------- | ----------------------------- |
| **POST** | `/api/v1/item`                            | Create a new item             |
| **GET**  | `/api/v1/item`                            | Get all items                 |
| **GET**  | `/api/v1/item/category/:categoryId`       | Get items under a category    |
| **GET**  | `/api/v1/item/subcategory/:subCategoryId` | Get items under a subcategory |
| **GET**  | `/api/v1/item/:id`                        | Get item by ID                |
| **GET**  | `/api/v1/item/name/:name`                 | Get item by name              |
| **PUT**  | `/api/v1/item/:id`                        | Update item details           |
| **GET**  | `/api/v1/item/search/:name`               | Search items by name          |

---

## 🧪 Example Requests (Postman Ready)

### ➕ Create Category

**POST** `/api/v1/category`

```json
{
  "name": "Fruits",
  "image": "https://res.cloudinary.com/demo/image/upload/fruits.png",
  "description": "Fresh and seasonal fruits",
  "taxApplicable": true,
  "tax": 5,
  "taxType": "percentage"
}
```

---

### ➕ Create Subcategory

**POST** `/api/v1/subcategory`

```json
{
  "name": "Citrus",
  "image": "https://res.cloudinary.com/demo/image/upload/citrus.png",
  "description": "All types of citrus fruits",
  "category": "68f4f1d6a4b78d072ac716c1",
  "taxApplicable": true,
  "tax": 5,
  "taxType": "percentage"
}
```

---

### ➕ Create Item

**POST** `/api/v1/item`

```json
{
  "name": "Orange",
  "image": "https://res.cloudinary.com/demo/image/upload/orange.png",
  "description": "Fresh Nagpur Oranges",
  "categoryId": "68f4f1d6a4b78d072ac716c1",
  "subCategoryId": "68f4f2a6a4b78d072ac716d1",
  "taxApplicability": true,
  "tax": 5,
  "baseAmount": 100,
  "discount": 10,
  "totalAmount": 90
}
```

---

## 💾 Database Choice

**🗄️ MongoDB Atlas**

* ✅ Flexible schema for hierarchical data (Category → Subcategory → Item)
* ✅ Scalable and cloud-based
* ✅ Easy integration with Mongoose ODM

---

## 💡 Learnings from This Project

1. How to manage **one-to-many relationships** with Mongoose.
2. Designed **RESTful APIs** for real-world scalability.
3. Improved understanding of CRUD logic and Express middleware.

---

## ⚠️ Most Challenging Part

Maintaining **consistent references** between Category, Subcategory, and Item while ensuring proper population and validation.

---

## 🔁 Improvements If Given More Time

* 🔒 Add JWT-based authentication for admin access.
* 📊 Include pagination, sorting, and filtering.
* 🧾 Add Swagger API documentation.
* ☁️ Deploy on Render or Vercel with MongoDB Atlas.



## 🧾 Submission Details

| Detail          | Info                  |
| --------------- | --------------------- |
| 🗃️ GitHub Repo | https://github.com/deveshpandey65/shop-assi |
| 🌍 Live Link    | https://shop-assi.vercel.app/ |


