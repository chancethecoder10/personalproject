module.exports = {
    getAll: (req, res) => {
        
        const db = req.app.get('db')
        db.getAllProducts()
            .then(products => res.status(200).send(products))
            .catch(() => res.status(500).send())
        
    }
}