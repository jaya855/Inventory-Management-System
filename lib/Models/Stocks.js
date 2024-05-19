const mongoose =require('mongoose');

const productSchema = new mongoose.Schema({
    
    slug : {
        type : String,
        required : true,
        unique : true,
    },
    price : {
        type : Number,
        required : true,
        
    },
    quantity : {
        type : Number,
        required : true,
    }
})
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
