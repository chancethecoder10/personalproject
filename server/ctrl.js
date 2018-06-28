const axios = require('axios')
module.exports = {
    getAll: (req, res) => {

        const db = req.app.get('db')
        db.getAllProducts()
            .then(products => res.status(200).send(products))
            .catch(() => res.status(500).send())

    },
    addToCart: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { user_id } = req.user
        db.check_cart_for_product(user_id, +id)
            .then(cart => {
                if (cart.length > 0) {
                    let quant = cart[0].quant + 1
                    db.quantity_update(quant, user_id, +id)
                        .then(cart => res.status(200).send(cart))
                        .catch(() => res.status(500).send())
                } else {
                    db.add_to_cart_products(user_id, +id)
                        .then(cart => res.status(200).send(cart))
                        .catch(() => res.status(500).send())
                }
            })
    },
    getUserCart: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_user_cart([id])
            .then(cart => res.status(200).send(cart))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },
    deleteCartItem: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.cart_delete([id])
            .then(cart => res.status(200).send(cart))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },
    getPhotos: (req, res) => {
        axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=
            ${process.env.INSTA_ACCESS_TOKEN}`)
            .then(result => {
                let images = result.data.data.map((e,i) => {
                    return e.images.standard_resolution.url
                })
                let response = { images }
                res.status(200).send(response)
            })
            .catch(err => {console.log(err)
                res.status(500).send(err)})
        }
    
}