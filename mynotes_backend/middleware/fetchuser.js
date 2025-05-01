var jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'mynotes@2023';

const fetchuser = ( req , res , next ) => {

    try{ 
        // token decode
        token = req.header('token'); 
        if( !token ){
            return res.status(401).send({error: 'Please Login!'});
        }

        let data = jwt.verify( token , JWT_SECRET_KEY );
        // console.log(data);

        req.user = data.user.id;

        next();
    }
    catch(err){
        return res.status(401).send({error: 'Please Login!'});
    }
}

module.exports = fetchuser;