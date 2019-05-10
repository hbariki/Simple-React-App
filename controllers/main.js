const getTableData = (req, res, db) => {
    db.select('*').from('employees')
        .then(items => {
            if(items.length){
                res.json(items)
            }
            else {
                res.json({dataExists: 'false'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))

}

const postTableData = (req, res, db) => {
    const { id,name,age,email,phone,salary } = req.body
    db('employees').insert({id,name,age,email,phone,salary})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const updateTableData = (req, res, db) => {
    const {id,name,age,email,phone,salary} = req.body
    db('employees').where({id}).update({id,name,age,email,phone,salary})
    .returning('*')
    .then(item => {
        res.json(item => {
            res.json(item)
        })
    })
    .catch(err => res.status(400).json({dberror: 'db error'}))
}

const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('employees').where({id}).del()
    .then(() => {
        res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
    getTableData,
    postTableData,
    updateTableData,
    deleteTableData
}