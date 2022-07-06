const db = require("../db")
const { BadRequestError } = require("../utils/errors")

class Order {

    static async listOrdersForUser(user) {
        const query = `
        SELECT orders.id AS "orderId",
               orders.customer_id AS "customerId",
               od.quantity AS "quantity",
               products.name AS "name",
               products.price AS "price"
        FROM orders
          JOIN order_details AS od ON od.order_id = orders.id
          JOIN products ON products.id = od.product_id
        WHERE orders.customer_id = (SELECT id FROM users WHERE email = $1)
      `
        const result = await db.query(query, [user.email])

        return result.rows
    }

    static async createOrder() { }

}

module.exports = Order