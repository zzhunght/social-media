const express = require('express')
const User = require('../models/user')
const route = express.Router()


route.get('/', async (req, res) => {
    const query = req.query.search
    try {
        const results = await User.find({
            $text:{
                $search:query
            }
        }).select('-password -email')
        if(results.length === 0) return res.status(200).json({
            success:false,
            message:'Không tìm thấy kết quả nào cho ' + query
        })
        res.status(200).json({
            success:true,
            results: results,
            message:'Kết quả tìm kiếm cho ' + query
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})




module.exports = route