## Food App API Documentation

### Endpoints
BASE_URL : http://localhost:8080

#### Like Funtions
  1. **Like Restaurant** 
     - **Method:** POST
     - **Endpoint:** `/likes`
     - **Request:** `{ user_id, res_id }`
     - **Response:** `{ message, code, data }`

  2. **Unlike Restaurant**
     - **Method:** DELETE
     - **Endpoint:** `/likes`
     - **Request:** `{ user_id, res_id }`
     - **Response:** `{ message, code }`

  3. **Get Likes by Restaurant ID**
     - **Method:** GET
     - **Endpoint:** `/likes/by-res/:res_id`
     - **Response:** `{ data }`
     
  4. **Get Likes by User ID**
     - **Method:** GET
     - **Endpoint:** `/likes/by-user/:user_id`
     - **Response:** `{ data }`

#### Rate Funtions
  1. **Rate Restaurant** 
     - **Method:** POST
     - **Endpoint:** `/rates`
     - **Request:** `{ user_id, res_id }`
     - **Response:** `{ message, code, data }`

  2. **Get Rates by Restaurant ID**
     - **Method:** GET
     - **Endpoint:** `/rates/by-res/:res_id`
     - **Response:** `{ data }`
       
  3. **Get Rates by User ID**
     - **Method:** GET
     - **Endpoint:** `/rates/by-user/:user_id`
     - **Response:** `{ data }`

#### Order Funtions
  1. **Create Order** 
     - **Method:** POST
     - **Endpoint:** `/orders`
     - **Request:** `{ user_id, food_id, amount }`
     - **Response:** `{ message, code, data }`
    
  2. **Get All Order** 
     - **Method:** GET
     - **Endpoint:** `/orders`
     - **Request:** ``
     - **Response:** `{ message, code, data }`

  2. **Get Order By Food** 
     - **Method:** GET
     - **Endpoint:** `/orders/by-food/:food_id`
     - **Request:** `{ food_id }`
     - **Response:** `{ message, code, data }`

  3. **Get Order By User** 
     - **Method:** GET
     - **Endpoint:** `/order/by-user/:user_id`
     - **Request:** `{ user_id }`
     - **Response:** `{ message, code, data }`

  3. **Update Order**
     - **Method:** PUT
     - **Endpoint:** `/orders/:code`
     - **Request:** `{ user_id, food_id, amount }`
     - **Response:** `{ message, code, data }`
  
  4. **Delete Order**
     - **Method:** DELETE
     - **Endpoint:** `/orders/:code`
     - **Response:** `{ message, code, data }`
