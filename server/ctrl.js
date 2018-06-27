module.exports = {
    getAll: (req, res) => {

        const db = req.app.get('db')
        db.getAllProducts()
            .then(products => res.status(200).send(products))
            .catch(() => res.status(500).send())

    },
    addToCart: (req, res) => {
        const db = req.app.get('db')
        const { id, quant } = req.params
        const { user_id } = req.user
        //check db to see if the product exists in the cart
        db.check_cart_for_product(+id, user_id)
        .then(cart => {
            if(cart.length > 0){
                let quant = cart[0].quant +1
                db.quantity_update(quant, user_id, +id)
                .then(cart => res.status(200).send(cart))
                .catch(() => res.status(500).send())
            } else {
                db.add_to_cart_products(user_id, +id)
                    .then(cart => res.status(200).send(cart))
                    .catch(() => res.status(500).send())
            }
        })
        //if it does, do a db query to update the quantity of product
        //if it doesnt, run .add_to_cart_products
    },
    getUserCart: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_user_cart([id])
            .then(cart => res.status(200).send(cart))
            .catch((err) => {console.log(err)
                res.status(500).send()})
    },
    deleteCartItem: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.cart_delete([id])
        .then(cart => res.status(200).send(cart))
        .catch((err) => {console.log(err)
            res.status(500).send()
        })
    }

}