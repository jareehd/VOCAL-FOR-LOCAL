const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    description : {
        type : String
    } ,
    title : {
        type : String,
        required : true
    } ,
    media : {
        type : Buffer
    } ,
    ownerName:{
        type:String
    },
    ownerCity:{
        type:String
    },
    ownerState:{
        type:String
    },
    likes : [{
        likedBy : {
            type : String
        }
    }],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    } 
} , {
    timestamps : true
})

blogSchema.methods.increaseLike = async function ( likedBy ) {
    // console.log(likedBy)
    this.likes = this.likes.concat({likedBy})
    await this.save()
    return
}

const Blog = mongoose.model( 'Blog' , blogSchema )

module.exports = Blog