const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://papiroadmin:oc1l2Ud7w8a3vuYq@cluster-01-papiro.z0nkz.mongodb.net/papirodb?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false 
}).then(()=>{
    console.log('Connected.');
}).catch((err)=>{
    console.log("Houve um erro: " + err);
});



module.exports = mongoose;