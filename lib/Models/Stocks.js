const mongoose =require('mongoose');

const productSchema = new mongoose.Schema({
    
    slug : {
        type : String,
        required : true,
        unique : true,
    },
    price : {
        type : String,
        required : true,
        
    },
    quantity : {
        type : String,
        required : true,
    }
})
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
