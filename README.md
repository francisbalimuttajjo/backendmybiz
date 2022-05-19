# mybiz
<h3>About the Api</h3>
<p>This is a business  application api for management of sales,stock,debtors  cash flow. The user starts by creating product categories,then products which belong to those categories.</p>
<h3>Technologies Used</h3>
<ul><li>Node Js</li>
  <li>Express  Js</li>
  <li>Sequelize </li>
  <li>Postgress Db</li>
</ul>
<h3>Data Flow and modeling</h3>
<img src='https://user-images.githubusercontent.com/63359032/169406148-2b00f039-e3c6-44c7-8665-0050c4186153.JPG'/>
<h5>Summary</h5>
<p>User has many Product Categories(One to many) which in turn also have many Stock Items(One To many)</p>
<p>Sale belongs to both Transactions and Stock Items</p>
<p>Transactions and Cash items are children of User</p>
<p>When a StockItem is deleted, all sales assosciated to it are also deleted from the database,like wise if a product category is deleted,the same goes for all Stock items associated with that category and in turn all sales belonging to those items are removed from the database</p>
<h3>Routes</h3>
<table>
  <tr>
   <th>Route</th>
     <th>Method</th>
     <th>Action</th>
  </tr>
  <tbody>
    <tr>
      <td>/api/v1/users/register</td>
      <td>POST</td>
      <td>Registering first time users</td>
    </tr>
     <tr>
      <td>/api/v1/users/login</td>
      <td>POST</td>
      <td>logging in users</td>
    </tr>
     <tr>
      <td>/api/v1/users/profile</td>
      <td>POST</td>
      <td>Adding profile photo</td>
    </tr>
     <tr>
      <td>/api/v1/users/updatePassword</td>
      <td>POST</td>
      <td>changing user password</td>
    </tr>
     <tr>
      <td>/api/v1/users/auth/:token</td>
      <td>POST</td>
      <td>logging in users using issued JWT token</td>
    </tr>
     <tr>
      <td>/api/v1/stockItems</td>
      <td>POST</td>
      <td>Adding new stock item</td>
    </tr>
      <tr>
      <td>/api/v1/stockItems</td>
      <td>GET</td>
      <td>Getting all items for a specific user</td>
    </tr>
     <tr>
      <td>/api/v1/stockItems/:id</td>
      <td>DELETE</td>
      <td>deleting specific stock item</td>
    </tr>
      <tr>
      <td>/api/v1/stockItems/:id</td>
      <td>PUT</td>
      <td>updating specific stock item</td>
    </tr>
      <tr>
      <td>/api/v1/productCategories/getAll</td>
      <td>POST</td>
      <td>Getting all categories for a user</td>
    </tr>
     <tr>
      <td>/api/v1/productCategories</td>
      <td>POST</td>
      <td>Adding new productCategory</td>
    </tr>
     <tr>
      <td>/api/v1/productCategories/:id</td>
      <td>PATCH</td>
      <td>Editing product categories</td>
    </tr>
    <tr>
      <td>/api/v1/productCategories/:id</td>
      <td>DELETE</td>
      <td>Deleting product categories</td>
    </tr>
      <tr>
      <td>/api/v1/sales/getAll</td>
      <td>POST</td>
      <td>Getting sales</td>
    </tr>
       <tr>
      <td>/api/v1/sales</td>
      <td>POST</td>
      <td>Posting new sale</td>
    </tr>
      <tr>
      <td>/api/v1/sales/:id</td>
      <td>DELETE</td>
      <td>Deleting sale</td>
    </tr>
      <tr>
      <td>/api/v1/sales/reverse/:id</td>
      <td>DELETE</td>
      <td>Reversing the sale</td>
    </tr>
      <tr>
      <td>/api/v1/transactions/getAll</td>
      <td>POST</td>
      <td>Getting transactions for a specific user</td>
    </tr>
      <tr>
      <td>/api/v1/transactions</td>
      <td>POST</td>
      <td>Adding new transaction</td>
    </tr>
    <tr>
      <td>/api/v1/transactions/:id</td>
      <td>DELETE</td>
      <td>Removing transaction from table</td>
    </tr>
      <tr>
      <td>/api/v1/cashItem/getAll</td>
      <td>POST</td>
      <td>Getting cash items for a specific user</td>
    </tr>
     <tr>
      <td>/api/v1/cashItem</td>
      <td>POST</td>
      <td>Posting new cash Item</td>
    </tr>
     <tr>
      <td>/api/v1/cashItem/:id</td>
      <td>PATCH</td>
      <td>Editing  cash Item</td>
    </tr>
    <tr>
      <td>/api/v1/cashItem/:id</td>
      <td>DELETE</td>
      <td>Deleting  cash Item</td>
    </tr>
  </tbody>
</table>

<h3>Getting Started</h3>
<p>Clone the repo to your machine and run yarn install to add all dependencies,then run yarn start to start the development server</P>


